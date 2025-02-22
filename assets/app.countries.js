var countries = (function () {
    var idElement = 'countries',
        csvPath = '{year}/3-simplified/{country}_ODM_{year}{language}.csv';
        loadList = {
            2024: ['fr','pl','ua','sk','ie','es','cy','cz','ee','it','lt','dk','lv','no','pt','de'],
            2023: ['fr','pl','ua','ee','es','cy','lt','ie','it','sk','at','dk','no','si','cz','de','pt','fi','nl','lu','se','lv','hu','ch','rs','bg','be','ro','me','el','hr','is','mt','al','ba'],
        };
    var data = {};

    function funcInit() {
        var linePrefixes = [
            '<span data-i18n="countries" style="margin-right: .5em">' + _.get('countries') + '</span>',
			'<span class="vlist">' +
				'<a href="#" data-i18n="countriesAll" onclick="goto(\'allCountries\',event)">' + _.get('countriesAll') + '</a><br>' +
				'<a href="#" data-i18n="countriesNone" onclick="goto(\'noCountries\',event)">' + _.get('countriesNone') + '</a>' +
			'</span>'
        ];
        Object.keys(loadList).reverse().forEach((year) => {
            var node = document.createElement('span');
            node.style.display = 'inline-block';
            node.style.width = '5.5em';
            node.innerHTML = linePrefixes.shift();
            document.getElementById(idElement).appendChild(node);

            node = document.createElement('span');
            node.className = 'country-year';
            node.innerHTML = year;
            document.getElementById(idElement).appendChild(node);

            loadList[year].forEach((item) => {funcAdd(item, year)});

            node = document.createElement('br');
            document.getElementById(idElement).appendChild(node);
        });
    }

    function funcAdd(country, year) {
        var node = document.createElement('figure');
        node.classList.add('shield');
        node.classList.add('shield-button');
        node.classList.add('blue-sky');
        node.style = 'display:inline-block';
        node.dataset.country = country;
        node.dataset.year = year;
        node.onclick = OnCountryClick;

        var flag = country === 'el' ? 'gr' : country;

        node.innerHTML = 
            '<div class="shield-border"><div class="shield-borderhat"></div></div>' +
            '<div class="shield-background">' +
                '<div class="shield-backgroundhat"></div>' +
                '<div class="shield-chevron" style="font-size:10em;line-height:1.7em"><span class="fi fi-' + flag + ' fis"></span></div>' +
            '</div>';

        document.getElementById(idElement).appendChild(node);
    }

    function funcAddData(country, countryData, year, language) {
        if (!data[year]) {
            data[year] = {};
        }
        data[year][country.toLowerCase()] = data[year][country.toLowerCase()] || {};
        data[year][country.toLowerCase()][language] = countryData;
    }

    function funcGet(country, year) {
        if (data[year]) {
            return data[year][country];
        }

        return data[year];
    }

    function funcLength(year) {
        return Object.keys(data[year]).length;
    }

    function funcSelect(country, year) {
        var elem = document.querySelectorAll('[data-country="' + country + '"][data-year="' + year + '"]')[0];
        OnCountryClick.call(elem);
    }

    function onLoadedDE(filepath, payload) {
        var filename = filepath.split('/').pop();
        var country = filename.split('_').shift().toLowerCase();
        var year = filename.split('_')[2].split('.').shift();
        var elem = document.querySelectorAll('[data-country="' + country + '"][data-year="' + year + '"]')[0];

        if (0 < payload.length) {
            var countryData = [];
            payload.forEach((obj) => {
                countryData[obj.ID] = obj;
            });

            countries.addData(country, countryData, year, 'de');
        }

        elem.classList.remove('progress');

        countries.select(country, year);
    }

    function onLoaded(filepath, payload) {
        var filename = filepath.split('/').pop();
        var country = filename.split('_').shift().toLowerCase();
        var year = filename.split('_')[2].split('.').shift();
        var elem = document.querySelectorAll('[data-country="' + country + '"][data-year="' + year + '"]')[0];

        if (0 === payload.length) {
            elem.classList.remove('progress');
            elem.classList.add('disabled');

            return;
        }

        var countryData = [];
        payload.forEach((obj) => {
            countryData[obj.ID] = obj;
        });

        countries.addData(country, countryData, year, 'en');

        load.csv(csvPath.replace('{country}', country.toUpperCase()).replace('{language}', '_de').replaceAll('{year}', year), onLoadedDE);
    }

    function funcLoadAndSelect(country, year) {
        var elem = document.querySelectorAll('[data-country="' + country + '"][data-year="' + year + '"]')[0];
        elem.classList.add('progress');

        load.csv(csvPath.replace('{country}', country.toUpperCase()).replace('{language}', '').replaceAll('{year}', year), onLoaded);
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
    if (this.dataset) {
        var country = this.dataset.country;
        var year = this.dataset.year;

        if (countries.get(country, year)) {
            toggleCountry.call(this);
        } else {
            countries.loadAndSelect(country, year);
        }
    } else {
        console.error(this);
    }
}