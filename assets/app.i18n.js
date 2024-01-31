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

        elements = document.querySelectorAll('[data-i18nstart]');
        elements.forEach(elem => {
            var key = elem.dataset['i18nstart'];
            var splitted = funcGet(key).split('<br>');
            elem.innerHTML = splitted.shift();
        });

        elements = document.querySelectorAll('[data-i18ntail]');
        elements.forEach(elem => {
            var key = elem.dataset['i18ntail'];
            var splitted = funcGet(key).split('<br>');
            splitted.shift();
            if ((splitted.length > 0) && (splitted[0] === '')) {
                splitted.shift();
            }
            elem.innerHTML = splitted.join('<br>');
        });
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
        var arr = value.split(/\r?\n/);

        return arr.join('<br>');
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
        setLanguage: funcSetLanguage,
    };
}());