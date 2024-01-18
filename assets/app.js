// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataGermany = [],
    loadedDataScore = [],
    questionTree = [];

// ----------------------------------------------------------------------------

function getJustification(key) {
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    str += '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    str += '<br>';

    return str;
}

function getScore(obj) {
    if (obj.id === 'D0') {
        return 0;
    }

    var item = loadedDataGermany[obj.id];
    var score = item && item.Score ? parseInt(item.Score, 10) : NaN;

    if (isNaN(score) || (obj.type === 'dimension')) {
        score = 0;
    }

    if (obj.children) {
        obj.children.forEach((child) => score += getScore(child));
    }

    return score;
}

function getMaxScore(obj) {
    var scoreItem = loadedDataScore[obj.id];
    var maxScore = scoreItem ? parseInt(scoreItem.Weight, 10) : NaN;

    if (isNaN(maxScore)) {
        maxScore = 0;
    }

    if (obj.children) {
        obj.children.forEach((child) => maxScore += getMaxScore(child));
    }

    return maxScore;
}

function getHTMLScore(obj) {
    var key = obj.id;
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    var score = item && item.Score ? parseInt(item.Score, 10) : 0;
    var maxScore = getMaxScore(obj);
    var percentage = maxScore === 0 ? '' : (parseInt(score / maxScore * 1000, 10) / 10) + '%';

    if (score !== getScore(obj)) {
        console.error('Score does not match in', obj.id);
    }
    str += percentage;
    str += ' (' + score + '/' + maxScore + ')';
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

function createQuestionTree(data) {
    var tree = {type: 'root', id: 'root', children: []};
    var parent = tree.children;

    parent.push({type: 'dimension', id: 'D0', children: []});
    parent = parent[parent.length - 1].children;

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

    questionTree = tree;
}

function onFinishLoading() {
    load.showLog(false);

    var elem = document.getElementById('test');
    var str = '';

    str += getJustification('R1');
    str += '<br>';

    questionTree.children.forEach((level1) => {
        if ('dimension' === level1.type) {
            str += '<hr>';
            str += getHTMLScore(level1);

            level1.children.forEach((level2) => {
                if ('dimension' === level2.type) {
                    str += getHTMLScore(level2);

                    level2.children.forEach((level3) => {
                        if ('dimension' === level3.type) {
                            str += getHTMLScore(level3);

                            level3.children.forEach((level4) => {
                                str += getAnswer(level4.id);
                            });
                            str += '<br>';
                        } else {
                            str += getAnswer(level3.id);
                        }
                    });
                    str += '<br>';
                }
            });
            str += '<br>';
        }
    });

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

    createQuestionTree(data);
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
