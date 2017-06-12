app.controller("NavBarCtrl", function($rootScope, $scope) {

	$scope.openNav = () => {
	  document.getElementById("sideNav").style.width = "250px";
	};

	$scope.closeNav = () => {
	  document.getElementById("sideNav").style.width = "100px";
	};

});