// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    LOAD_LANG = ['de','en'],
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataScore = [],
    questionTree = [],
    shields = [],
    currentID = '';

// ----------------------------------------------------------------------------

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

function onFinishLoading() {
    load.showLog(false);
    load.removeFinishCallback(onFinishLoading);

    questionAnswer.jumpToID('root');

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

function goto(destination, event) {
    if (event) {
        event.preventDefault();
    }

    if ('open-sidebar' === destination) {
        openSidebar();
    } else if ('close-sidebar' === destination) {
        closeSidebar();
    } else if ('search' === destination) {
        toggleSearch();
    } else if ('allCountries' === destination) {
        addAllCountries();
    } else if ('noCountries' === destination) {
        removeAllCountries();
    } else if ('upwards' === destination) {
        questionAnswer.jumpUpwards();
    } else if ('prev' === destination) {
        questionAnswer.jumpToPrev();
    } else if ('next' === destination) {
        questionAnswer.jumpToNext();
    } else if ('debug' === destination) {
        questionAnswer.jumpToDebug();
    } else {
        questionAnswer.jumpToID(destination);
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

function addAllCountries() {
    var selectedLang = document.querySelectorAll('figure.shield-button[data-country]:not(.selected)');
    selectedLang.forEach((elem) => {
        var country = elem.dataset.country;

        countries.select(country);
    })
}

function removeAllCountries() {
    var selectedLang = document.querySelectorAll('figure.shield-button[data-country].selected');
    selectedLang.forEach((elem) => {
        var country = elem.dataset.country;

        countries.select(country);
    })
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

    var ret = '';

    ret += '<div class="result-header">';
    ret += '<span class="fi fi-' + country + ' fis"></span> ';
    ret += '<span data-i18n="Question">' + _.get('Question') + '</span>' + ' ' + id;
    ret += '</div>';

    ret += '<div class="result-body">';
    ret += '<a href="#" data-id="' + id + '" onclick="onResult(this, event)">';
    if (start > 0) {
        ret += '&hellip;';
    }
    ret += text.substring(start, end);
    if (end < text.length) {
        ret += '&hellip;';
    }
    ret += '</a>';
    ret += '</div>';

    return ret;
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

        pos = question['Reviewer 1 Comments'].toLowerCase().indexOf(value);
        if (pos !== -1) {
            ret += formatHit(flag, question.ID, question['Reviewer 1 Comments'], value, pos);
        }

        pos = question['Reviewer 2 Comments'].toLowerCase().indexOf(value);
        if (pos !== -1) {
            ret += formatHit(flag, question.ID, question['Reviewer 2 Comments'], value, pos);
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
        var selectedLang = document.querySelectorAll('figure.shield-button[data-country].selected');
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

function zoomIn() {
    if (shields.length === 0) {
        return;
    }

    var shield = document.getElementById('sidebar-shield');
    shield.classList.remove('zoom-xs');
    shield.classList.remove('zoom-s');
    shield.classList.remove('zoom-m');
    shield.classList.remove('zoom-l');
    shield.classList.remove('zoom-xl');

    shields.forEach((shield) => shield.zoomIn());

    var elem = document.getElementById(shields[0].id);
    var zoom = elem.classList.value.replace('shield', '').replace('indian-red', '').replace('golden-rod', '').replace('sea-green', '').trim();
    shield.classList.add(zoom);
}

function zoomOut() {
    if (shields.length === 0) {
        return;
    }

    var shield = document.getElementById('sidebar-shield');
    shield.classList.remove('zoom-xs');
    shield.classList.remove('zoom-s');
    shield.classList.remove('zoom-m');
    shield.classList.remove('zoom-l');
    shield.classList.remove('zoom-xl');

    shields.forEach((shield) => shield.zoomOut());

    var elem = document.getElementById(shields[0].id);
    var zoom = elem.classList.value.replace('shield', '').replace('indian-red', '').replace('golden-rod', '').replace('sea-green', '').trim();

    shield.classList.add(zoom);
}

function sort() {
    var list = [];

    shields.forEach((shield) => {
        var score = document.getElementById(shield.id).querySelectorAll('.shield-score')[0];
        list.push({
            country: shield.country,
            score: parseFloat(score.innerHTML) || 0,
            title: _.getJustification(shield.country, 'R1'),
        });
    });

    list.sort(function(a, b) {
        if (a.score !== b.score) {
            return a.score > b.score ? -1 : 1;
        }

        return a.title < b.title ? -1 : 1;
    });

    list.forEach((item) => {
        countries.select(item.country);
        countries.select(item.country);
    });
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
