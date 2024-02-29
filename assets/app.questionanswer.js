var questionAnswer = (function () {
    var LEVEL_ROOT = 'root',
        LEVEL_DEBUG = 'debug',
        Q_PRE_SCORE = 'PreliminaryScore',
        Q_TOTAL_SCORE = 'TotalScore';

    function init() {
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

    function setQuestionnaire(id) {
        var obj = funcGet(id);
        if (undefined === obj) {
            console.error('Unknown id', id);
            return;
        }
        if (obj.length === 0) {
            // console.error('No data loaded');
            return;
        }

        var headlineKey = '';
        var questionStr = '';
        var guideKey = 'G' + obj.id;
        var guideStr = _.get(guideKey);
        var noteKey = 'N' + obj.id.substr(1);
        var noteStr = _.get(noteKey);

        if (LEVEL_ROOT === obj.id) {
            headlineKey = 'odm_report';
        } else if ('dimension' === obj.type) {
            headlineKey = obj.id;
        } else {
            headlineKey = obj.id;
            questionStr = '<span data-i18n="Question">' + _.get('Question') + '</span>' + ' ' + obj.id;
        }
        if (guideStr === ('{' + guideKey + '}')) {
            guideStr = '-';
        } else {
            guideStr = '<span data-i18n="' + guideKey + '">' + guideStr + '</span>';
        }
        if (('dimension' === obj.type) && (noteStr !== ('{' + noteKey + '}'))) {
            noteStr = '<span data-i18n="' + noteKey + '">' + noteStr + '</span>';
        } else {
            noteStr = _.getTail(headlineKey);
            if (noteStr === '') {
                noteStr = '-';
            } else {
                noteStr = '<span data-i18ntail="' + obj.id + '">' + _.getTail(headlineKey) + '</span>';
            }
        }

        var elem;

        elem = document.getElementById('sidebar-headline');
        elem.dataset['i18nstart'] = headlineKey;
        elem.innerHTML = _.getStart(headlineKey);
        elem = document.getElementById('shield-headline');
        elem.dataset['i18nstart'] = headlineKey;
        elem.innerHTML = _.getStart(headlineKey);

        elem = document.getElementById('sidebar-notes');
        elem.innerHTML = noteStr;

        elem = document.getElementById('sidebar-question');
        elem.innerHTML = questionStr === '' ? '-' : questionStr;
        elem = document.getElementById('shield-question');
        elem.innerHTML = questionStr;

        elem = document.getElementById('sidebar-answering');
        elem.innerHTML = guideStr;
    }

    function prepareButtons(id) {
        var search = document.getElementById('sidebar-search');
        var isNotSearch = search.classList.contains('hidden');

        var button1 = document.getElementById('buttonPrev1');
        var button2 = document.getElementById('buttonPrev2');
        if (isNotSearch) {
            button1.style.display = 'inline-block';
            button2.style.display = 'inline-block';
        }
        button1.classList.remove('disabled');
        button2.classList.remove('disabled');

        if (id === LEVEL_ROOT) {
            button1.classList.add('disabled');
            button2.classList.add('disabled');
        }

        button1 = document.getElementById('buttonNext1');
        button2 = document.getElementById('buttonNext2');
        if (isNotSearch) {
            button1.style.display = 'inline-block';
            button2.style.display = 'inline-block';
        }
        button1.classList.remove('disabled');
        button2.classList.remove('disabled');

        if (!getNextID()) {
            button1.classList.add('disabled');
            button2.classList.add('disabled');
        }

        button1 = document.getElementById('buttonUpwards1');
        button2 = document.getElementById('buttonUpwards2');
        if (isNotSearch) {
            button1.style.display = 'inline-block';
            button2.style.display = 'inline-block';
        }
        button1.classList.remove('disabled');
        button2.classList.remove('disabled');

        if (id === LEVEL_ROOT) {
            button1.classList.add('disabled');
            button2.classList.add('disabled');
        }
    }

    function funcGet(id) {
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
        } else if (id === LEVEL_ROOT) {
            // root
        } else {
            obj = {type: 'entry', id};
        }

        return obj;
    }

    function getPrevID() {
        var current = currentID;
        var root = getParent(current);

        if (!root) {
            return undefined;
        }

        var index = root.children.findIndex((child) => child.id === current) - 1;
        if (index < 0) {
            return root.id;
        }

        var current = root.children[index];
        if (Q_PRE_SCORE === current.id) {
            return root.id;
        }

        do {
            var obj = funcGet(current.id);
            if (obj && obj.children && (obj.children.length > 0)) {
                current = obj.children[obj.children.length - 1];
            } else {
                return current.id;
            }
        } while (true);
    }

    function getNextID() {
        var current = currentID;
        var obj = funcGet(current);

        if (obj && obj.children && (obj.children.length > 0)) {
            if (Q_TOTAL_SCORE === obj.children[0].id) {
                return obj.children[3].id;
            }

            return obj.children[0].id;
        }

        do {
            var root = getParent(current);
            if (!root) {
                return undefined;
            }

            var index = root.children.findIndex((child) => child.id === current) + 1;
            if (index < root.children.length) {
                return root.children[index].id;
            }

            current = root.id;
        } while (true);
    }

    function funcJumpUpwards() {
        var level = LEVEL_ROOT;
        var root = getParent(currentID);

        if (root) {
            level = root.id;
        }

        funcJumpToID(level);
    }

    function funcJumpToPrev() {
        var level = getPrevID();

        if (level) {
            if (LEVEL_DEBUG === level) {
                funcJumpToDebug();
            } else {
                funcJumpToID(level);
            }
        }
    }

    function funcJumpToNext() {
        var level = getNextID();

        if (level) {
            if (LEVEL_DEBUG === level) {
                funcJumpToDebug();
            } else {
                funcJumpToID(level);
            }
        }
    }

    function funcJumpToID(id) {
        var question = funcGet(id);

        if (undefined === question) {
            console.error('Unknown id', id);
            return;
        }

        currentID = id;

        prepareButtons(currentID);

        shields.forEach((shield) => shield.setQuestion(question));

        setQuestionnaire(currentID);
    }

    function funcJumpToDebug() {
        currentID = LEVEL_DEBUG;

        prepareButtons(currentID);

        shields.forEach((shield) => shield.setDebug());

        setQuestionnaire(LEVEL_ROOT);
    }

    init();

    return {
        get: funcGet,
        jumpToDebug: funcJumpToDebug,
        jumpToID: funcJumpToID,
        jumpToNext: funcJumpToNext,
        jumpToPrev: funcJumpToPrev,
        jumpUpwards: funcJumpUpwards,
    };
}());