var countries = (function () {
    var idElement = 'countries',
        csvPath = '2023/3-simplified/{country}_ODM_2023{language}.csv';
        loadList = ['al','at','ba','be','bg','ch','cy','cz','de','dk','ee','el','es','fi','fr','hr','hu','ie','is','it','lt','lu','lv','me','mt','nl','no','pl','pt','ro','rs','se','si','sk','ua'];
    var data = {};

    function funcInit() {
        loadList.forEach((item) => {funcAdd(item)});
    }

    function funcAdd(country) {
        var node = document.createElement('figure');
        node.classList.add('shield');
        node.classList.add('shield-button');
        node.style = 'display:inline-block';
        node.dataset.country = country;
//        node.title = data[country][_.getLanguage()]['R1'].Justification;
        node.onclick = OnCountryClick;

        node.innerHTML = 
            '<div class="shield-border"></div>' +
            '<div class="shield-background">' +
                '<div class="shield-chevron" style="font-size:10em;line-height:1.7em"><span class="fi fi-' + country + ' fis"></span></span>' +
            '</div>';

        document.getElementById(idElement).appendChild(node);
    }

    function funcAddData(country, countryData, language) {
        data[country.toLowerCase()] = data[country.toLowerCase()] || {};
        data[country.toLowerCase()][language] = countryData;
    }

    function funcGet(country) {
        return data[country];
    }

    function funcLength() {
        return Object.keys(data).length;
    }

    function funcSelect(country) {
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];
        OnCountryClick.call(elem);
    }

    function onLoadedDE(filepath, data) {
        var filename = filepath.split('/').pop();
        var country = filename.split('_').shift().toLowerCase();
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];

        if (0 < data.length) {
            var countryData = [];
            data.forEach((obj) => {
                countryData[obj.ID] = obj;
            });

            countries.addData(country, countryData, 'de');
        }

        elem.classList.remove('progress');

        countries.select(country);
    }

    function onLoaded(filepath, data) {
        var filename = filepath.split('/').pop();
        var country = filename.split('_').shift().toLowerCase();
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];

        if (0 === data.length) {
            elem.classList.remove('progress');
            elem.classList.add('disabled');

            return;
        }

        var countryData = [];
        data.forEach((obj) => {
            countryData[obj.ID] = obj;
        });

        countries.addData(country, countryData, 'en');

        if (countries.length() === 1) {
            createQuestionTree(data);
        }

        load.csv(csvPath.replace('{country}', country.toUpperCase()).replace('{language}', '_de'), onLoadedDE);
    }

    function funcLoadAndSelect(country) {
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];
        elem.classList.add('progress');

        load.csv(csvPath.replace('{country}', country.toUpperCase()).replace('{language}', ''), onLoaded);
    }

    return {
        add: funcAdd,
        addData: funcAddData,
        get: funcGet,
        init: funcInit,
        length: funcLength,
        loadAndSelect: funcLoadAndSelect,
        select: funcSelect,
    };
}());

function OnCountryClick() {
    var country = this.dataset.country;

    if (countries.get(country)) {
        toggleCountry.call(this);
    } else {
        countries.loadAndSelect(country);
    }
}