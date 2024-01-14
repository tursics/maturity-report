// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataGermany = [];

// ----------------------------------------------------------------------------

function onFinishLoading() {
    var elem = document.getElementById('test');
    var key = 'R1';

    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    loadedDataGermany.forEach((item) => {
        if (item.ID === key) {
            str += '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span> ';
        }
    });
    str += '<br>';

    elem.innerHTML += str;
}

function onFileReportEN(filepath, data) {
    _.appendTranslations('en', data);
}

function onFileReplayDE(filepath, data) {
    loadedDataGermany = data;
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
    load.addFinishCallback(onFinishLoading);
});

// ----------------------------------------------------------------------------
