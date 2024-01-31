var countries = (function () {
    var idElement = 'countries';
    var data = {};

    function init() {
    }

    init();

    function funcAdd(country) {
        var node = document.createElement('figure');
        node.classList.add('shield');
        node.classList.add('shield-button');
        node.style = 'display:inline-block';
        node.dataset.country = country;
        node.title = data[country]['R1'].Justification;
        node.onclick = toggleCountry;

        node.innerHTML = 
            '<div class="shield-border"></div>' +
            '<div class="shield-background">' +
                '<div class="shield-chevron" style="font-size:10em;line-height:1.7em"><span class="fi fi-' + country + ' fis"></span></span>' +
            '</div>';

        document.getElementById(idElement).appendChild(node);
    }

    function funcAddData(country, countryData) {
        data[country.toLowerCase()] = countryData;
        funcAdd(country.toLowerCase());
    }

    function funcGet(country) {
        return data[country];
    }

    function funcLength() {
        return Object.keys(data).length;
    }

    function funcSelect(country) {
        var that = document.querySelectorAll('[data-country="' + country + '"]')[0];
        toggleCountry.call(that);
    }

    return {
        add: funcAdd,
        addData: funcAddData,
        get: funcGet,
        length: funcLength,
        select: funcSelect,
    };
}());