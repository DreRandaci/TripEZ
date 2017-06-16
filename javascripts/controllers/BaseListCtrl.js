app.controller("BaseListCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory, BaseFactory, TripFactory) {

  $scope.newBase = {
    trip: $routeParams.tripId,
    uid: $rootScope.user.uid
  };

  var input = document.getElementById('new-base-input');

  let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
    .then((tripReturned) => {
      $scope.trip = tripReturned;
    })
    .catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

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

  let baseAutoComplete = () => {
    var input = document.getElementById('new-base-input');
    var autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
    var geocoder = new google.maps.Geocoder;
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        return;
      }
      geocoder.geocode({'placeId': place.place_id}, function(results, status) {
        $scope.newBase.name = results[0].address_components[0].short_name;
        $scope.newBase.latitude = results[0].geometry.location.lat();
        $scope.newBase.longitude = results[0].geometry.location.lng();
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }
      });
    });
  };

  baseAutoComplete();

  $scope.makeNewBase = (newBase) => {
   	BaseFactory.makeNewBaseInFB(newBase)
    .then(() => {
    	getBases();
    })
    .catch((error) => {
    	console.log("error in makeNewBases", error);
    });
  };

  $scope.editBase = (base) => {
		BaseFactory.editBaseInFB(base)
    .then(() => {
      getBases();
	  })
    .catch((error) => {
      console.log("editBaseName error", error);
	  });
	};

  $scope.deleteEntireBase = (baseId) => {
    BaseFactory.deleteBaseFromFB(baseId)
    .then(() => {
      EventFactory.deleteBaseEventsFromFB(baseId);
      getBases();
    })
    .catch((error) => {
      console.log("deleteEntireBase error", error);
    });
  };

});