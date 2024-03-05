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
            var key = elem.dataset['i18n'];
            elem.innerHTML = funcGet(key);
        });

        elements = document.querySelectorAll('[data-i18nanswer]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var key = elem.dataset['i18nanswer'];
            elem.innerHTML = funcGetAnswer(country, key);
        });

        elements = document.querySelectorAll('[data-i18njustification]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var key = elem.dataset['i18njustification'];
            elem.innerHTML = funcGetJustification(country, key);
        });

        elements = document.querySelectorAll('[data-i18nreviewer1]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var key = elem.dataset['i18nreviewer1'];
            elem.innerHTML = funcGetReviewer1(country, key);
        });

        elements = document.querySelectorAll('[data-i18nreviewer2]');
        elements.forEach(elem => {
            var country = elem.dataset['country'];
            var key = elem.dataset['i18nreviewer2'];
            elem.innerHTML = funcGetReviewer2(country, key);
        });

        elements = document.querySelectorAll('[data-i18nstart]');
        elements.forEach(elem => {
            var key = elem.dataset['i18nstart'];
            elem.innerHTML = funcGetStart(key);
        });

        elements = document.querySelectorAll('[data-i18ntail]');
        elements.forEach(elem => {
            var key = elem.dataset['i18ntail'];
            elem.innerHTML = funcGetTail(key);
        });
    }

    function funcGetTail(key) {
        var splitted = funcGet(key).split('<br>');
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

    function funcGet(key) {
        var value = lang[key] ? lang[key] : (i18n[FALLBACK][key] ? i18n[FALLBACK][key] : '{' + key + '}');

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetStart(key) {
        var splitted = funcGet(key).split('<br>');
        return splitted.shift();
    }

    function funcGetAnswer(country, answer) {
        var answers = countries.get(country);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var value = answersLang ? (answersLang[answer] ? answersLang[answer].Answer : answersEN[answer].Answer) : answersEN[answer].Answer;

        return value;
    }

    function funcGetJustification(country, answer) {
        var answers = countries.get(country);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var value = answersLang ? (answersLang[answer] ? answersLang[answer].Justification : answersEN[answer].Justification) : answersEN[answer].Justification;

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetReviewer1(country, answer) {
        var answers = countries.get(country);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var value = answersLang ? (answersLang[answer] ? answersLang[answer]['Reviewer 1 Comments'] : answersEN[answer]['Reviewer 1 Comments']) : answersEN[answer]['Reviewer 1 Comments'];
        if (value !== '') {
            value = funcGet('reviewer1') + value;
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcGetReviewer2(country, answer) {
        var answers = countries.get(country);
        var answersEN = answers['en'];
        var answersLang = answers[_.getLanguage()];

        var value = answersLang ? (answersLang[answer] ? answersLang[answer]['Reviewer 2 Comments'] : answersEN[answer]['Reviewer 2 Comments']) : answersEN[answer]['Reviewer 2 Comments'];
        if (value !== '') {
            value = funcGet('reviewer2') + ' ' + value;
        }

        return value.split(/\r?\n/).join('<br>');
    }

    function funcAppendTranslations(lang, data) {
        data.forEach((item) => {
            i18n[lang][item.key] = item.value;
        });
    }

    init();

    return {
        appendTranslations: funcAppendTranslations,
        get: funcGet,
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