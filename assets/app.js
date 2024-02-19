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
    var search = document.getElementById('sidebar-search');
    var isNotSearch = search.classList.contains('hidden');

    var button1 = document.getElementById('buttonPrev1');
    var button2 = document.getElementById('buttonPrev2');
    if (isNotSearch) {
        button1.style.display = 'inline-block';
        button2.style.display = 'inline-block';
    }
    button1.classList.remove('disabled');
    button2.classList.remove('disabled');

    if (id === 'root') {
        button1.classList.add('disabled');
        button2.classList.add('disabled');
    }

    button1 = document.getElementById('buttonNext1');
    button2 = document.getElementById('buttonNext2');
    if (isNotSearch) {
        button1.style.display = 'inline-block';
        button2.style.display = 'inline-block';
    }
    button1.classList.remove('disabled');
    button2.classList.remove('disabled');

    if (!getShieldLevelNext()) {
        button1.classList.add('disabled');
        button2.classList.add('disabled');
    }

    button1 = document.getElementById('buttonUpwards1');
    button2 = document.getElementById('buttonUpwards2');
    if (isNotSearch) {
        button1.style.display = 'inline-block';
        button2.style.display = 'inline-block';
    }
    button1.classList.remove('disabled');
    button2.classList.remove('disabled');

    if (id === 'root') {
        button1.classList.add('disabled');
        button2.classList.add('disabled');
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

function setShieldLevelUpwards() {
    var level = 'root';
    var root = getParent(currentID);

    if (root) {
        level = root.id;
    }

    setShieldLevel(level);
    setQuestionnaire(level);
}

function getShieldLevelPrev() {
    var current = currentID;
    var root = getParent(current);

    if (!root) {
        return undefined;
    }

    var index = root.children.findIndex((child) => child.id === current) - 1;
    if (index < 0) {
        return root.id;
    }

    var current = root.children[index];
    if ('PreliminaryScore' === current.id) {
        return root.id;
    }

    do {
        var obj = getQuestion(current.id);
        if (obj && obj.children && (obj.children.length > 0)) {
            current = obj.children[obj.children.length - 1];
        } else {
            return current.id;
        }
    } while (true);
}

function getShieldLevelNext() {
    var current = currentID;
    var obj = getQuestion(current);

    if (obj && obj.children && (obj.children.length > 0)) {
        if ('TotalScore' === obj.children[0].id) {
            return obj.children[3].id;
        }

        return obj.children[0].id;
    }

    do {
        var root = getParent(current);
        if (!root) {
            return undefined;
        }

        var index = root.children.findIndex((child) => child.id === current) + 1;
        if (index < root.children.length) {
            return root.children[index].id;
        }

        current = root.id;
    } while (true);
}

function setShieldLevelPrev() {
    var level = getShieldLevelPrev();

    if (level) {
        if ('debug' === level) {
            setShieldLevelDebug();
            setQuestionnaire('root');
        } else {
            setShieldLevel(level);
            setQuestionnaire(level);
        }
    }
}

function setShieldLevelNext() {
    var level = getShieldLevelNext();

    if (level) {
        if ('debug' === level) {
            setShieldLevelDebug();
            setQuestionnaire('root');
        } else {
            setShieldLevel(level);
            setQuestionnaire(level);
        }
    }
}

function setQuestionnaire(id) {
    var obj = getQuestion(id);
    if (undefined === obj) {
        console.error('Unknown id', id);
        return;
    }
    if (obj.length === 0) {
        console.error('No data loaded');
        return;
    }

    var headlineKey = '';
    var questionStr = '';
    var guideKey = 'G' + obj.id;
    var guideStr = _.get(guideKey);
    var noteKey = 'N' + obj.id.substr(1);
    var noteStr = _.get(noteKey);

    if ('root' === obj.id) {
        headlineKey = 'odm_report';
    } else if ('dimension' === obj.type) {
        headlineKey = obj.id;
    } else {
        headlineKey = obj.id;
        questionStr = '<span data-i18n="Question">' + _.get('Question') + '</span>' + ' ' + obj.id;
    }
    if (guideStr === ('{' + guideKey + '}')) {
        guideStr = '-';
    } else {
        guideStr = '<span data-i18n="' + guideKey + '">' + guideStr + '</span>';
    }
    if (('dimension' === obj.type) && (noteStr !== ('{' + noteKey + '}'))) {
        noteStr = '<span data-i18n="' + noteKey + '">' + noteStr + '</span>';
    } else {
        noteStr = _.getTail(headlineKey);
        if (noteStr === '') {
            noteStr = '-';
        } else {
            noteStr = '<span data-i18ntail="' + obj.id + '">' + _.getTail(headlineKey) + '</span>';
        }
    }

    var elem;

    elem = document.getElementById('sidebar-headline');
    elem.dataset['i18nstart'] = headlineKey;
    elem.innerHTML = _.getStart(headlineKey);
    elem = document.getElementById('shield-headline');
    elem.dataset['i18nstart'] = headlineKey;
    elem.innerHTML = _.getStart(headlineKey);

    elem = document.getElementById('sidebar-notes');
    elem.innerHTML = noteStr;

    elem = document.getElementById('sidebar-question');
    elem.innerHTML = questionStr === '' ? '-' : questionStr;
    elem = document.getElementById('shield-question');
    elem.innerHTML = questionStr;

    elem = document.getElementById('sidebar-answering');
    elem.innerHTML = guideStr;
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
    if ('upwards' === destination) {
        setShieldLevelUpwards();
    } else if ('prev' === destination) {
        setShieldLevelPrev();
    } else if ('next' === destination) {
        setShieldLevelNext();
    } else if ('debug' === destination) {
        setShieldLevelDebug();
        setQuestionnaire('root');
    } else if ('open-sidebar' === destination) {
        openSidebar();
    } else if ('close-sidebar' === destination) {
        closeSidebar();
    } else if ('search' === destination) {
        toggleSearch();
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

function changeLanguage(newLang) {
    LOAD_LANG.forEach((lang) => {
        var elem = document.getElementById('buttonSidebar' + lang.toUpperCase());
        elem.classList.remove('selected');

        if (lang === newLang) {
            elem.classList.add('selected');
        }
    });

    _.setLanguage(newLang);
}

function openSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('hidden');

    var content = document.getElementById('content');
    content.classList.remove('maximized');

    var shield = document.getElementById('sidebar-shield');
    shield.classList.add('hidden');

    var shield = document.getElementById('page-header');
    shield.classList.add('hidden');
}

function closeSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('hidden');

    var content = document.getElementById('content');
    content.classList.add('maximized');

    var shield = document.getElementById('sidebar-shield');
    shield.classList.remove('hidden');

    var shield = document.getElementById('page-header');
    shield.classList.remove('hidden');
}

function toggleSearch() {
    var search = document.getElementById('sidebar-search');

    if (search.classList.contains('hidden')) {
        showSearch();
    } else {
        hideSearch();
    }
}

function showSearch() {
    var content = document.getElementById('sidebar-content');
    content.classList.add('hidden');

    var search = document.getElementById('sidebar-search');
    search.classList.remove('hidden');

    var button1 = document.getElementById('buttonPrev1');
    button1.style.display = 'none';
    button1 = document.getElementById('buttonNext1');
    button1.style.display = 'none';
    button1 = document.getElementById('buttonUpwards1');
    button1.style.display = 'none';
    button1 = document.getElementById('buttonSearch1');
    button1.classList.add('disabled');
    button1 = document.getElementById('buttonClose1');
    button1.style.display = 'inline-block';
}

function hideSearch() {
    var content = document.getElementById('sidebar-content');
    content.classList.remove('hidden');

    var search = document.getElementById('sidebar-search');
    search.classList.add('hidden');

    var button1 = document.getElementById('buttonPrev1');
    button1.style.display = 'inline-block';
    button1 = document.getElementById('buttonNext1');
    button1.style.display = 'inline-block';
    button1 = document.getElementById('buttonUpwards1');
    button1.style.display = 'inline-block';
    button1 = document.getElementById('buttonSearch1');
    button1.classList.remove('disabled');
    button1 = document.getElementById('buttonClose1');
    button1.style.display = 'none';
}

function formatHit(country, id, text, value, pos) {
    var start = Math.max(0, pos - 15);
    start = text.lastIndexOf(' ', start);
    start = start === -1 ? 0 : start;

    var end = Math.min(pos + value.length + 30, text.length);
    end = text.indexOf(' ', end);
    end = end === -1 ? text.length : end;

    var ret = '<span class="fi fi-' + country + ' fis"></span> ';

    ret += '<a href="#" data-id="' + id + '" onclick="onResult(this, event)">';
    if (start > 0) {
        ret += '&hellip;';
    }
    ret += text.substring(start, end);
    if (end < text.length) {
        ret += '&hellip;';
    }
    ret += '</a>';

    return ret + '<br>';
}

function findInTranslations(flag, questions, value) {
    var ret = '';

    questions.forEach((question) => {
        var pos = question.Answer.toLowerCase().indexOf(value);
        if (pos !== -1) {
            ret += formatHit(flag, question.ID, question.Answer, value, pos);
        }

        pos = question.Justification.toLowerCase().indexOf(value);
        if (pos !== -1) {
            ret += formatHit(flag, question.ID, question.Justification, value, pos);
        }
    });

    return ret;
}

function onTextSearch() {
    var result = document.getElementById('sidebar-result');
    var elem = document.getElementById('text-search');
    var value = elem.value.toLowerCase().trim();
    var str = '';

    if (value !== '') {
        var selectedLang = document.querySelectorAll('[data-country].selected');
        selectedLang.forEach((elem) => {
            var country = elem.dataset.country;
            var flag = country === 'el' ? 'gr' : country;
            var translations = countries.get(country);
            if (translations) {
                var translation = translations[_.getLanguage()] ? translations[_.getLanguage()] : translations['en']
                str += findInTranslations(flag, translation, value);
            }
        })
    }

    result.innerHTML = str;
}

function onResult(elem, event) {
    event.preventDefault();

    var id = elem.dataset.id;
    goto(id);
}

document.addEventListener('DOMContentLoaded', function() {
    changeLanguage(DEFAULT_LANG);

    LOAD_LANG.forEach((lang) => {
        var language = lang === 'en' ? '' : '_' + lang;
        load.csv('2023/3-simplified/00_i18n' + language + '.csv', onFileReport);
    });

    load.csv('2023/3-simplified/00_scoring.csv', onFileScoring);
    load.addFinishCallback(onFinishLoading);
});

// ----------------------------------------------------------------------------
