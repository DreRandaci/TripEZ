app.factory("EventFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

	let getEventsFromFB = (tripId) => {
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
        reject("getEventsFromFB: ", error);
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

	return {
		getEventsFromFB:getEventsFromFB,
    deleteTripEventsFromFB:deleteTripEventsFromFB
	};

});