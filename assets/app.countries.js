var countries = (function () {
    var idElement = 'countries',
        csvPath = '2023/3-simplified/{country}_ODM_2023.csv';
        loadList = ['al','at','ba','be','bg','ch','cy','cz','de','fr'];
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
//        node.title = data[country]['R1'].Justification;
        node.onclick = OnCountryClick;

        node.innerHTML = 
            '<div class="shield-border"></div>' +
            '<div class="shield-background">' +
                '<div class="shield-chevron" style="font-size:10em;line-height:1.7em"><span class="fi fi-' + country + ' fis"></span></span>' +
            '</div>';

        document.getElementById(idElement).appendChild(node);
    }

    function funcAddData(country, countryData, addShield) {
        data[country.toLowerCase()] = countryData;

        if (addShield) {
            funcAdd(country.toLowerCase());
        }
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

    function onLoaded(filepath, data) {
        var countryData = [];
        data.forEach((obj) => {
            countryData[obj.ID] = obj;
        });

        var filename = filepath.split('/').pop();
        var country = filename.split('_').shift().toLowerCase();
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];

        countries.addData(country, countryData, false);

        if (countries.length() === 1) {
            createQuestionTree(data);
        }

        elem.classList.remove('progress');

        countries.select(country);
    }

    function funcLoadAndSelect(country) {
        var elem = document.querySelectorAll('[data-country="' + country + '"]')[0];
        elem.classList.add('progress');

        load.csv(csvPath.replace('{country}', country.toUpperCase()), onLoaded);
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