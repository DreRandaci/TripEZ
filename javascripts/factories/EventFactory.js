app.factory("EventFactory", function($q, $http, $rootScope, FIREBASE_CONFIG, GOOGLE_CONFIG) {

  let getSingleEventFromFB = (eventId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events/${eventId}.json`)
      .then((result) => {
        result.data.id = eventId;
        returnedEvent = result.data;
        resolve(returnedEvent);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

	let getEventsByTripFromFB = (tripId) => {
    let eventArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events.json?orderBy="trip"&equalTo="${tripId}"`)
      .then((eventsFromFB) => {
        let eventCollection = eventsFromFB.data;
        if (eventCollection !== null) {
            Object.keys(eventCollection).forEach((key) => {
            eventCollection[key].start=new Date(eventCollection[key].start);
            eventCollection[key].end=new Date(eventCollection[key].end);
            eventCollection[key].eventId=key;
            eventArray.push(eventCollection[key]);
          });
        }
        resolve(eventArray);
      })
      .catch((error) => {
        reject("getEventsFromFB error: ", error);
      });
    });
  };

  let getEventsByBaseFromFB = (baseId) => {
    let eventArray = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events.json?orderBy="base"&equalTo="${baseId}"`)
      .then((eventsFromFB) => {
        let eventCollection = eventsFromFB.data;
        if (eventCollection !== null) {
            Object.keys(eventCollection).forEach((key) => {
            eventCollection[key].start=new Date(eventCollection[key].start);
            eventCollection[key].end=new Date(eventCollection[key].end);
            eventCollection[key].eventId=key;
            eventArray.push(eventCollection[key]);
          });
        }
        resolve(eventArray);
      })
      .catch((error) => {
        reject("getEventsFromFB error: ", error);
      });
    });
  };

  let deleteTripEventsFromFB = (tripId) => {
    getEventsFromFB(tripId).then((eventArray) => {
      return $q((resolve, reject) => {
        eventArray.forEach((eventToDelete) => {
          $http.delete(`${FIREBASE_CONFIG.databaseURL}/events/${eventToDelete.eventId}.json`)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject("deleteTripEventsFromFB error", error);
          });
        });
      });
    });
  };

  let deleteBaseEventsFromFB = (baseId) => {
    getEventsByBaseFromFB(baseId).then((eventArray) => {
      return $q((resolve, reject) => {
        eventArray.forEach((eventToDelete) => {
          $http.delete(`${FIREBASE_CONFIG.databaseURL}/events/${eventToDelete.eventId}.json`)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject("deleteTripEventsFromFB error", error);
          });
        });
      });
    });
  };

  let deleteEventFromFB = (eventId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/events/${eventId}.json`)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let searchGooglePlaces = (userInput, key) => {
    return $q((resolve, reject) => {
      $http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&keyword=${userInput}&key=${key}
        `)
        .then((data) => {
          console.log("data from loadPlaceSearch", data);
          resolve(data);
        })
        .catch((error) => {
          reject("searchGooglePlaces error: ", error);
        });
    });
  };

	return {
    getSingleEventFromFB:getSingleEventFromFB,
		getEventsByTripFromFB:getEventsByTripFromFB,
    getEventsByBaseFromFB:getEventsByBaseFromFB,
    deleteTripEventsFromFB:deleteTripEventsFromFB,
    deleteBaseEventsFromFB:deleteBaseEventsFromFB,
    deleteEventFromFB:deleteEventFromFB,
    searchGooglePlaces:searchGooglePlaces
	};

});