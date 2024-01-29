// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataCountries = {},
    loadedDataScore = [],
    questionTree = [],
    shields = [],
    currentID = '';

// ----------------------------------------------------------------------------
/*
function getJustification(key) {
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    str += '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    str += '<br>';

    return str;
}*/

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
            str += '<div style="margin-bottom:1.5em">' + val + '</div>';
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
        str += '<span data-i18n="' + obj.id + '">' + title + '</span>';
        str += '</h2>';

        str += '<div style="margin-bottom:1.5em" data-i18n="' + obj.id + '">' + splitted.join('<br>') + '</div>';

        var key = 'G' + obj.id;
        var val = _.get(key);
        if (val !== ('{' + key + '}')) {
            str += '<div data-i18n="GuideAnswering" style="font-style:italic;font-weight:900">' + _.get('GuideAnswering') + '</div>';
            str += '<div style="margin-bottom:1.5em">' + val + '</div>';
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

function addCountryButton(country) {
    var node = document.createElement('figure');
    node.classList.add('shield');
    node.classList.add('shield-button');
    node.style = 'display:inline-block';
    node.dataset.country = country;
    node.title = loadedDataCountries[country]['R1'].Justification;
    node.onclick = toggleCountry;

    node.innerHTML = 
        '<div class="shield-border"></div>' +
        '<div class="shield-background">' +
            '<div class="shield-chevron" style="font-size:10em;line-height:1.7em"><span class="fi fi-' + country + ' fis"></span></span>' +
        '</div>';

    document.getElementById('countries').appendChild(node);
}

function addCountryButtons() {
    Object.keys(loadedDataCountries).forEach((country) => addCountryButton(country));
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
    addCountryButtons();

    setShieldLevel('root');
    setQuestionnaire('root');

    var germany = document.querySelectorAll('[data-country="de"]')[0];
    toggleCountry.call(germany);
}

function onFileScoring(filepath, data) {
    loadedDataScore = [];
    data.forEach((obj) => {
        loadedDataScore[obj.ID] = obj;
    });
}

function onFileReportEN(filepath, data) {
    _.appendTranslations('en', data);
}

function onFileCountryLoaded(filepath, data) {
    var countryData = [];
    data.forEach((obj) => {
        countryData[obj.ID] = obj;
    });

    var filename = filepath.split('/').pop();
    var country = filename.split('_').shift();

    loadedDataCountries[country.toLowerCase()] = countryData;

    if (Object.keys(loadedDataCountries).length === 1) {
        createQuestionTree(data);
    }
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
    var code = this.dataset.country;

    if (this.classList.contains('selected')) {
        this.classList.remove('selected');

        shields.find((shield) => shield.country === code).removeHTML();
        shields = shields.filter((shield) => shield.country !== code);
    } else {
        this.classList.add('selected');

        var shield = new Shield(code, loadedDataCountries[code]);
        shields.push(shield);

        goto(currentID);
    }
}

document.addEventListener('DOMContentLoaded', function() {
//    _.setLanguage(DEFAULT_LANG);

/*    var test = DEFAULT_LANG;
    setInterval(function() {
        test = test === 'de' ? 'en' : 'de';
        _.setLanguage(test);
    }, 5000);*/

    load.csv('2023/3-simplified/00_i18n.csv', onFileReportEN);
    load.csv('2023/3-simplified/00_scoring.csv', onFileScoring);

    load.csv('2023/3-simplified/AL_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/AT_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/BA_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/BE_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/BG_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/CH_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/CY_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/CZ_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/DE_ODM_2023.csv', onFileCountryLoaded);
    load.csv('2023/3-simplified/FR_ODM_2023.csv', onFileCountryLoaded);

    load.addFinishCallback(onFinishLoading);
});

// ----------------------------------------------------------------------------
