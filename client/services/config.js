app.factory('config', ['$http', function($http) {

    return {
        get: function() {
            return $http.get('../../config/default.json').then(function(data) {
                return data;
            });
        }
    };
}]);