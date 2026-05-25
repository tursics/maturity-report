// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    LOAD_LANG = ['de', 'en'],
//    LOAD_YEAR = [2023, 2024, 'live'],
    LOAD_YEAR = [2023, 2024, 2025],
    INIT_COUNTRY = 'de',
    INIT_YEAR = 2025,
    INIT_ROOT = 'root',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataScore = {},
    shields = [],
    currentID = '',
    currentYear = INIT_YEAR;

// ----------------------------------------------------------------------------

function onFinishLoading() {
    load.showLog(false);
    load.removeFinishCallback(onFinishLoading);

    questionAnswer.jumpToID(INIT_ROOT, INIT_YEAR);

    countries.init();
    changeYear(INIT_YEAR);
    countries.select(INIT_COUNTRY, INIT_YEAR);
}

function onFileScoring(filepath, data) {
    var year = filepath.split('/').shift();
    if ('live' !== year) {
        year = parseInt(year, 10);
    }

    loadedDataScore[year] = [];
    data.forEach((obj) => {
        loadedDataScore[year][obj.ID] = obj;
    });
}

function onFileReport(filepath, data) {
    var year = filepath.split('/').shift();
    var filename = filepath.split('/').pop();
    var file = filename.split('.').shift();
    var language = file.split('_').pop().toLowerCase();

    if ('live' !== year) {
        year = parseInt(year, 10);
    }
    if ('i18n' === language) {
        language = 'en';
    }

    _.appendTranslations(language, data, year);
}

function goto(destination, event, year) {
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
        var years = document.querySelectorAll('#year-switch figure.shield-button.selected');
        if (years.length === 1) {
            year = years[0].dataset.year;
            if ('live' !== year) {
                year = parseInt(year, 10);
            }

            addAllCountries(year);
        }
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
        questionAnswer.jumpToID(destination, year);
    }
}

function toggleCountry() {
    var country = this.dataset.country;
    var year = this.dataset.year;

    if (this.classList.contains('selected')) {
        this.classList.remove('selected');

        shields.find((shield) => (shield.country === country) && (shield.year === year)).removeHTML();
        shields = shields.filter((shield) => !((shield.country === country) && (shield.year === year)));

        if (shields.length === 0) {
            var elem = document.getElementById('empty');
            elem.classList.remove('hidden');
        }
    } else {
        if (shields.length === 0) {
            var elem = document.getElementById('empty');
            elem.classList.add('hidden');
        }

        this.classList.add('selected');

        var shield = new Shield(country, countries.get(country, year), year);
        shields.push(shield);

        goto(currentID, null, currentYear);
    }
}

function addAllCountries(year) {
    var selectedLang = document.querySelectorAll('figure.shield-button[data-country][data-year="' + year + '"]:not(.selected)');
    selectedLang.forEach((elem) => {
        var country = elem.dataset.country;
        var year = elem.dataset.year;

        countries.select(country, year);
    })
}

