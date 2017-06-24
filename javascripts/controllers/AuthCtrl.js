app.controller("AuthCtrl", function($location, $rootScope, $scope, ngToast, AuthFactory, UserFactory) {

	$scope.auth = {};

	$scope.userWillLogin = () => {
		$scope.auth = { 
			email: "a@a.com",
			password: "123456"
		};
	};

	$scope.clearAuthScope = () => {
		$scope.auth = {};
	};

	if ($location.path() === '/logout') {
		AuthFactory.logout();
		if ($rootScope.user.google) {
			$location.url('https://accounts.google.com/Logout');
		}
		$rootScope.user = {};
		$location.url('/landing');
	}

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth).then((userCreds) => {
			return UserFactory.getUser(userCreds.uid);
		}, (error) => {
			ngToast.create("Check your username & password, or register if you're new here!");
		})
		.then((user) => {
		if (user) {
			$rootScope.user = user;
			$rootScope.user.google = false;
			$location.url(`/trips/${$rootScope.user.uid}`);
			}
		})
		.catch((error) => {
			console.log(error);
		});
	};

	let logMeInGoogle = () => {
		AuthFactory.authenticateGoogle($scope.auth)
		.then((user) => {
			$rootScope.user = user;
			$rootScope.user.google = true;
			$rootScope.user.email = user.email;
			$location.url(`/trips/${$rootScope.user.uid}`);
		}).catch((error) => {
			ngToast.create("Check your Google username & password, or register as new user.");
			console.log(error);
		});
	};

	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) => {
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error) => {
			console.log(error);
		}).then((registerComplete) => {
			logMeIn();
		}).catch((error) => {
			console.log(error);
		});
	};

	$scope.loginUser = () => {
		logMeIn();
	};

	$scope.loginUserGoogle = () => {
		logMeInGoogle();
	};

});