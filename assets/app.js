// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/',
    COLORS = {'D0': '#555','D1': '#00aef2','D2': '#dc5149','D3': '#001d85','D4': '#ff9933'};

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

function getAnswer(key, showGray) {
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

    var str = '<span data-i18n-title="' + key + '" title="' + _.get(key) + '" class="answerbox ' + color + '" style="width:' + (width / 20) + 'em"></span>';

    if (!showGray && (color === 'bg-gray')) {
        str = '';
    }

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

function getQuestion(id) {
    var obj = questionTree;

    if (0 === id.indexOf('D')) {
        if (id.length >= 2) {
            obj = obj.children.find((elem) => elem.id === id.substring(0, 2));

            if (id.length >= 4) {
                obj = obj.children.find((elem) => elem.id === id.substring(0, 4));

                if (id.length >= 5) {
                    obj = obj.children.find((elem) => elem.id === id.substring(0, 5));
                }
            }
        }
    } else {
        obj = undefined;
    }

    return obj;
}

function getPercentage(question) {
    var score = getScore(question);
    var maxScore = getMaxScore(question);

    return maxScore === 0 ? '' : (parseInt(score / maxScore * 1000, 10) / 10) + '%';
}

function prepareShield(score) {
    var shield = document.getElementById('shield1');
    var elemCaption = shield.getElementsByClassName('shield-caption')[0];
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var elemScore = shield.getElementsByClassName('shield-score')[0];
    var item = loadedDataGermany['R1'];
    var str = '';

    str = '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    elemCaption.innerHTML = str;
    elemBoard.innerHTML = '';
    elemScore.innerHTML = score;

    shield.style.display = 'block';
}

function setShieldLevelRoot(obj) {
    var shield = document.getElementById('shield1');
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var dimensions = [];
    var str = '';
    var id = '';

    obj.children.forEach((child) => {
        if ('dimension' === child.type) {
            var score = getScore(child);
            var maxScore = getMaxScore(child);
            var percentage = maxScore === 0 ? '' : Math.round(score / maxScore * 100) + '%';
            dimensions[child.id] = percentage;
        }
    });

    id = 'D0';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart" style="left: 1.5em;background: #555;"></div>';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart-label" style="left: 1em;">' + _.get('Info') + '</div>';

    // D1: Open Data Policy
    id = 'D1';
    str += '<div onclick="goto(\'' + id + '\')" class="odm-bg-policy score-barchart" style="left: 4.5em;background: repeating-linear-gradient(0,#00aef2,#00aef2 ' + dimensions['D1'] + ',#555 0,#555 100%);"></div>';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart-label" style="left: 4em;">' + dimensions['D1'] + '</div>';

    // D3: Open Data Portal
    id = 'D3';
    str += '<div onclick="goto(\'' + id + '\')" class="odm-bg-portal score-barchart" style="left: 7.5em;background: repeating-linear-gradient(0,#001d85,#001d85 ' + dimensions['D3'] + ',#555 0,#555 100%);"></div>';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart-label" style="left: 7em;">' + dimensions['D3'] + '</div>';

    // D2: Open Data Impact
    id = 'D2';
    str += '<div onclick="goto(\'' + id + '\')" class="odm-bg-impact score-barchart" style="left: 10.5em;background: repeating-linear-gradient(0,#dc5149,#dc5149 ' + dimensions['D2'] + ',#555 0,#555 100%);"></div>';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart-label" style="left: 10em;">' + dimensions['D2'] + '</div>';

    // D4: Open Data Quality
    id = 'D4';
    str += '<div onclick="goto(\'' + id + '\')" class="odm-bg-quality score-barchart" style="left: 13.5em;background: repeating-linear-gradient(0,#ff9933,#ff9933 ' + dimensions['D4'] + ',#555 0,#555 100%);"></div>';
    str += '<div onclick="goto(\'' + id + '\')" class="score-barchart-label" style="left: 13em;">' + dimensions['D4'] + '</div>';

    elemBoard.innerHTML = str;
}

function setShieldLevelCommon(root, id) {
    var shield = document.getElementById('shield1');
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var dimensions = [];
    var answers = '';
    var str = '';

    var obj = getQuestion(id);
    if (undefined === obj) {
        console.error('Unknown id', id);
        return;
    }

    var percentage = getPercentage(obj);
    prepareShield(percentage);

    obj.children.forEach((child) => {
        if ('dimension' === child.type) {
            var score = getScore(child);
            var maxScore = getMaxScore(child);
            var percentage = maxScore === 0 ? '' : Math.round(score / maxScore * 100) + '%';
            dimensions.push({id: child.id, percentage});
        } else {
            answers += getAnswer(child.id, false);
        }
    });

    if (dimensions.length > 0) {
        var x = (17 - dimensions.length * 3) / 2;
        dimensions.forEach((dimension) => {
            var color = COLORS[dimension.id.substring(0,2)];

            str += '<div onclick="goto(\'' + dimension.id + '\')" class="score-barchart" style="left: ' + (x + .5) + 'em;background: repeating-linear-gradient(0,' + color + ',' + color + ' ' + dimension.percentage + ',#555 0,#555 100%);"></div>';
            str += '<div onclick="goto(\'' + dimension.id + '\')" class="score-barchart-label" style="left: ' + x + 'em;">' + dimension.percentage + '</div>';

            x += 3;
        });
    } else {
        str += answers;
    }

    elemBoard.innerHTML = str;
}

function setShieldLevelDebug() {
    var shield = document.getElementById('shield1');
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var str = '';

    prepareShield('debug');

    function processChildren(root) {
        root.children.forEach((child) => {
            if ('dimension' === child.type) {
                processChildren(child);
            } else {
                str += getAnswer(child.id, false);
            }
        });
    }

    processChildren(questionTree);

    elemBoard.innerHTML = str;
}

function onFinishLoading() {
    load.showLog(false);

    var item = loadedDataGermany['TotalScore'];
    var score = item && item.Score ? parseInt(item.Score, 10) : 0;
    var maxScore = getMaxScore(questionTree);
    var percentage = maxScore === 0 ? '' : (parseInt(score / maxScore * 1000, 10) / 10) + '%';

    if (score !== getScore(questionTree)) {
        console.error('Total score does not match');
    }

    prepareShield(percentage);
    setShieldLevelRoot(questionTree);

    var elem = document.getElementById('test');
    var str = '';

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
                                str += getAnswer(level4.id, true);
                            });
                            str += '<br>';
                        } else {
                            str += getAnswer(level3.id, true);
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

function goto(destination) {
    if ('D0' === destination) {
        setShieldLevelDebug();
    } else {
        setShieldLevelCommon(loadedDataGermany, destination);
    }
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
