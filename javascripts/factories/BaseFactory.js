app.factory("BaseFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  let baseIdForSelectedEvent = "base1";

  let getBaseIdForSelectedEventFromFB = () => {
    console.log("baseIdForSelectedEvent", baseIdForSelectedEvent);
    return baseIdForSelectedEvent;
  };

	let getBasesFromFB = (tripId) => {
    let baseArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/bases.json?orderBy="trip"&equalTo="${tripId}"`)
      .then((basesFromFB) => {
        let baseCollection = basesFromFB.data;
        if (baseCollection !== null) {
            Object.keys(baseCollection).forEach((key) => {
            baseCollection[key].start=new Date(baseCollection[key].start);
            baseCollection[key].end=new Date(baseCollection[key].end);
            baseCollection[key].baseId=key;
            baseArray.push(baseCollection[key]);
          });
        }
        resolve(baseArray);
      })
      .catch((error) => {
        reject("getBasesFromFB: ", error);
      });
    });
  };

  let getBaseWithBaseIdFromFB = (baseId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/bases/${baseId}.json`)
      .then((baseFromFB) => {
        let baseReturned = baseFromFB.data;
        resolve(baseReturned);
      })
      .catch((error) => {
        reject("getBaseWithBaseIdFromFB error", error);
      });
    });
  };

  let makeNewBaseInFB = (base) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/bases.json`,
        JSON.stringify(base))
      .then((data) => {
      	resolve(data);
      })
      .catch((error) => {
      	reject("error in makeNewBaseInFB", error);
      });
  	});
  };

  let editBaseInFB = (base) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/bases/${base.baseId}.json`,
        JSON.stringify({
          end: base.end,
          latitude: base.latitude,
          longitude: base.longitude,
          name: base.name,
          start: base.start,
          trip: base.trip,
          uid: base.uid
        })
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("error in editBaseInFB", error);
      });
    });
  };

  let deleteTripBasesFromFB = (tripId) => {
    getBasesFromFB(tripId).then((baseArray) => {
      return $q((resolve, reject) => {
        baseArray.forEach((baseToDelete) => {
          $http.delete(`${FIREBASE_CONFIG.databaseURL}/bases/${baseToDelete.baseId}.json`)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject("deleteTripBasesFromFB error", error);
          });
        });
      });
    });
  };

  let deleteBaseFromFB = (baseId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/bases/${baseId}.json`)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("deleteBaseFromFB error", error);
      });
    });
  };

	return {
    getBaseIdForSelectedEventFromFB:getBaseIdForSelectedEventFromFB,
		getBasesFromFB:getBasesFromFB,
    getBaseWithBaseIdFromFB:getBaseWithBaseIdFromFB,
		makeNewBaseInFB:makeNewBaseInFB,
		editBaseInFB:editBaseInFB,
    deleteTripBasesFromFB:deleteTripBasesFromFB,
    deleteBaseFromFB:deleteBaseFromFB
	};

});