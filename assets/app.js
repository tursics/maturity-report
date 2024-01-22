// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/',
    COLORS = {'de': 'goldenrod', 'D0': 'goldenrod','D1': '#00aef2','D2': '#dc5149','D3': '#001d85','D4': '#ff9933'};

var loadedDataGermany = [],
    loadedDataScore = [],
    questionTree = [],
    currentLevel = '';

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

    var parentD0 = parent;

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

    parentD0.push({type: 'dimension', id: 'debug', children: []});

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
    } else if (id === 'root') {
        // root
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
    var shieldBack = document.getElementById('shieldBack');
    var elemCaption = shield.getElementsByClassName('shield-caption')[0];
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var elemScore = shield.getElementsByClassName('shield-score')[0];
    var item = loadedDataGermany['R1'];
    var str = '';

    str = '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    elemCaption.innerHTML = str;
    elemBoard.innerHTML = '';
    elemScore.innerHTML = score;

    shield.style.display = 'inline-block';
    shieldBack.style.display = 'inline-block';
    shieldBack.classList.remove('disabled');

    if (currentLevel === 'root') {
        shieldBack.classList.add('disabled');
    }
}

function setShieldLevel(root, id) {
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

    currentLevel = id;

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
            var value = dimension.percentage;
            var label = dimension.percentage;

            if (dimension.id === 'D0') {
                label = _.get('Info');
            } else if (dimension.id === 'D0.1') {
                label = _.get('Info');
                value = '75%';
            } else if (dimension.id === 'D0.2') {
                label = _.get('EU');
                value = '75%';
            } else if (dimension.id === 'debug') {
                label = _.get('debug');
                value = '25%';
            }

            str += '<div onclick="goto(\'' + dimension.id + '\')" class="score-barchart" style="left: ' + (x + .5) + 'em;background: repeating-linear-gradient(0,' + color + ',' + color + ' ' + value + ',#555 0,#555 100%);"></div>';
            str += '<div onclick="goto(\'' + dimension.id + '\')" class="score-barchart-label" style="left: ' + x + 'em;">' + label + '</div>';

            x += 3;
        });
    } else {
        str += answers;
    }

    elemBoard.innerHTML = str;
}

function setShieldLevelBack() {
    var level = 'root';

    if (currentLevel === 'root') {
        return;
    } else if (currentLevel === 'debug') {
        level = 'D0';
    } else if (currentLevel.length === 4) {
        level = currentLevel.substring(0, 2);
    } else if (currentLevel.length > 4) {
        level = currentLevel.substring(0, currentLevel.length - 1);
    }

    setShieldLevel(loadedDataGermany, level);
}

function setShieldLevelDebug() {
    var shield = document.getElementById('shield1');
    var elemBoard = shield.getElementsByClassName('shield-board')[0];
    var str = '';

    currentLevel = 'debug';
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

    setShieldLevel(loadedDataGermany, 'root');

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
    if ('back' === destination) {
        setShieldLevelBack();
    } else if ('debug' === destination) {
        setShieldLevelDebug();
    } else {
        setShieldLevel(loadedDataGermany, destination);
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
