var questionAnswer = (function () {
    var LEVEL_ROOT = 'root',
        LEVEL_DEBUG = 'debug',
        Q_PRE_SCORE = 'PreliminaryScore',
        Q_TOTAL_SCORE = 'TotalScore';

    function init() {
    }

    function getParent(id, year) {
        function getParent_(root) {
            var ret = null;
    
            if (root.children) {
                if (root.children.find((child) => child.id[year] === id)) {
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

    function getItem(id, year) {
        var parent = getParent(id, year);

        if (parent) {
            var item = parent.children.find((child) => child.id[year] === id);
                if (item) {
                    return item;
            }
        }

        return null;
    }

    function setQuestionnaire(id, year) {
        var obj = funcGet(id, year);
        if ((undefined === obj) || (null === obj)) {
            console.error('Unknown id', id);
            return;
        }
        if (obj.length === 0) {
            // console.error('No data loaded');
            return;
        }

        var headlineKey = '';
        var questionStr = '';
        var guideKey = 'G' + obj.id[year];
        var guideStr = _.get(guideKey);
        var noteKey = 'N' + obj.id[year].substr(1);
        var noteStr = _.get(noteKey);

        if (LEVEL_ROOT === obj.id[year]) {
            headlineKey = 'odm_report';
        } else if ('dimension' === obj.type) {
            headlineKey = obj.id[year];
        } else {
            headlineKey = obj.id[year];
            questionStr = '<span data-i18n="Question">' + _.get('Question') + '</span>' + ' ' + obj.id[year];
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
                noteStr = '<span data-i18ntail="' + obj.id[year] + '">' + _.getTail(headlineKey) + '</span>';
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

    function prepareButtons() {
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

        if (currentID === LEVEL_ROOT) {
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

        if (currentID === LEVEL_ROOT) {
            button1.classList.add('disabled');
            button2.classList.add('disabled');
        }
    }

    function funcGet(id, year) {
        var obj = questionTree;

        if (0 === id.indexOf('D')) {
            if (id.length >= 2) {
                obj = obj.children.find((elem) => elem.id[year] === id.substring(0, 2));

                if (id.length >= 4) {
                    obj = obj.children.find((elem) => elem.id[year] === id.substring(0, 4));

                    if (id.length >= 5) {
                        obj = obj.children.find((elem) => elem.id[year] === id.substring(0, 5));
                    }
                }
            }
        } else if (id === LEVEL_ROOT) {
            // root
        } else {
            obj = getItem(id, year);
        }

        return obj;
    }

    function getPrevID() {
        var current = currentID;
        var year = currentYear;
        var root = getParent(current, year);

        if (!root) {
            return undefined;
        }

        var index = root.children.findIndex((child) => child.id[year] === current) - 1;
        if (index < 0) {
            var child = root.id;

            if (!child[year]) {
                year = Object.keys(child)[0];
            }

            return {
                id: child[year],
                year: year
            };
        }

        var current = root.children[index];
        if (!current.id[year]) {
            year = Object.keys(current.id)[0];
        }
        if (Q_PRE_SCORE === current.id[year]) {
            return {
                id: root.id[year],
                year: year
            };
        }

        do {
            var obj = funcGet(current.id[year], year);
            if (obj && obj.children && (obj.children.length > 0)) {
                current = obj.children[obj.children.length - 1];

                if (!current.id[year]) {
                    year = Object.keys(current.id)[0];
                }
            } else {
                return {
                    id: current.id[year],
                    year: year
                };
            }
        } while (true);
    }

    function getNextID() {
        var current = currentID;
        var year = currentYear;
        var obj = funcGet(current, year);

        if (obj && obj.children && (obj.children.length > 0)) {
            var child = obj.children[0].id;
            if (Q_TOTAL_SCORE === obj.children[0].id[year]) {
                child = obj.children[3].id;
            }

            if (!child[year]) {
                year = Object.keys(child)[0];
            }

            return {
                id: child[year],
                year: year
            };
        }

        do {
            var root = getParent(current, year);
            if (!root) {
                return undefined;
            }

            var index = root.children.findIndex((child) => child.id[year] === current) + 1;
            if (index < root.children.length) {
                var child = root.children[index].id;

                if (!child[year]) {
                    year = Object.keys(child)[0];
                }
    
                return {
                    id: child[year],
                    year: year
                };
            }

            var parent = root.id;
            if (!parent[year]) {
                year = Object.keys(parent)[0];
            }

            current = parent[year];
        } while (true);
    }

    function funcJumpUpwards() {
        var level = LEVEL_ROOT;
        var root = getParent(currentID, currentYear);

        if (root) {
            level = root.id[currentYear];
        }

        funcJumpToID(level, currentYear);
    }

    function funcJumpToPrev() {
        var level = getPrevID();

        if (level) {
            if (LEVEL_DEBUG === level.id) {
                funcJumpToDebug();
            } else {
                funcJumpToID(level.id, level.year);
            }
        }
    }

    function funcJumpToNext() {
        var level = getNextID();

        if (level) {
            if (LEVEL_DEBUG === level.id) {
                funcJumpToDebug();
            } else {
                funcJumpToID(level.id, level.year);
            }
        }
    }

    function funcJumpToID(id, year) {
        var question = funcGet(id, year);

        if (undefined === question) {
            console.error('Unknown id', id);
            return;
        }

        currentID = id;
        currentYear = year;

        prepareButtons();

        shields.forEach((shield) => shield.setQuestion(question));

        setQuestionnaire(currentID, currentYear);
    }

    function funcJumpToDebug() {
        currentID = LEVEL_DEBUG;

        prepareButtons();

        shields.forEach((shield) => shield.setDebug());

        setQuestionnaire(LEVEL_ROOT, currentYear);
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