// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

// ----------------------------------------------------------------------------

function onFileReportEN(filepath, data) {
    console.log(filepath, data);
}
function onFileReplayDE(filepath, data) {
    console.log(filepath, data);
}

document.addEventListener('DOMContentLoaded', function() {
    _.setLanguage(DEFAULT_LANG);

    var test = DEFAULT_LANG;
    setInterval(function() {
        test = test === 'de' ? 'en' : 'de';
        _.setLanguage(test);
    }, 5000);

    load.csv('2023/3-simplified/00_i18n.csv', onFileReportEN);
    load.csv('2023/3-simplified/DE_ODM 2023.csv', onFileReplayDE);
});

// ----------------------------------------------------------------------------
