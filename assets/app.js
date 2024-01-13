// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de';

// ----------------------------------------------------------------------------

var _ = (function () {
    var langId = '';
    var lang = [];

    function init() {
        try {
            lang = i18n['en'];
        } catch(e) {
            console.error('Could not load language files');
        }
    }

    function replaceHTMLEntries() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(elem => {
            var key = elem.dataset['i18n'];
            elem.innerHTML = lang[key];
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

    init();

    return {
        setLanguage: funcSetLanguage,
    };
}());

// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    _.setLanguage(DEFAULT_LANG);
});

// ----------------------------------------------------------------------------
