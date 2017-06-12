app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory) {

	$scope.alerts = [];

	$scope.auth = {};

	$scope.userWillLogin = () => {
		console.log("user will login");
		$scope.auth = { 
			templateUrl: "auth.html",
			email: "a@a.com",
			password: "123456"
		};
	};

	$scope.userWillRegister = () => {
		console.log("user will register");
		$scope.auth = { 
			templateUrl: "reg.html",
			email: "",
			password: ""
		};
	};

	if ($location.path() === '/logout') {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url('/landing');
	}

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth).then((userCreds) => {
			return UserFactory.getUser(userCreds.uid);
		}, (error) => {
			$scope.alerts[0] = {msg: "Oops! Looks like that username or password isn't recognized."};
		}).then((user) => {
			$rootScope.user = user;
			$location.url(`/trips/${$rootScope.user.uid}`);
		}).catch((error) => {
			console.log(error);
		});
	};

	let logMeInGoogle = () => {
		AuthFactory.authenticateGoogle($scope.auth)
			.then((user) => {
				$rootScope.user = user;
				$rootScope.user.username = user.email;
				$location.url(`/trips/${$rootScope.user.uid}`);
			}).catch((error) => {
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