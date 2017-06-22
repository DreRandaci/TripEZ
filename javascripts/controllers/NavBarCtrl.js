app.controller("NavBarCtrl", function($scope) {

	$scope.openNav = () => {
	  document.getElementById("sideNav").style.width = '13%';
	};

	$scope.closeNav = () => {
	  document.getElementById("sideNav").style.width = '5%';
	};

});