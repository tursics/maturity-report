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
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(elem => {
            var key = elem.dataset['i18n'];
            elem.innerHTML = funcGet(key);
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