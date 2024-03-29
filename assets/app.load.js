var load = (function () {
    var files = [];
    var callbackFinish = null;
    var idConsole = 'console-fileload';

    function init() {
    }

    init();

    function log(filepath) {
        var elem = document.getElementById(idConsole);
        var path = filepath.split('/');
        var str = '<span data-i18n="loadFile">' + _.get('loadFile') + '</span> ' + path[path.length - 1] + '<br>';

        elem.innerHTML += str;
    }

    function funcShowLog(show) {
        var elem = document.getElementById(idConsole);
        elem.style.display = show ? 'block' : 'none';
    }

    function loadFile() {
        var fileObj = files[0];
        log(fileObj.filepath);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', WEBSERVER_PATH + fileObj.filepath, true);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                files.shift();
                store(fileObj, this.responseText);
                fileObj.callback = null;
            } else if (this.readyState == 4) {
                files.shift();
                store(fileObj, null);
                fileObj.callback = null;
            }
        }

        xhr.send();
    }

    function csv2array(str, delimiter) {
        var pattern = new RegExp((
             // Delimiters
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields
            "([^\"\\" + delimiter + "\\r\\n]*))"
        ), "gi");

        var rows = [[]];
        var matches = false;

        while (matches = pattern.exec(str)) {
            var matchedDelimiter = matches[1];
            if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
                rows.push([]);
            }

            var matchedValue;
            if (matches[2]) {
                matchedValue = matches[2].replace(new RegExp("\"\"", "g"), "\"");
            } else {
                matchedValue = matches[3];
            }

            rows[rows.length - 1].push(matchedValue);
        }

        return rows;
    }

    function csv2obj(str) {
        var [header, ...content] = csv2array(str, ';');
        var ret = content.map((line) => {
            var obj = {};
            header.forEach((key, index) => (obj[key] = line.at(index)));
            return obj;
        });

        return ret;
    }

    function store(fileObj, data) {
        if (fileObj.callback) {
            fileObj.callback(fileObj.filepath, csv2obj(data));
        }

        if (files.length > 0) {
            loadFile();
        } else {
            dispatchFinish();
        }
    }

    function funcAddFinishCallback(callback) {
        callbackFinish = callback;
    }

    function funcRemoveFinishCallback(callback) {
        callbackFinish = null;
    }

    function dispatchFinish() {
        if (callbackFinish) {
            callbackFinish();
        }
    }

    function funcCSV(filepath, callback) {
        files.push({
            callback: callback,
            filepath: filepath
        });

        if (files.length === 1) {
            loadFile();
        }
    }

    return {
        addFinishCallback: funcAddFinishCallback,
        csv: funcCSV,
        removeFinishCallback: funcRemoveFinishCallback,
        showLog: funcShowLog,
    };
}());