var StaticKit = {};

StaticKit.copy = {
    zipErrorAlert: 'Please enter a valid ZIP code.',
};

StaticKit.query = (function () {
    var pairs = location.search.slice(1).split('&');

    var result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
})();

StaticKit.query.source = (StaticKit.query.source || '').split(/[^\w]/)[0];

StaticKit.fillForm = function (params) {
    for (var key in params) {
        var el = document.querySelector('[name="' + key + '"]');
        if (el) {
            el.value = params[key];
        }
    }
}

if (StaticKit.query.error_zip) {
    StaticKit.fillForm(StaticKit.query);
    var el = document.querySelector('[name="zip"]');
    if (el) {
        el.value = '';
        el.focus();
    }
    setTimeout(function () {
        alert(StaticKit.copy.zipErrorAlert);
    }, 250);
}
