app
    .controller('HomeController', ['$scope', '$http', 'config',
        function($scope, $http, config) {
            var uri = '';

            console.log("TEST: " + JSON.stringify(config.get()));

            $http.get('../config/default.json').success(function(data) {

                uri = 'http://' + data.host + ':' + data.appserver.port;

                $scope.services = [];

                $scope.start = function(service) {
                    console.log("Attempt to START " + service.name);

                    var startUrl = uri + '/api/services/' + service.name + '/start';

                    var payload = {};
                    payload.start = service.start;

                    $http.post(startUrl, payload).
                    success(function(data) {
                        alert(service.name + " successfully started");
                        pingUrl(service);
                    }).
                    error(function(data) {
                        alert(service.name +
                            " error. Ooops! We broke something! Try again in a minute!"
                        );
                    });
                };

                $scope.stop = function(service) {
                    console.log("Attempt to STOP " + service.name);

                    var stopUrl = uri + '/api/services/' + service.name + '/stop';

                    var payload = {};
                    payload.stop = service.stop;

                    $http.post(stopUrl, payload).
                    success(function(data) {
                        alert(service.name + " successfully stopped");
                        pingUrl(service);
                    }).
                    error(function(data) {
                        alert(service.name +
                            " error. Ooops! We broke something! Try again in a minute!"
                        );
                    });
                };

                var loadServices = function() {
                    $http.get(uri + '/api/services').
                    success(function(data) {
                        if (data) {
                            $scope.services = data.services;
                            updateServicesStatus();
                        } else {
                            $scope.services = "There are no services defined!";
                        }
                    }).
                    error(function(data, status, headers, config) {
                        alert('Error appears on getting available services');
                    });
                };

                var updateServicesStatus = function() {

                    $scope.services.forEach(function(element) {

                        element.status = 'default';
                        element.statusText = 'Loading...';

                        pingUrl(element);
                    });
                };

                var pingUrl = function(service) {

                    var pingUrl = uri + '/api/ping';

                    if (typeof(service.url) === 'undefined') {
                        alert('Ping url is not provided');
                        return;
                    }

                    var payload = {};
                    payload.url = service.url;

                    $http.post(pingUrl, payload).
                    success(function(data) {
                        service.status = 'success';
                        service.statusText = 'Operational';
                    }).
                    error(function(data) {
                        console.log(data);
                        service.status = 'warning';
                        service.statusText = 'Not Operational';
                    });
                };

                loadServices();
            });


        }
    ]);