app.factory('config', ['$http', function ($http) {

    return {
        get: function () {
            var configJSON = "";

            jQuery.ajax({
                url: '../../config/default.json',
                success: function (jsonString) {
                    configJSON = JSON.parse(jsonString);;
                },
                async: false
            });

            return configJSON;
        },

        getAppServerHost: function () {
            var configJson = this.get();

            return configJson.protocol + '://' + configJson.host + ':' + configJson.appserver.port;
        }
    };
}]);