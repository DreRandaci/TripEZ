app.factory("BaseFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

	let getBasesFromFB = (tripId) => {
    let baseArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/bases.json?orderBy="tripId"&equalTo="${tripId}"`)
      .then((basesFromFB) => {
        let baseCollection = basesFromFB.data;
        if (baseCollection !== null) {
            Object.keys(baseCollection).forEach((key) => {
            baseCollection[key].baseId=key;
            baseArray.push(baseCollection[key]);
          });
        }
        resolve(baseArray);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let makeNewBaseInFB = (newBase) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/bases.json`,
        JSON.stringify(newBase))
      .then((data) => {
      	resolve(data);
      })
      .catch((error) => {
      	reject("error in makeNewBaseInFB", error);
      });
  	});
  };

  let editBaseInFB = (baseToEdit) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/bases/${baseToEdit.id}.json`,
        JSON.stringify(baseToEdit))
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("error in editBaseInFB", error);
      });
    });
  };

	return {
		getBasesFromFB:getBasesFromFB,
		makeNewTripInFB:makeNewTripInFB,
		editBaseInFB:editBaseInFB
	};

});