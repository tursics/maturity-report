class Shield {
    constructor(country, answers, year) {
        this.id = Date.now() + '' + Math.floor(Math.random() * 1000);
        this.answers = answers;
        this.country = country;
        this.year = year;

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
            '<div class="shield-border">'+
                '<div class="shield-borderhat"></div>' +
            '</div>' +
            '<div class="shield-background">' +
                '<div class="shield-backgroundhat"></div>' +
                '<div class="shield-board"></div>' +
                '<div class="shield-score"></div>' +
            '</div>' +
            '<div class="shield-flag year-' + this.year + '">' + this.year + '</div>' +
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
        if (!obj) {
            return 0;
        }

        var item = this.answers['en'][obj.id[this.year]];
        var score = item && item.Score ? parseInt(item.Score, 10) : NaN;
        var status = item && item['Confirm, change or complement answer/explanation from 2023'];

        if (status) {
            var oldValue = item['Answer from 2023'].toLowerCase();
            var newValue = item['Provide updated answer (if applicable)'].toLowerCase();
            var value = '';

            oldValue = oldValue.replace(' ', ' ').trim();
            newValue = newValue.replace(' ', ' ').trim();

            if ('Confirm' === status) {
                value = oldValue;
            } else if ('Change' === status) {
                value = newValue;
            } else if ('Complement' === status) {
                value = newValue !== '' ? newValue : oldValue;
            }

            var scoreItem = loadedDataScore[this.year] ? loadedDataScore[this.year][obj.id[this.year]] : NaN;
            var v = scoreItem && scoreItem.value1;
            var s = scoreItem && scoreItem.score1;

            if (v && (v === value)) {
                score = s && s ? parseInt(s, 10) : NaN;
            } else {
                v = scoreItem && scoreItem.value2;
                s = scoreItem && scoreItem.score2;
                if (v && (v === value)) {
                    score = s && s ? parseInt(s, 10) : NaN;
                } else {
                    v = scoreItem && scoreItem.value3;
                    s = scoreItem && scoreItem.score3;
                    if (v && (v === value)) {
                        score = s && s ? parseInt(s, 10) : NaN;
                    } else {
                        v = scoreItem && scoreItem.value4;
                        s = scoreItem && scoreItem.score4;
                        if (v && (v === value)) {
                            score = s && s ? parseInt(s, 10) : NaN;
                        } else {
                            v = scoreItem && scoreItem.value5;
                            s = scoreItem && scoreItem.score5;
                            if (v && (v === value)) {
                                score = s && s ? parseInt(s, 10) : NaN;
                            } else {
                                v = scoreItem && scoreItem.value6;
                                s = scoreItem && scoreItem.score6;
                                if (v && (v === value)) {
                                    score = s && s ? parseInt(s, 10) : NaN;
                                } else {
                                    var maxScore = this.getMaxScore(obj);
                                    if (maxScore > 0) {
                                        console.error(scoreItem.ID, value);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (isNaN(score) || (obj.type === 'dimension')) {
            score = 0;
        }

        if (obj.children) {
            obj.children.forEach((child) => score += this.getScore(child));
        }

        return score;
    }

    getMaxScore(obj) {
        if (!obj) {
            return 0;
        }

        var scoreItem = loadedDataScore[this.year] ? loadedDataScore[this.year][obj.id[this.year]] : NaN;
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

        var item = this.answers['en'][obj.id[this.year]];
        var score = this.getScore(obj);

        var maxScore = this.getMaxScore(obj);
        var width = maxScore;

        if (!item) {
            color = 'multi-year';
            width = 5;
        } else if (isNaN(maxScore) || (maxScore === 0)) {
            color = 'bg-gray';
            width = 5;
        } else if (isNaN(score)) {
            color = 'bg-red';
        } else if (maxScore === score) {
            color = 'bg-green';
        } else if (0 === score) {
            color = 'bg-red';
        } else {
            color = 'bg-yellow';
        }

        var shrinkBy = showGray ? 6 : 20;
//        var height = showGray ? 2.3 : .9;
        var height = showGray ? 1.8 : .72;
        var style = 'width:' + (width / shrinkBy) + 'em;height:' + height + 'em;';
        var year = this.year;

        if (!item) {
            style += 'background-color:#eee;';
            style += 'background-size: 10px 10px;'
            style += 'background-image: repeating-linear-gradient(-45deg, #888 0, #888 1px, #eee 0, #eee 50%);';
            year = Object.keys(obj.id)[0];
        }

        var tooltip = _.get(obj.id[year]).split('<br>')[0];
        var str = '<span onclick="goto(\'' + obj.id[year] + '\',null,' + year + ')" data-i18n-title="' + (obj.id[year]) + '" title="' + tooltip + '" class="answerbox ' + color + '" style="' + style + '"></span>';

        if (!showGray && (color === 'bg-gray')) {
            str = '';
        }

        return str;
    }

    getAnswerText(obj) {
        if (!obj) {
            return '';
        }
        if (!obj.id[this.year]) {
            return '';
        }

        var str = '';

        str += '<div data-country="' + this.country + '" data-year="' + this.year + '" data-i18nanswer="' + obj.id[this.year] + '" class="answer">' + _.getAnswer(this.country, this.year, obj.id[this.year]) + '</div>';
        str += '<div data-country="' + this.country + '" data-year="' + this.year + '" data-i18njustification="' + obj.id[this.year] + '" class="justification">' + _.getJustification(this.country, this.year, obj.id[this.year]) + '</div>';

        var txt = _.getReviewer1(this.country, this.year, obj.id[this.year]);
        if (txt !== '') {
            str += '<div data-country="' + this.country + '" data-year="' + this.year + '" data-i18nreviewer1="' + obj.id[this.year] + '" class="reviewer">' + txt + '</div>';
        }

        txt = _.getReviewer2(this.country, this.year, obj.id[this.year]);
        if (txt !== '') {
            str += '<div data-country="' + this.country + '" data-year="' + this.year + '" data-i18nreviewer2="' + obj.id[this.year] + '" class="reviewer">' + txt + '</div>';
        }

        return str;
    }

    setCaption(score) {
        var elem = document.getElementById(this.id);
        var elemCaption = elem.getElementsByClassName('shield-caption')[0];
        var elemBoard = elem.getElementsByClassName('shield-board')[0];
        var elemScore = elem.getElementsByClassName('shield-score')[0];

        var country = _.getJustification(this.country, this.year, 'R1');
        var flag = this.country === 'el' ? 'gr' : this.country;
        var str = '<span class="fi fi-' + flag + ' fis"></span>';

        if (country) {
            str += '<span data-country="' + this.country + '" data-year="' + this.year +  '" data-i18njustification="' + 'R1' + '">' + country + '</span>';
        } else {
            var key = 'country-' + this.country;
            country = _.get(key);
            str += '<span data-i18n="' + key + '">' + country + '</span>';
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

        var percentage = this.getPercentage(questionAnswer.get('root', this.year));
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

        if (question && question.children) {
            question.children.forEach((child) => {
                if ('dimension' === child.type) {
                    var score = this.getScore(child);
                    var maxScore = this.getMaxScore(child);
                    var percentage = maxScore === 0 ? '' : Math.round(score / maxScore * 100) + '%';
                    dimensions.push({
                        color: child.color,
                        id: child.id[this.year],
                        score,
                        percentage
                    });
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
                if (dimension.id) {
                    var color = 'goldenrod';
                    if (dimension.color) {
                        color = dimension.color;
                    }
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

                    str += '<div onclick="goto(\'' + dimension.id + '\',null,' + this.year + ')" class="score-barchart" style="left: ' + (x + .5) + 'em;background: repeating-linear-gradient(0,' + color + ',' + color + ' ' + value + ',#555 0,#555 100%);"></div>';
                    str += '<div onclick="goto(\'' + dimension.id + '\',null,' + this.year + ')" class="score-barchart-label" style="left: ' + x + 'em;" title="' + dimension.score + '">' + label + '</div>';

                    x += 3;
                }
            });
            zoomable = false;
        } else if (answers !== '') {
            str += answers;
        } else {
            str += '<span data-i18n="not_this_year">' + _.get('not_this_year') + '</span>';
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
