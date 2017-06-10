app.config(function($routeProvider) {
    $routeProvider
        .when('/landing', {
            templateUrl: 'partials/landing.html',
            controller: 'AuthCtrl'
        })
        .otherwise('/landing');
});
