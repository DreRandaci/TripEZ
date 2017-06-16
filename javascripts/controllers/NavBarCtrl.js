app.controller("NavBarCtrl", function($scope) {

	$scope.openNav = () => {
	  document.getElementById("sideNav").style.width = "250px";
	};

	$scope.closeNav = () => {
	  document.getElementById("sideNav").style.width = "100px";
	};

});