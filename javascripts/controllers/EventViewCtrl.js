app.controller("EventViewCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory) {

	let getSingleEvent = () => {
    EventFactory.getSingleEventFromFB($routeParams.eventId)
  	.then((event) => {
      $scope.event = event;
      pinSingleEvent();
  	})
  	.catch((error) => {
      console.log("getSingleEvent error", error);
 	 	});
  };

  getSingleEvent();

	let map;

	let pinSingleEvent = () => {
	  let singleEventToPin = {
	  	lat: $scope.event.latitude, 
	  	lng: $scope.event.longitude
	  };
	  let map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: singleEventToPin
	  });
	  let marker = new google.maps.Marker({
	    position: singleEventToPin,
	    map: map
	  });
	};

});