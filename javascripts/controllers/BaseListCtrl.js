app.controller("BaseListCtrl", function($location, $rootScope, $routeParams, $scope, BaseFactory) {

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

});