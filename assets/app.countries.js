var countries = (function () {
    var idElement = 'countries',
        csvPath = '{year}/3-simplified/{country}_ODM_{year}{language}.csv';
        loadList = {
            2023: ['fr','pl','ua','ee','es','cy','lt','ie','it','sk','at','dk','no','si','cz','de','pt','fi','nl','lu','se','lv','hu','ch','rs','bg','be','ro','me','el','hr','is','mt','al','ba'],
            2024: ['de'],
        };
    var data = {};

    function funcInit() {
        Object.keys(loadList).forEach((year) => {
            loadList[year].forEach((item) => {funcAdd(item, year)});
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
        if (parseInt(year, 10) === 2024) {
            var modified = [];
            Object.keys(countryData).forEach(function(key) {
                var obj = countryData[key];

/*                if (0 === obj.ID.indexOf('D')) {
                    if (obj.ID === 'D2') { obj.ID = 'D3' } else
                    if (obj.ID === 'D2.1') { obj.ID = 'D3.1' } else
                    if (obj.ID === 'D2.2') { obj.ID = 'D3.2' } else
                    if (obj.ID === 'D2.3') { obj.ID = 'D3.3' } else
                    if (obj.ID === 'D2.4') { obj.ID = 'D3.4' } else
                    if (obj.ID === 'D3') { obj.ID = 'D4' } else
                    if (obj.ID === 'D3.1') { obj.ID = 'D4.1' } else
                    if (obj.ID === 'D3.2') { obj.ID = 'D4.2' } else
                    if (obj.ID === 'D3.3') { obj.ID = 'D4.3' } else
                    if (obj.ID === 'D3.4') { obj.ID = 'D4.4' } else
                    if (obj.ID === 'D4') { obj.ID = 'D2' } else
                    if (obj.ID === 'D4.1') { obj.ID = 'D2.1' } else
                    if (obj.ID === 'D4.2') { obj.ID = 'D2.2' } else
                    if (obj.ID === 'D4.3') { obj.ID = 'D2.3' } else
                    if (obj.ID === 'D4.3a') { obj.ID = 'D2.3a' } else
                    if (obj.ID === 'D4.3b') { obj.ID = 'D2.3b' } else
                    if (obj.ID === 'D4.3c') { obj.ID = 'D2.3c' } else
                    if (obj.ID === 'D4.3d') { obj.ID = 'D2.3d' }
                } else
                if (0 === obj.ID.indexOf('PT')) {
                    obj.ID = obj.ID.substring(2);
                    obj.ID = parseInt(obj.ID, 10) + 58;
                } else
                if (0 === obj.ID.indexOf('P')) {
                    obj.ID = obj.ID.substring(1);
                    obj.ID = parseInt(obj.ID, 10) + 0;
                } else
                if (0 === obj.ID.indexOf('Q')) {
                    obj.ID = obj.ID.substring(1);
                    obj.ID = parseInt(obj.ID, 10) + 105;
                } else
                if (0 === obj.ID.indexOf('I')) {
                    obj.ID = obj.ID.substring(1);
                    obj.ID = parseInt(obj.ID, 10) + 27;
                }*/
    
                obj.ID += '';
    
                obj.Answer = obj['Answer from 2023'];
                delete obj['Answer from 2023'];
    
                obj.Justification = obj['Explanation from 2023'];
                delete obj['Explanation from 2023'];
    
    //            obj['Mark Question'];
    
                obj['Reviewer 1 Comments'] =
                    obj['Confirm, change or complement answer/explanation from 2023'] + ' - ' +
                    obj['Provide updated answer (if applicable)'];
                delete obj['Confirm, change or complement answer/explanation from 2023'];
                delete obj['Provide updated answer (if applicable)'];
    
                obj['Reviewer 2 Comments'] = obj['Provide updated explanation (if applicable)'];
                delete obj['Provide updated explanation (if applicable)'];
    
    //            obj.Score;
    //            console.log(obj);
    //            obj.Question;
                modified[obj.ID] = obj;
            });
    
            countryData = modified;
        }

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
    var country = this.dataset.country;
    var year = this.dataset.year;

    if (countries.get(country, year)) {
        toggleCountry.call(this);
    } else {
        countries.loadAndSelect(country, year);
    }
}