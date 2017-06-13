app.controller("EventViewCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory) {

	console.log("in EventViewCtrl");

	let getSingleEvent = () => {
    EventFactory.getSingleEventFromFB($routeParams.eventId)
    	.then((event) => {
    	console.log("event returned from FB: ", event);
      $scope.event = event;
    }).catch((error) => {
      console.log("getSingleEvent error", error);
    });
  };

  getSingleEvent();

});