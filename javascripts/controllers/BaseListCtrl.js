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