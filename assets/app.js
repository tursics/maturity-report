// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    LOAD_LANG = ['de','en'],
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataScore = [],
    questionTree = [],
    shields = [],
    currentID = '';

// ----------------------------------------------------------------------------

function getParent(id) {
    function getParent_(root) {
        var ret = null;

        if (root.children) {
            if (root.children.find((child) => child.id === id)) {
                return root;
            }
            root.children.forEach((child) => {
                if (!ret) {
                    ret = getParent_(child);
                }
            });
        }

        return ret;
    }

    return getParent_(questionTree);
}

function getHeadline(obj) {
    var str = '';

    if ('dimension' === obj.type) {
        str += '<h2 data-i18n="' + obj.id + '">' + _.get(obj.id) + '</h2>';

        var key = 'N' + obj.id.substr(1);
        var val = _.get(key);
        if (val !== ('{' + key + '}')) {
            str += '<div data-i18n="' + key + '" style="margin-bottom:1.5em">' + val + '</div>';
        }
    } else {
        var splitted = _.get(obj.id).split('<br>');
        var title = splitted.shift();
        if ((splitted.length > 0) && (splitted[0] === '')) {
            splitted.shift();
        }

        str += '<h2>';
        str += '<span data-i18n="Question">' + _.get('Question') + '</span>';
        str += ' ' + obj.id  + ': ';
        str += '<span data-i18nstart="' + obj.id + '">' + title + '</span>';
        str += '</h2>';

        str += '<div style="margin-bottom:1.5em" data-i18ntail="' + obj.id + '">' + splitted.join('<br>') + '</div>';

        var key = 'G' + obj.id;
        var val = _.get(key);
        if (val !== ('{' + key + '}')) {
            str += '<div data-i18n="GuideAnswering" style="font-style:italic;font-weight:900">' + _.get('GuideAnswering') + '</div>';
            str += '<div data-i18n="' + key + '" style="margin-bottom:1.5em">' + val + '</div>';
        }
    }

    return str;
}

function createQuestionTree(data) {
    var tree = {type: 'root', id: 'root', children: []};
    var parent = tree.children;

    parent.push({type: 'dimension', id: 'D0', children: []});
    parent = parent[parent.length - 1].children;

    var parentD0 = parent;

    data.forEach((obj) => {
        if (0 === obj.ID.indexOf('D')) {
            if (obj.ID.length === 2) {
                parent = tree.children;
                parent.push({type: 'dimension', id: obj.ID, children: []});
                parent = parent[parent.length - 1].children;
            } else if (obj.ID.length === 4) {
                parent = tree.children.find((elem) => elem.id === obj.ID.substring(0, 2)).children;
                parent.push({type: 'dimension', id: obj.ID, children: []});
                parent = parent[parent.length - 1].children;
            } else if (obj.ID.length === 5) {
                parent = tree.children.find((elem) => elem.id === obj.ID.substring(0, 2)).children.find((elem) => elem.id === obj.ID.substring(0, 4)).children;
                parent.push({type: 'dimension', id: obj.ID, children: []});
                parent = parent[parent.length - 1].children;
            }
        } else {
            parent.push({type: 'entry', id: obj.ID});
        }
    });

    parentD0.push({type: 'dimension', id: 'debug', children: []});

    questionTree = tree;
}

function getQuestion(id) {
    var obj = questionTree;

    if (0 === id.indexOf('D')) {
        if (id.length >= 2) {
            obj = obj.children.find((elem) => elem.id === id.substring(0, 2));

            if (id.length >= 4) {
                obj = obj.children.find((elem) => elem.id === id.substring(0, 4));

                if (id.length >= 5) {
                    obj = obj.children.find((elem) => elem.id === id.substring(0, 5));
                }
            }
        }
    } else if (id === 'root') {
        // root
    } else {
        obj = {type: 'entry', id};
    }

    return obj;
}

function prepareButtons(id) {
    var buttonBack = document.getElementById('buttonBack');
    buttonBack.style.display = 'inline-block';
    buttonBack.classList.remove('disabled');

    if (id === 'root') {
        buttonBack.classList.add('disabled');
    }
}

function setShieldLevel(id) {
    var question = getQuestion(id);

    if (undefined === question) {
        console.error('Unknown id', id);
        return;
    }

    currentID = id;

    prepareButtons(currentID);

    shields.forEach((shield) => shield.setQuestion(question));
}

function setShieldLevelDebug() {
    currentID = 'debug';

    prepareButtons(currentID);

    shields.forEach((shield) => shield.setDebug());
}

function setShieldLevelBack() {
    var level = 'root';
    var root = getParent(currentID);

    if (root) {
        level = root.id;
    }

    setShieldLevel(level);
    setQuestionnaire(level);
}

function setQuestionnaire(id) {
    var headline = document.getElementById('headline');

    var obj = getQuestion(id);
    if (undefined === obj) {
        console.error('Unknown id', id);
        return;
    }

    var str = id === 'root' ? '' : getHeadline(obj);

    headline.innerHTML = str;
}

function onFinishLoading() {
    load.showLog(false);
    load.removeFinishCallback(onFinishLoading);

    setShieldLevel('root');
    setQuestionnaire('root');

    countries.init();
    countries.select('de');
}

function onFileScoring(filepath, data) {
    loadedDataScore = [];
    data.forEach((obj) => {
        loadedDataScore[obj.ID] = obj;
    });
}

function onFileReport(filepath, data) {
    var filename = filepath.split('/').pop();
    var file = filename.split('.').shift();
    var language = file.split('_').pop().toLowerCase();

    if ('i18n' === language) {
        language = 'en';
    }

    _.appendTranslations(language, data);
}

function goto(destination) {
    if ('back' === destination) {
        setShieldLevelBack();
    } else if ('debug' === destination) {
        setShieldLevelDebug();
        setQuestionnaire('root');
    } else {
        setShieldLevel(destination);
        setQuestionnaire(destination);
    }
}

function toggleCountry() {
    var country = this.dataset.country;

    if (this.classList.contains('selected')) {
        this.classList.remove('selected');

        shields.find((shield) => shield.country === country).removeHTML();
        shields = shields.filter((shield) => shield.country !== country);
    } else {
        this.classList.add('selected');

        var shield = new Shield(country, countries.get(country));
        shields.push(shield);

        goto(currentID);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    _.setLanguage(DEFAULT_LANG);

    var test = 0;
    setInterval(function() {
        ++test;
        if (test >= LOAD_LANG.length) {
            test = 0;
        }
        _.setLanguage(LOAD_LANG[test]);
    }, 5000);

    LOAD_LANG.forEach((lang) => {
        var language = lang === 'en' ? '' : '_' + lang;
        load.csv('2023/3-simplified/00_i18n' + language + '.csv', onFileReport);
    });

    load.csv('2023/3-simplified/00_scoring.csv', onFileScoring);
    load.addFinishCallback(onFinishLoading);
});

// ----------------------------------------------------------------------------
