app.factory("TripFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

 let getTripsFromFB = (userID) => {
    let tripArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/trips.json?orderBy="uid"&equalTo="${userID}"`)
      .then((tripsFromFB) => {
        let tripCollection = tripsFromFB.data;
        if (tripCollection !== null) {
            Object.keys(tripCollection).forEach((key) => {
            tripCollection[key].tripId=key;
            tripArray.push(tripCollection[key]);
          });
        }
        resolve(tripArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let makeNewTripInFB = (newTrip) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/trips.json`,
        JSON.stringify(newTrip))
      .then((data) => {
      	resolve(data);
      })
      .catch((error) => {
      	reject("error in makeNewTripInFB", error);
      });
  	});
  };

  let editTripInFB = (tripToEdit) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/trips/${tripToEdit.id}.json`,
        JSON.stringify(tripToEdit))
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("error in editTripInFB", error);
      });
    });
  };

	return {
		getTripsFromFB:getTripsFromFB,
		makeNewTripInFB:makeNewTripInFB,
    editTripInFB:editTripInFB
	};

});