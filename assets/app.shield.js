class Shield {
    COLORS = {'de': 'goldenrod', 'D0': 'goldenrod','D1': '#00aef2','D2': '#dc5149','D3': '#001d85','D4': '#ff9933'};

    constructor(country, answers) {
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000);
        this.answers = answers;
        this.country = country;

        this.createHTML();
    }

    createHTML() {
        var zoom = null;
        if (shields.length > 0) {
            var elem = document.getElementById(shields[0].id);
            zoom = elem.classList.value.replace('shield', '').replace('indian-red', '').replace('golden-rod', '').replace('sea-green', '').trim();
        }

        var node = document.createElement('figure');
        node.id = this.id;
        node.classList.add('shield');
        node.style = 'display:inline-block';

        if (zoom) {
            node.classList.add(zoom);
        }

        node.innerHTML = 
            '<div class="shield-border"></div>' +
            '<div class="shield-background">' +
                '<div class="shield-board"></div>' +
                '<div class="shield-score"></div>' +
            '</div>' +
            '<figcaption class="shield-ribbon">' +
                '<div class="shield-caption"></div>' +
            '</figcaption>';

        document.getElementById('shields').appendChild(node);
    }

    removeHTML() {
        var elem = document.getElementById(this.id);
        elem.remove();
    }

    getScore(obj) {
        if (obj.id === 'D0') {
            return 0;
        }

        var item = this.answers['en'][obj.id];
        var score = item && item.Score ? parseInt(item.Score, 10) : NaN;

        if (isNaN(score) || (obj.type === 'dimension')) {
            score = 0;
        }

        if (obj.children) {
            obj.children.forEach((child) => score += this.getScore(child));
        }

        return score;
    }

    getMaxScore(obj) {
        var scoreItem = loadedDataScore[obj.id];
        var maxScore = scoreItem ? parseInt(scoreItem.Weight, 10) : NaN;

        if (isNaN(maxScore)) {
            maxScore = 0;
        }

        if (obj.children) {
            obj.children.forEach((child) => maxScore += this.getMaxScore(child));
        }

        return maxScore;
    }

    getPercentage(question) {
        var score = this.getScore(question);
        var maxScore = this.getMaxScore(question);

        return maxScore === 0 ? '' : (parseInt(score / maxScore * 1000, 10) / 10) + '%';
    }

    getAnswerBox(obj, showGray) {
        var color = 'bg-gray';

        var item = this.answers['en'][obj.id];
        var score = parseInt(item.Score, 10);

        var scoreItem = loadedDataScore[obj.id];
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

        var shrinkBy = showGray ? 6 : 20;
        var height = showGray ? 2.3 : .9;
        var tooltip = _.get(obj.id).split('<br>')[0];
        var str = '<span onclick="goto(\'' + obj.id + '\')" data-i18n-title="' + (obj.id) + '" title="' + tooltip + '" class="answerbox ' + color + '" style="width:' + (width / shrinkBy) + 'em;height:' + height + 'em"></span>';

        if (!showGray && (color === 'bg-gray')) {
            str = '';
        }

        return str;
    }

    getAnswerText(obj) {
        var str = '';

        str += '<div data-country="' + this.country + '" data-i18nanswer="' + obj.id + '" class="answer">' + _.getAnswer(this.country, obj.id) + '</div>';
        str += '<div data-country="' + this.country + '" data-i18njustification="' + obj.id + '" class="justification">' + _.getJustification(this.country, obj.id) + '</div>';

        return str;
    }

    setCaption(score) {
        var elem = document.getElementById(this.id);
        var elemCaption = elem.getElementsByClassName('shield-caption')[0];
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var elemScore = elem.getElementsByClassName('shield-score')[0];

        var country = _.getJustification(this.country, 'R1');
        var str = '';

        if (country) {
            str = '<span data-country="' + this.country + '" data-i18njustification="' + 'R1' + '">' + country + '</span>';
        }

        elemCaption.innerHTML = str;
        elemBoard.innerHTML = '';
        elemBoard.classList.remove('zoomable');
        elemScore.innerHTML = score;

        elem.classList.remove('indian-red');
        elem.classList.remove('golden-rod');
        elem.classList.remove('sea-green');

        if (score === '0%') {
            elem.classList.add('indian-red');
        } else if (score === '100%') {
            elem.classList.add('sea-green');
        } else if (score !== '') {
            elem.classList.add('golden-rod');
        }
    }

    setDebug() {
        var elem = document.getElementById(this.id);
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var str = '';
        var that = this;

        var percentage = this.getPercentage(getQuestion('root'));
        this.setCaption(percentage);

        function processChildren(root) {
            root.children.forEach((child) => {
                if ('dimension' === child.type) {
                    processChildren(child);
                } else {
                    str += that.getAnswerBox(child, false);
                }
            });
        }

        processChildren(questionTree);

        elemBoard.style = 'line-height:1.02em';
        elemBoard.classList.remove('zoomable');
        elemBoard.innerHTML = str;
    }

    setQuestion(question) {
        var elem = document.getElementById(this.id);
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var dimensions = [];
        var zoomable = true;
        var answers = '';
        var style = '';
        var str = '';

        var percentage = this.getPercentage(question);
        this.setCaption(percentage);

        if (question.children) {
            question.children.forEach((child) => {
                if ('dimension' === child.type) {
                    var score = this.getScore(child);
                    var maxScore = this.getMaxScore(child);
                    var percentage = maxScore === 0 ? '' : Math.round(score / maxScore * 100) + '%';
                    dimensions.push({id: child.id, percentage});
                } else {
                    answers += this.getAnswerBox(child, true);
                    style = 'overflow-y:hidden;line-height:1.1em';
                    zoomable = false;
                }
            });
        } else {
            answers += this.getAnswerText(question);
            style = 'overflow-y:auto';
        }

        if (dimensions.length > 0) {
            var x = (17 - dimensions.length * 3) / 2;
            dimensions.forEach((dimension) => {
                var color = this.COLORS[dimension.id.substring(0,2)];
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
            zoomable = false;
        } else {
            str += answers;
        }

        elemBoard.style = style;
        elemBoard.classList.remove('zoomable');
        if (zoomable) {
            elemBoard.classList.add('zoomable');
        }
        elemBoard.innerHTML = str;
    }

    zoomIn() {
        var elem = document.getElementById(this.id);

        if (elem.classList.contains('zoom-xs')) {
            elem.classList.remove('zoom-xs');
            elem.classList.add('zoom-s');
        } else if (elem.classList.contains('zoom-s')) {
            elem.classList.remove('zoom-s');
            elem.classList.add('zoom-m');
        } else if (elem.classList.contains('zoom-m')) {
            elem.classList.remove('zoom-m');
            elem.classList.add('zoom-l');
        } else if (elem.classList.contains('zoom-l')) {
            elem.classList.remove('zoom-l');
            elem.classList.add('zoom-xl');
        } else if (elem.classList.contains('zoom-xl')) {
            // keep
        } else {
            elem.classList.add('zoom-m');
        }
    }

    zoomOut() {
        var elem = document.getElementById(this.id);

        if (elem.classList.contains('zoom-xl')) {
            elem.classList.remove('zoom-xl');
            elem.classList.add('zoom-l');
        } else if (elem.classList.contains('zoom-l')) {
            elem.classList.remove('zoom-l');
            elem.classList.add('zoom-m');
        } else if (elem.classList.contains('zoom-m')) {
            elem.classList.remove('zoom-m');
            elem.classList.add('zoom-s');
        } else if (elem.classList.contains('zoom-s')) {
            elem.classList.remove('zoom-s');
            elem.classList.add('zoom-xs');
        } else if (elem.classList.contains('zoom-xs')) {
            // keep
        } else {
            elem.classList.add('zoom-xs');
        }
    }
}
