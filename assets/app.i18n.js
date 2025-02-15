var _ = (function () {
    var FALLBACK = 'en';
    var langId = '';
    var lang = [];

    function init() {
        try {
            lang = i18n[FALLBACK];
        } catch(e) {
            console.error('Could not load language files');
        }
    }

    function replaceHTMLEntries() {
        var elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(elem => {
            var year = elem.dataset['year'];
            var key = elem.dataset['i18n'];
            elem.innerHTML = funcGetWithYear(key, year);
        });

        elements = document.querySelectorAll('[data-i18nanswer]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var year = elem.dataset['year'];
            var key = elem.dataset['i18nanswer'];
            elem.innerHTML = funcGetAnswer(country, year, key);
        });

        elements = document.querySelectorAll('[data-i18njustification]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var year = elem.dataset['year'];
            var key = elem.dataset['i18njustification'];
            elem.innerHTML = funcGetJustification(country, year, key);
        });

        elements = document.querySelectorAll('[data-i18nreviewer1]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var year = elem.dataset['year'];
            var key = elem.dataset['i18nreviewer1'];
            elem.innerHTML = funcGetReviewer1(country, year, key);
        });

        elements = document.querySelectorAll('[data-i18nreviewer2]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var year = elem.dataset['year'];
            var key = elem.dataset['i18nreviewer2'];
            elem.innerHTML = funcGetReviewer2(country, year, key);
        });

        elements = document.querySelectorAll('[data-i18nstart]');
        elements.forEach(elem => {
            var year = elem.dataset['year'];
            var key = elem.dataset['i18nstart'];
            elem.innerHTML = funcGetStart(key, year);
        });

        elements = document.querySelectorAll('[data-i18ntail]');
        elements.forEach(elem => {
            var year = elem.dataset['year'];
            var key = elem.dataset['i18ntail'];
            elem.innerHTML = funcGetTail(key, year);
        });
    }

    function funcGetTail(key, year) {
        var splitted = funcGetWithYear(key, year).split('<br>');
        splitted.shift();

        if ((splitted.length > 0) && (splitted[0] === '')) {
            splitted.shift();
        }

        return splitted.join('<br>');
    }

    function funcGetLanguage() {
        return langId;
    }

    function funcSetLanguage(name) {
        langId = name;

        if (i18n[langId]) {
            lang = i18n[langId];

            replaceHTMLEntries();
        } else {
            console.error('Could not find language', name);
        }
    }

/*    function funcGet(key) {
        var value = lang[key] ? lang[key] : (i18n[FALLBACK][key] ? i18n[FALLBACK][key] : '{' + key + '}');

        return value.split(/\r?\n/).join('<br>');
    }*/

    function funcGetWithYear(key, year) {
        var value = '{' + key + '}';

        if (lang[year] && lang[year][key]) {
            value = lang[year][key];
        } else if (lang[key]) {
            value = lang[key];
        } else if (i18n[FALLBACK][year] && i18n[FALLBACK][year][key]) {
            value =  i18n[FALLBACK][year][key];
        } else if (i18n[FALLBACK][key]) {
            value =  i18n[FALLBACK][key];
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetStart(key, year) {
        var splitted = funcGetWithYear(key, year).split('<br>');
        return splitted.shift();
    }

    function funcGetAnswer(country, year, answer) {
        var answers = countries.get(country, year);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var translation = answersLang ? (answersLang[answer] ? answersLang[answer] : answersEN[answer]) : answersEN[answer];
        var value = '';

        if (translation) {
            if (translation.Answer) {
                // 2023
                value = translation.Answer;
            } else if (translation['Answer from 2023']) {
                // 2024
                var newValue = translation['Provide updated answer (if applicable)'];
                value = translation['Answer from 2023'];

                if (newValue !== '') {
                    if (newValue.toLowerCase() !== value.toLowerCase()) {
                        value = newValue + '<br><span style="color:goldenrod;font-size:.8em">2023: ' + value + '</span>';
                    } else {
                        value = newValue;
                    }
                }
            }
        }

        return value;
    }

    function funcGetJustification(country, year, answer) {
        var answers = countries.get(country, year);
        if (!answers) {
            return '';
        }
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var translation = answersLang ? (answersLang[answer] ? answersLang[answer] : answersEN[answer]) : answersEN[answer];
        var value = '';

        if (translation) {
            if (translation.Justification) {
                // 2023
                value = translation.Justification;
            } else if (translation['Explanation from 2023']) {
                // 2024
                var status = translation['Confirm, change or complement answer/explanation from 2023'];
                var newValue = translation['Provide updated explanation (if applicable)'];
                value = translation['Explanation from 2023'];

                if ('Confirm' === status) {
                    if (newValue !== '') {
                        console.error(country + ' ' + year + ' unchanged value has changes');
                    }
                } else if ('Change' === status) {
                    value = newValue + '<br><br><span style="color:goldenrod;font-size:.8em">Former value from 2023<br>' + value + '</span>';
                } else if ('Complement' === status) {
                    value += '<br><br><span style="color:goldenrod;font-size:.8em">Complement from 2024</span><br>' + newValue;
                } else {
                    console.error(status);
                }
            }
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetReviewer1(country, year, answer) {
        var answers = countries.get(country, year);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var translation = answersLang ? (answersLang[answer] ? answersLang[answer] : answersEN[answer]) : answersEN[answer];
        var value = translation && translation['Reviewer 1 Comments'] ? translation['Reviewer 1 Comments'] : '';
        if (value !== '') {
            value = funcGetWithYear('reviewer1', year) + value;
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetReviewer2(country, year, answer) {
        var answers = countries.get(country, year);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var translation = answersLang ? (answersLang[answer] ? answersLang[answer] : answersEN[answer]) : answersEN[answer];
        var value = translation && translation['Reviewer 2 Comments'] ? translation['Reviewer 2 Comments'] : '';
        if (value !== '') {
            value = funcGetWithYear('reviewer2', year) + ' ' + value;
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcAppendTranslations(lang, data, year) {
        if (!i18n[lang][year]) {
            i18n[lang][year] = [];
        }

        data.forEach((item) => {
            i18n[lang][year][item.key] = item.value;
        });
    }

    init();

    return {
        appendTranslations: funcAppendTranslations,
        get: funcGetWithYear,
        getAnswer: funcGetAnswer,
        getJustification: funcGetJustification,
        getLanguage: funcGetLanguage,
        getReviewer1: funcGetReviewer1,
        getReviewer2: funcGetReviewer2,
        getStart: funcGetStart,
        getTail: funcGetTail,
        setLanguage: funcSetLanguage,
    };
}());