function removeAllCountries() {
    var selectedLang = document.querySelectorAll('figure.shield-button[data-country].selected');
    selectedLang.forEach((elem) => {
        var country = elem.dataset.country;
        var year = elem.dataset.year;

        countries.select(country, year);
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

function changeYear(newYear) {
    var years = document.querySelectorAll('#year-switch figure.shield-button');
    years.forEach((elem) => {
        var year = elem.dataset.year;
        if ('live' !== year) {
            year = parseInt(year, 10);
        }

        elem.classList.remove('selected');

        if (year === newYear) {
            elem.classList.add('selected');
        }
    })

    var yearLang = document.querySelectorAll('figure.shield-button[data-country]');
    yearLang.forEach((elem) => {
        var year = elem.dataset.year;
        if ('live' !== year) {
            year = parseInt(year, 10);
        }

        elem.style.display = year === newYear ? 'inline-block' : 'none';
    })
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

function formatHit(country, year, id, text, value, pos) {
    var start = Math.max(0, pos - 15);
    start = text.lastIndexOf(' ', start);
    start = start === -1 ? 0 : start;

    var end = Math.min(pos + value.length + 30, text.length);
    end = text.indexOf(' ', end);
    end = end === -1 ? text.length : end;

    var ret = '';

    ret += '<div class="result-header">';
    ret += '<span class="fi fi-' + country + ' fis"></span> ';
    ret += '<span data-i18n="question">' + _.get('question') + '</span>' + ' ' + id + ', ' + year;
    ret += '</div>';

    ret += '<div class="result-body">';
    ret += '<a href="#" data-id="' + id + '" data-year="' + year + '" onclick="onResult(this, event)">';
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

function findInTranslations(flag, questions, year, value) {
    var ret = '';
    questions = Object.entries(questions);

    questions.forEach(([key, question]) => {
        var pos = '';
        var str = '';

        var headlineKey = question.ID;
        if ('root' === headlineKey) {
            headlineKey = 'odm_report';
        }
        str = _.get(headlineKey).replace(/<br\s*\/?>/gi,' ');
        pos = str.toLowerCase().indexOf(value);
        if (pos !== -1) {
            ret += formatHit('eu', year, question.ID, str, value, pos);
        }

        var guideKey = 'G' + question.ID;
        str = _.get(guideKey);
        if (str !== ('{' + guideKey + '}')) {
            pos = str.toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit('eu', year, question.ID, str, value, pos);
            }
        }

        if (question.Answer) {
            pos = question.Answer.toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question.Answer, value, pos);
            }
        }
        if (question['Answer from 2023']) {
            pos = question['Answer from 2023'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Answer from 2023'], value, pos);
            }
        }
        if (question['Answer from 2024']) {
            pos = question['Answer from 2024'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Answer from 2024'], value, pos);
            }
        }
        if (question['Provide updated answer (if applicable)']) {
            pos = question['Provide updated answer (if applicable)'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Provide updated answer (if applicable)'], value, pos);
            }
        }

        if (question.Justification) {
            pos = question.Justification.toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question.Justification, value, pos);
            }
        }
        if (question['Explanation from 2023']) {
            pos = question['Explanation from 2023'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Explanation from 2023'], value, pos);
            }
        }
        if (question['Explanation from 2024']) {
            pos = question['Explanation from 2024'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Explanation from 2024'], value, pos);
            }
        }
        if (question['Provide updated explanation (if applicable)']) {
            pos = question['Provide updated explanation (if applicable)'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Provide updated explanation (if applicable)'], value, pos);
            }
        }

        if (question['Reviewer 1 Comments']) {
            pos = question['Reviewer 1 Comments'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Reviewer 1 Comments'], value, pos);
            }
        }

        if (question['Reviewer 2 Comments']) {
            pos = question['Reviewer 2 Comments'].toLowerCase().indexOf(value);
            if (pos !== -1) {
                ret += formatHit(flag, year, question.ID, question['Reviewer 2 Comments'], value, pos);
            }
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
            var year = elem.dataset.year;
            var flag = country === 'el' ? 'gr' : country;
            var translations = countries.get(country, year);
            if (translations) {
                var translation = translations[_.getLanguage()] ? translations[_.getLanguage()] : translations['en']
                str += findInTranslations(flag, translation, year, value);
            }
        })
    }

    result.innerHTML = str;
}

function onResult(elem, event) {
    event.preventDefault();

    var id = elem.dataset.id;
    var year = elem.dataset.year;
    goto(id, null, year);
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
    var zoom = elem.classList.value.replace('shield', '').replace('indian-red', '').replace('golden-rod', '').replace('sea-green', '').replace('gray', '').trim();
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
    var zoom = elem.classList.value.replace('shield', '').replace('indian-red', '').replace('golden-rod', '').replace('sea-green', '').replace('gray', '').trim();

    shield.classList.add(zoom);
}

function sort() {
    var list = [];

    shields.forEach((shield) => {
        var score = document.getElementById(shield.id).querySelectorAll('.shield-score')[0];
        list.push({
            country: shield.country,
            year: shield.year,
            score: parseFloat(score.innerHTML) || 0,
            title: _.getJustification(shield.country, shield.year, 'R1'),
        });
    });

    list.sort(function(a, b) {
        if (a.score !== b.score) {
            return a.score > b.score ? -1 : 1;
        }

        return a.title < b.title ? -1 : 1;
    });

    list.forEach((item) => {
        countries.select(item.country, item.year);
        countries.select(item.country, item.year);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    changeLanguage(DEFAULT_LANG);

    LOAD_LANG.forEach((lang) => {
        var language = lang === 'en' ? '' : '_' + lang;
        LOAD_YEAR.forEach((year) => {
            load.csv(year + '/3-simplified/00_i18n' + language + '.csv', onFileReport);
        });
    });

    LOAD_YEAR.forEach((year) => {
        load.csv(year + '/3-simplified/00_scoring.csv', onFileScoring);
    });

    load.addFinishCallback(onFinishLoading);
});

document.addEventListener('keydown', function(e) {
    if ('ArrowLeft' === e.key) {
        goto('prev', null, null);
    } else if ('ArrowUp' === e.key) {
        goto('upwards', null, null);
    } else if ('ArrowRight' === e.key) {
        goto('next', null, null);
    }
});

// ----------------------------------------------------------------------------
