class Shield {
    COLORS = {'de': 'goldenrod', 'D0': 'goldenrod','D1': '#00aef2','D2': '#dc5149','D3': '#001d85','D4': '#ff9933'};

    constructor(country, answers) {
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000);
        this.answers = answers;
        this.country = country;

        this.createHTML();
    }

    createHTML() {
        var node = document.createElement('figure');
        node.id = this.id;
        node.classList.add('shield');
        node.style = 'display:inline-block';

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

        var item = this.answers[obj.id];
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

        var item = this.answers[obj.id];
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

        var shrinkBy = showGray ? 5 : 20;
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

        var item = this.answers[obj.id];

        str += '<div data-i18n-answer="' + item.ID + '" class="" style="">' + _.get(item.Answer) + '</div>';
        str += '<div data-i18n-justification="' + item.ID + '" class="" style="">' + _.get(item.Justification) + '</div>';

        return str;
    }

    setCaption(score) {
        var elem = document.getElementById(this.id);
        var elemCaption = elem.getElementsByClassName('shield-caption')[0];
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var elemScore = elem.getElementsByClassName('shield-score')[0];

        var country = this.answers['R1'];
        var str = '';
        str = '<span data-i18n="' + country.Justification + '">' + _.get(country.Justification) + '</span>';

        elemCaption.innerHTML = str;
        elemBoard.innerHTML = '';
        elemScore.innerHTML = score;
    }

    setDebug() {
        var elem = document.getElementById(this.id);
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var str = '';
        var that = this;

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

        elemBoard.innerHTML = str;
    }

    setQuestion(question) {
        var elem = document.getElementById(this.id);
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var dimensions = [];
        var answers = '';
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
                }
            });
        } else {
            answers += this.getAnswerText(question);
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
        } else {
            str += answers;
        }

        elemBoard.innerHTML = str;
    }

}