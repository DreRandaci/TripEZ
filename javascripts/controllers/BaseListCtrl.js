app.controller("BaseListCtrl", function($rootScope, $routeParams, $scope, ngToast, EventFactory, BaseFactory, TripFactory) {

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

    map = new google.maps.Map(document.getElementById('map'), {});

    var input = document.getElementById('new-base-input');
    var autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode'],                                                   // added to debug
      placeIdOnly: true
    });
    var geocoder = new google.maps.Geocoder();
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

  $scope.setDefaultBaseFilterForEventList = (baseId) => {
    BaseFactory.setBaseIdForSelectedBaseInFB(baseId);
  };

  $scope.makeNewBase = (newBase) => {
   	BaseFactory.makeNewBaseInFB(newBase)
    .then(() => {
      ngToast.create('Base added to trip. How about adding some events?');
    	getBases();
    })
    .catch((error) => {
    	console.log("error in makeNewBases", error);
    });
  };

  $scope.editBase = (base) => {
		BaseFactory.editBaseInFB(base)
    .then(() => {
      ngToast.create('Base edit successful.');
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
      ngToast.create('Base deleted. Where to next?');
      getBases();
    })
    .catch((error) => {
      console.log("deleteEntireBase error", error);
    });
  };

});