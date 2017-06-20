app.controller("NavBarCtrl", function($scope) {

	$scope.openNav = () => {
	  document.getElementById("sideNav").style.width = '15%';
	};

	$scope.closeNav = () => {
	  document.getElementById("sideNav").style.width = '5%';
	};

});