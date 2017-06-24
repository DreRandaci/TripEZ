app.controller("CalCtrl", function($routeParams, $rootScope, $scope, ngToast, BaseFactory, EventFactory, TripFactory) {

	userEmail = $rootScope.user.email;
	let googleFrame = `<iframe src="https://calendar.google.com/calendar/embed?src=${userEmail}&ctz=America/Chicago" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>`;
	$("#calHere").html(googleFrame);

});