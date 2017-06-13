app.controller("EventListCtrl", function($location, $rootScope, $routeParams, $scope, BaseFactory, EventFactory, TripFactory) {

	let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
    	.then((tripReturned) => {
      $scope.trip = tripReturned;
    }).catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

	let getEventsByTrip = () => {
    EventFactory.getEventsByTripFromFB($routeParams.tripId)
    	.then((events) => {
      $scope.events = events;
    }).catch((error) => {
      console.log("getEventsByTrip error", error);
    });
  };

  getEventsByTrip();

  let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
    	.then((bases) => {
      $scope.bases = bases;
    }).catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

  $scope.deleteEvent = (eventId) => {
    EventFactory.deleteEventFromFB(eventId).then(() => {
      getEventsByTrip();
    }).catch((error) => {
      console.log("deletePin error", error);
    });
  };

});