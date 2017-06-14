let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, GOOGLE_CONFIG, FIREBASE_CONFIG, AuthFactory) {
  GoogleMapsLoader.KEY = GOOGLE_CONFIG;
  GoogleMapsLoader.load(function(google) {});
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
        templateUrl: "partials/trip-list.html",
        controller: "TripListCtrl",
        resolve: {isAuth}
    })
    .when("/trips/bases/:tripId", {
        templateUrl: "partials/base-list.html",
        controller: "BaseListCtrl",
        resolve: {isAuth}
    })
    .when("/events/:tripId/:baseId", {
        templateUrl: "partials/event-list.html",
        controller: "EventListCtrl",
        resolve: {isAuth}
     })
    .when("/events/:eventId", {
        templateUrl: "partials/event-view.html",
        controller: "EventViewCtrl",
        resolve: {isAuth}
     })
    .when("/search/:tripId", {
        templateUrl: "partials/event-search.html",
        controller: "EventSearchCtrl",
        resolve: {isAuth}
     })
    .when('/logout', {
        templateUrl: 'partials/landing.html',
        controller: 'AuthCtrl'
    })
    .otherwise('/landing');

});