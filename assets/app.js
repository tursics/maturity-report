// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataGermany = [],
    loadedDataScore = [];

// ----------------------------------------------------------------------------

function getJustification(key) {
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    str += '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    str += '<br>';

    return str;
}

function getScore(key) {
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    str += item.Score;
    str += '<br>';

    return str;
}

function getAnswer(key) {
    var color = 'bg-gray';
    var item = loadedDataGermany[key];
    var scoreItem = loadedDataScore[key];

    var score = parseInt(item.Score, 10);
    var maxScore = scoreItem ? parseInt(scoreItem.Weight, 10) : NaN;
    var width = maxScore;

    if (isNaN(maxScore) || (maxScore === 0)) {
        color = 'bg-gray';
        width = 5;
    } else if (maxScore === score) {
        color = 'bg-green';
    } else if (0 === score) {
        color = 'bg-red';
    } else {
        color = 'bg-yellow';
    }

    var str = '<span data-i18n-title="' + key + '" title="' + _.get(key) + '" class="answerbox ' + color + '" style="width:' + width + 'px"></span>';

    return str;
}

function onFinishLoading() {
    load.showLog(false);

    var elem = document.getElementById('test');
    var str = '';

    str += getScore('D0.1');
    str += getJustification('R1');
    str += getJustification('R2');
    str += getScore('D0.2');
    str += getAnswer('R9');
    str += getAnswer('R10');
    str += '<br>';
    str += '<hr>';
    str += getScore('TotalScore');
    str += '<hr>';
    str += getScore('D1');
    str += getScore('D1.1');
    str += getAnswer('1');
    str += getAnswer('2');
    str += getAnswer('3');
    str += getAnswer('4');
    str += getAnswer('5');
    str += getAnswer('6a');
    str += getAnswer('6b');
    str += getAnswer('6c');
    str += getAnswer('6d');
    str += getAnswer('7');
    str += getAnswer('8');
    str += getAnswer('9a');
    str += getAnswer('9b');
    str += getAnswer('10a');
    str += getAnswer('10b');
    str += getAnswer('10c');
    str += getAnswer('11a');
    str += getAnswer('11a.1');
    str += getAnswer('11a.2');
    str += getAnswer('11a.3');
    str += getAnswer('11a.4');
    str += getAnswer('11a.5');
    str += getAnswer('11a.6');
    str += getAnswer('11b');
    str += '<br>';
    str += getScore('D1.2');
    str += getAnswer('12');
    str += getAnswer('13');
    str += getAnswer('14');
    str += getAnswer('15');
    str += getAnswer('16');
    str += getAnswer('17a');
    str += getAnswer('17b');
    str += getAnswer('18');
    str += getAnswer('19');
    str += getAnswer('20');
    str += '<br>';
    str += getScore('D1.3');
    str += getAnswer('21');
    str += getAnswer('22a');
    str += getAnswer('22b');
    str += getAnswer('23a');
    str += getAnswer('23b');
    str += getAnswer('23c');
    str += getAnswer('24a');
    str += getAnswer('24b');
    str += getAnswer('25a');
    str += getAnswer('25b');
    str += getAnswer('25c');
    str += getAnswer('25d');
    str += getAnswer('26a');
    str += getAnswer('26b');
    str += getAnswer('27a');
    str += getAnswer('27b');
    str += '<br>';
    str += '<hr>';
    str += getScore('D2');
    str += getScore('D2.1');
    str += getAnswer('28');
    str += getAnswer('29');
    str += getAnswer('30');
    str += getAnswer('31');
    str += getAnswer('32');
    str += getAnswer('33');
    str += getAnswer('34');
    str += getAnswer('35');
    str += getAnswer('36');
    str += '<br>';
    str += getScore('D2.2');
    str += getAnswer('37');
    str += getAnswer('37.1');
    str += getAnswer('37.2');
    str += getAnswer('37.3');
    str += getAnswer('37.4');
    str += getAnswer('37.5');
    str += getAnswer('38');
    str += getAnswer('38.1');
    str += getAnswer('38.2');
    str += getAnswer('38.3');
    str += getAnswer('39a');
    str += getAnswer('39b');
    str += '<br>';
    str += getScore('D2.3');
    str += getScore('D2.3a');
    str += getAnswer('40');
    str += getAnswer('41');
    str += getAnswer('42');
    str += getAnswer('43');
    str += getAnswer('44');
    str += '<br>';
    str += getScore('D2.3b');
    str += getAnswer('45');
    str += getAnswer('46');
    str += getAnswer('47');
    str += getAnswer('48');
    str += getAnswer('49');
    str += '<br>';
    str += getScore('D2.3c');
    str += getAnswer('50');
    str += getAnswer('51');
    str += getAnswer('52');
    str += getAnswer('53');
    str += getAnswer('54');
    str += '<br>';
    str += getScore('D2.3d');
    str += getAnswer('55');
    str += getAnswer('56');
    str += getAnswer('57');
    str += getAnswer('58');
    str += '<br>';
    str += '<hr>';
    str += getScore('D3');
    str += getScore('D3.1');
    str += getAnswer('59');
    str += getAnswer('60');
    str += getAnswer('61');
    str += getAnswer('62a');
    str += getAnswer('62b');
    str += getAnswer('63');
    str += getAnswer('64');
    str += getAnswer('65');
    str += getAnswer('66a');
    str += getAnswer('66b');
    str += getAnswer('66c');
    str += getAnswer('67');
    str += getAnswer('68');
    str += getAnswer('69a');
    str += getAnswer('69b');
    str += getAnswer('69c');
    str += getAnswer('70a');
    str += getAnswer('70b');
    str += getAnswer('71');
    str += getAnswer('72');
    str += getAnswer('73');
    str += getAnswer('74');
    str += getAnswer('75');
    str += getAnswer('76');
    str += getAnswer('77');
    str += '<br>';
    str += getScore('D3.2');
    str += getAnswer('78');
    str += getAnswer('79');
    str += getAnswer('80a');
    str += getAnswer('80b');
    str += getAnswer('81a');
    str += getAnswer('81b');
    str += getAnswer('82');
    str += getAnswer('83');
    str += getAnswer('84');
    str += getAnswer('85');
    str += getAnswer('86');
    str += getAnswer('87');
    str += getAnswer('88');
    str += getAnswer('89');
    str += getAnswer('90a');
    str += getAnswer('90b');
    str += '<br>';
    str += getScore('D3.3');
    str += getAnswer('91');
    str += getAnswer('92a');
    str += getAnswer('92b');
    str += getAnswer('93a');
    str += getAnswer('93b');
    str += getAnswer('93c');
    str += getAnswer('94a');
    str += getAnswer('94b');
    str += getAnswer('95');
    str += getAnswer('96');
    str += getAnswer('97');
    str += '<br>';
    str += getScore('D3.4');
    str += getAnswer('98');
    str += getAnswer('99');
    str += getAnswer('100');
    str += getAnswer('101');
    str += getAnswer('102');
    str += getAnswer('103');
    str += getAnswer('104a');
    str += getAnswer('104b');
    str += getAnswer('104c');
    str += getAnswer('105a');
    str += getAnswer('105b');
    str += '<br>';
    str += '<hr>';
    str += getScore('D4');
    str += getScore('D4.1');
    str += getAnswer('106');
    str += getAnswer('107');
    str += getAnswer('108');
    str += getAnswer('109');
    str += getAnswer('110');
    str += '<br>';
    str += getScore('D4.2');
    str += getAnswer('111a');
    str += getAnswer('111b');
    str += getAnswer('112');
    str += getAnswer('113');
    str += getAnswer('114');
    str += getAnswer('115');
    str += getAnswer('116');
    str += getAnswer('117');
    str += getAnswer('118');
    str += getAnswer('119a');
    str += getAnswer('119b');
    str += '<br>';
    str += getScore('D4.3');
    str += getAnswer('120');
    str += getAnswer('121');
    str += getAnswer('122a');
    str += getAnswer('122b');
    str += getAnswer('123');
    str += getAnswer('124a');
    str += getAnswer('124b');
    str += getAnswer('125a');
    str += getAnswer('125b');
    str += '<br>';
    str += getScore('D4.4');
    str += getAnswer('126');
    str += getAnswer('127');
    str += getAnswer('128a');
    str += getAnswer('128b');
    str += getAnswer('128c');
    str += getAnswer('128d');
    str += getAnswer('128e');
    str += getAnswer('129');
    str += '<br>';

    elem.innerHTML += str;
}

function onFileScoring(filepath, data) {
    loadedDataScore = [];
    data.forEach((obj) => {
        loadedDataScore[obj.ID] = obj;
    });
}

function onFileReportEN(filepath, data) {
    _.appendTranslations('en', data);
}

function onFileReplayDE(filepath, data) {
    loadedDataGermany = [];
    data.forEach((obj) => {
        loadedDataGermany[obj.ID] = obj;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    _.setLanguage(DEFAULT_LANG);

    var test = DEFAULT_LANG;
    setInterval(function() {
        test = test === 'de' ? 'en' : 'de';
        _.setLanguage(test);
    }, 5000);

    load.csv('2023/3-simplified/00_i18n.csv', onFileReportEN);
    load.csv('2023/3-simplified/00_scoring.csv', onFileScoring);
    load.csv('2023/3-simplified/DE_ODM 2023.csv', onFileReplayDE);
    load.addFinishCallback(onFinishLoading);
});

// ----------------------------------------------------------------------------
