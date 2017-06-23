app.controller("EventListCtrl", function($routeParams, $scope, ngToast, BaseFactory, EventFactory, TripFactory) {

  let getBaseIdForSelectedBase = () => {
    $scope.defaultSelectedBaseId = BaseFactory.getBaseIdForSelectedBaseFromFB();
  };

  getBaseIdForSelectedBase();

	let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
  	.then((tripReturned) => {
      tripReturned.id = $routeParams.tripId;
      $scope.trip = tripReturned;
    })
    .catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

	let getEventsByTrip = () => {
    EventFactory.getEventsByTripFromFB($routeParams.tripId)
  	.then((events) => {
      if (events.length !== 0) {
        $scope.events = events;
      }
      else {
        ngToast.create("Looks like there are no events yet. Let's create some!");
      }
    })
    .catch((error) => {
      console.log("getEventsByTrip error", error);
    });
  };

  getEventsByTrip();

  let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
  	.then((bases) => {
      $scope.bases = bases;
    })
    .catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

  $scope.setDefaultBaseFilterForEventList = (baseId) => {
    BaseFactory.setBaseIdForSelectedBaseInFB(baseId);
  };

  $scope.deleteEvent = (eventId) => {
    EventFactory.deleteEventFromFB(eventId)
    .then(() => {
      getEventsByTrip();
    })
    .catch((error) => {
      console.log("deletePin error", error);
    });
  };

});