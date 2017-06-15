app.controller("BaseListCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory, BaseFactory, TripFactory) {

	let getSingleTripName = () => {
    TripFactory.getSingleTripNameFromFB($routeParams.tripId)
    	.then((tripReturned) => {
      $scope.trip = tripReturned;
    }).catch((error) => {
      console.log("getSingleTripName error", error);
    });
  };

  getSingleTripName();

	let getBases = () => {
    BaseFactory.getBasesFromFB($routeParams.tripId)
    	.then((bases) => {
      $scope.bases = bases;
    }).catch((error) => {
      console.log("getBases error", error);
    });
  };

  getBases();

  $scope.newBasePopover = {
    templateUrl: "newBasePopover.html",
    baseEndDate: "",
    baseName: "",
		baseStartDate: ""
  };

  let baseAutoComplete = () => {
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
    var geocoder = new google.maps.Geocoder;
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        return;
      }
      geocoder.geocode({'placeId': place.place_id}, function(results, status) {
        console.log("coords? ", results[0].geometry.location);
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }
      });
    });
  };

  baseAutoComplete();

  $scope.makeNewBase = () => {
  	let newBase = {
  		end: $scope.newBasePopover.baseEndDate,
      name: $scope.newBasePopover.baseName,
      start: $scope.newBasePopover.baseStartDate,
      trip: $routeParams.tripId,
      uid: $rootScope.user.uid
    };
   	BaseFactory.makeNewBaseInFB(newBase)
    .then(() => {
    	getBases();
    })
    .catch((error) => {
    	console.log("error in makeNewBases", error);
    });
  };

  $scope.editBase = (base, newBaseName) => {
		let baseToEdit = {
			end: base.end,
			id: base.baseId,
			start: base.start,
			trip: $routeParams.tripId,
			uid: $rootScope.user.uid,
			name: newBaseName
		};
		BaseFactory.editBaseInFB(baseToEdit).then(() => {
			getBases();
		}).catch((error) => {
			console.log("editBaseName error", error);
		});
	};

  $scope.deleteEntireBase = (baseId) => {
    BaseFactory.deleteBaseFromFB(baseId).then(() => {
      EventFactory.deleteBaseEventsFromFB(baseId);
      getBases();
    }).catch((error) => {
      console.log("deleteEntireBase error", error);
    });
  };

});