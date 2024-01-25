class Shield {
    COLORS = {'de': 'goldenrod', 'D0': 'goldenrod','D1': '#00aef2','D2': '#dc5149','D3': '#001d85','D4': '#ff9933'};

    constructor(answers) {
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000);
        this.answers = answers;

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

    getPercentage(question) {
        var score = getScore(question);
        var maxScore = getMaxScore(question);

        return maxScore === 0 ? '' : (parseInt(score / maxScore * 1000, 10) / 10) + '%';
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

    setQuestion(question) {
        var elem = document.getElementById(this.id);
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var dimensions = [];
        var answers = '';
        var str = '';

        var percentage = this.getPercentage(question);
        this.setCaption(percentage);

        question.children.forEach((child) => {
            if ('dimension' === child.type) {
                var score = getScore(child);
                var maxScore = getMaxScore(child);
                var percentage = maxScore === 0 ? '' : Math.round(score / maxScore * 100) + '%';
                dimensions.push({id: child.id, percentage});
            } else {
                answers += getAnswer(child.id, true);
            }
        });

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