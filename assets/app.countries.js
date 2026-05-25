var countries = (function () {
    var idElement = 'countries',
        idYearSwitch = 'year-switch',
        csvPath = '{year}/3-simplified/{country}_ODM_{year}{language}.csv';
        loadList = {
/*            live: [
                {n:'de',s:0}
            ],*/
            2025: [
                {n:'de',s:0}
            ],
            2024: [
                {n:'fr',s:2510},{n:'pl',s:2460},{n:'ua',s:2445},{n:'sk',s:2405},{n:'ie',s:2395},{n:'es',s:2388},{n:'lt',s:2370},{n:'cz',s:2365},{n:'cy',s:2360},{n:'ee',s:2360},{n:'it',s:2360},
                {n:'lv',s:2280},{n:'dk',s:2273},{n:'si',s:2253},{n:'pt',s:2240},{n:'no',s:2238},{n:'at',s:2193},{n:'rs',s:2125},{n:'lu',s:2100},
                {n:'ch',s:2018},{n:'se',s:2005},{n:'nl',s:1998},{n:'fi',s:1970},{n:'hu',s:1945},{n:'de',s:1890},{n:'be',s:1875},
                {n:'ro',s:1750},{n:'hr',s:1740},{n:'bg',s:1545},{n:'el',s:1430},{n:'is',s:1310},{n:'al',s:1195},{n:'mt',s:1195},{n:'ba',s:385}
            ],
            2023: [
                {n:'fr',s:2497},{n:'pl',s:2485},{n:'ua',s:2443},{n:'ee',s:2440},
                {n:'es',s:2405},{n:'cy',s:2383},{n:'lt',s:2373},{n:'ie',s:2351},{n:'it',s:2345},{n:'sk',s:2324},{n:'at',s:2298},{n:'dk',s:2297},{n:'no',s:2294},{n:'si',s:2288},{n:'cz',s:2224},
                {n:'de',s:2164},{n:'pt',s:2164},{n:'fi',s:2123},{n:'nl',s:2111},{n:'lu',s:2102},{n:'se',s:2055},{n:'lv',s:2040},{n:'hu',s:2018},{n:'ch',s:2002},{n:'rs',s:1914},{n:'bg',s:1883},{n:'be',s:1843},
                {n:'ro',s:1653},{n:'me',s:1587},{n:'el',s:1545},{n:'hr',s:1518},{n:'is',s:1466},{n:'mt',s:1322},{n:'al',s:1068},{n:'ba',s:365}
            ],
        };
    var data = {};

    function funcInit() {
        var node = document.createElement('span');
        node.style.display = 'inline-block';
        node.innerHTML = '<span id="' + idYearSwitch + '"></span>';
        document.getElementById(idElement).appendChild(node);

        node = document.createElement('span');
        node.classList = 'vlist';
        node.innerHTML = 
            '<a href="#" data-i18n="countriesAll" onclick="goto(\'allCountries\',event)">' + _.get('countriesAll') + '</a><br>' +
            '<a href="#" data-i18n="countriesNone" onclick="goto(\'noCountries\',event)">' + _.get('countriesNone') + '</a>';
        document.getElementById(idElement).appendChild(node);

        var count = 0;
        Object.keys(loadList)./*reverse().*/forEach((year) => {
            ++count;

            node = document.createElement('figure');
            if (loadList.length === 2) {
                node.classList = 'shield shield-button blue-sky ' + (count === 1 ? 'group-2-left' : 'group-2-right');
            } else {
                node.classList = 'shield shield-button blue-sky ' + (count === 1 ? 'group-3-left' : (count === 2 ? 'group-3-middle' : 'group-3-right'));
            }
            node.dataset.year = year;
            node.onclick = function() {
                if ('live' === year) {
                    changeYear(year);
                } else {
                    changeYear(parseInt(year, 10));
                }
            }
            node.innerHTML =
				'<div class="shield-border"><div class="shield-borderhat"></div></div>' +
				'<div class="shield-background">' +
					'<div class="shield-backgroundhat"></div>' +
					'<div class="shield-chevron" style="font-size:6.5em;line-height:2.5em">' +
						'<span class="">' + year + '</span>' +
					'</span>' +
				'</div>';
            document.getElementById(idYearSwitch).appendChild(node);

            loadList[year].forEach((item) => {funcAdd(item.n, year)});
        });
    }

    function funcAdd(country, year) {
        var node = document.createElement('figure');
        node.classList.add('shield');
        node.classList.add('shield-button');
        node.classList.add('blue-sky');
        node.style = 'display:none';
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