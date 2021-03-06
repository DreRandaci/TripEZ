app.factory("TripFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  let getSingleTripNameFromFB = (tripIdPassed) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/trips/${tripIdPassed}.json`)
      .then((tripFromFB) => {
        tripFromFB.data.tripId = tripIdPassed;
        let tripReturned = tripFromFB.data;
        resolve(tripReturned);
      })
      .catch((error) => {
        reject("getSingleTripNameFromFB error", error);
      });
    });
  };

  let getTripsFromFB = (userID) => {
    let tripArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/trips.json?orderBy="uid"&equalTo="${userID}"`)
      .then((tripsFromFB) => {
        let tripCollection = tripsFromFB.data;
        if (tripCollection !== null) {
            Object.keys(tripCollection).forEach((key) => {
            tripCollection[key].start = new Date(tripCollection[key].start);
            tripCollection[key].end = new Date(tripCollection[key].end);
            tripCollection[key].tripId = key;
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
    newTrip.archived = false;
    newTrip.uid = $rootScope.user.uid;
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

  let editTripInFB = (trip) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/trips/${trip.tripId}.json`,
        JSON.stringify({
          archived: trip.archived,
          end: trip.end,
          name: trip.name,
          start: trip.start,
          uid: trip.uid
        })
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("error in editTripInFB", error);
      });
    });
  };

  let deleteTripFromFB = (tripId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/trips/${tripId}.json`)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("deleteTripFromFB error", error);
      });
    });
  };

	return {
		getTripsFromFB:getTripsFromFB,
		makeNewTripInFB:makeNewTripInFB,
    editTripInFB:editTripInFB,
    getSingleTripNameFromFB:getSingleTripNameFromFB,
    deleteTripFromFB:deleteTripFromFB
	};

});