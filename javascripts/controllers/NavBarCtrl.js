app.controller("NavBarCtrl", function($rootScope, $scope) {

	$scope.openNav = () => {
		console.log("open nav clicked");
	  document.getElementById("sideNav").style.width = "250px";
	};

	$scope.closeNav = () => {
		console.log("close nav clicked");
	  document.getElementById("sideNav").style.width = "100px";
	};

});