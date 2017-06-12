let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    var logged = AuthFactory.isAuthenticated();
    var appTo;
    if (currRoute.originalPath) {
      appTo = currRoute.originalPath.indexOf('/landing') !== -1;
    }
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/landing');
    }
  });
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/landing', {
      templateUrl: 'partials/landing.html',
      controller: 'AuthCtrl'
    })
    .when("/trips/:uid", {
        templateUrl: "partials/trip-view.html",
        controller: "TripViewCtrl",
        resolve: {isAuth}
     })
    .when('/logout', {
        templateUrl: 'partials/landing.html',
        controller: 'AuthCtrl'
     })
    .otherwise('/landing');
});