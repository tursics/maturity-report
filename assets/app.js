// ----------------------------------------------------------------------------

var DEFAULT_LANG = 'de',
    WEBSERVER_PATH = 'https://tursics.github.io/maturity-report/';

var loadedDataGermany = [],
    loadedDataScore = [],
    questionTree = [],
    shields = [],
    currentID = '';

// ----------------------------------------------------------------------------
/*
function getJustification(key) {
    var str = '<span data-i18n="' + key + '">' + _.get(key) + '</span> ';
    var item = loadedDataGermany[key];

    str += '<span data-i18n="' + item.Justification + '">' + _.get(item.Justification) + '</span>';
    str += '<br>';

    return str;
}*/

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

function getParent(id) {
    function getParent_(root) {
        var ret = null;

        if (root.children) {
            if (root.children.find((child) => child.id === id)) {
                return root;
            }
            root.children.forEach((child) => {
                if (!ret) {
                    ret = getParent_(child);
                }
            });
        }

        return ret;
    }

    return getParent_(questionTree);
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
        obj = {type: 'entry', id};
    }

    return obj;
}

function prepareButtons(id) {
    var buttonAdd = document.getElementById('buttonAdd');
    buttonAdd.style.display = 'inline-block';

    var buttonBack = document.getElementById('buttonBack');
    buttonBack.style.display = 'inline-block';
    buttonBack.classList.remove('disabled');

    if (id === 'root') {
        buttonBack.classList.add('disabled');
    }
}

function setShieldLevel(id) {
    var question = getQuestion(id);

    if (undefined === question) {
        console.error('Unknown id', id);
        return;
    }

    currentID = id;

    prepareButtons(currentID);

    shields.forEach((shield) => shield.setQuestion(question));
}

function setShieldLevelDebug() {
    currentID = 'debug';

    prepareButtons(currentID);

    shields.forEach((shield) => shield.setDebug());
}

function setShieldLevelBack() {
    var level = 'root';
    var root = getParent(currentID);

    if (root) {
        level = root.id;
    }

    setShieldLevel(level);
    setQuestionnaire(loadedDataGermany, level);
}

function setQuestionnaire(root, id) {
    var headline = document.getElementById('headline');

    var obj = getQuestion(id);
    if (undefined === obj) {
        console.error('Unknown id', id);
        return;
    }

    var str = id === 'root' ? '' : getHTMLScore(obj);

    headline.innerHTML = str;
}

function onFinishLoading() {
    load.showLog(false);

    setShieldLevel('root');
    setQuestionnaire(loadedDataGermany, 'root');
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
        setQuestionnaire(loadedDataGermany, 'root');
    } else {
        setShieldLevel(destination);
        setQuestionnaire(loadedDataGermany, destination);
    }
}

function add() {
    var shield = new Shield(loadedDataGermany);

    shields.push(shield);

    goto(currentID);
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
