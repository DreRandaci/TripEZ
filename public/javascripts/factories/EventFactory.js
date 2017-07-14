app.factory("EventFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  let getSingleEventFromFB = (eventId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/events/${eventId}.json`)
      .then((result) => {
        result.data.start = new Date(result.data.start);
        result.data.end = new Date(result.data.end);
        result.data.id = eventId;
        resolve(result.data);
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
            eventCollection[key].start = new Date(eventCollection[key].start);
            eventCollection[key].end = new Date(eventCollection[key].end);
            eventCollection[key].eventId = key;
            eventArray.push(eventCollection[key]);
          });
        }
        resolve(eventArray);
      })
      .catch((error) => {
        reject("getEventsByTripFromFB error: ", error);
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
            eventCollection[key].start = new Date(eventCollection[key].start);
            eventCollection[key].end = new Date(eventCollection[key].end);
            eventCollection[key].eventId = key;
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

  let addToTripEventsInFB = (eventToBeSavedToFB) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/events.json`,
        JSON.stringify(eventToBeSavedToFB))
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject("error in addToTripEventsInFB", error);
      });
    });
  };

  let editEventInFB = (event) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/events/${event.id}.json`,
        JSON.stringify({
          address: event.address,
          base: event.base,
          end: event.end,
          latitude: event.latitude,
          longitude: event.longitude,
          name: event.name,
          ref: event.ref,
          review: event.review,
          start: event.start,
          trip: event.trip,
          type: event.type
        })
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject("error in editEventAttributeInFB", error);
      });
    });
  };

  let deleteTripEventsFromFB = (tripId) => {
    getEventsByTripFromFB(tripId).then((eventArray) => {
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

  return {
    getSingleEventFromFB:getSingleEventFromFB,
    getEventsByTripFromFB:getEventsByTripFromFB,
    getEventsByBaseFromFB:getEventsByBaseFromFB,
    addToTripEventsInFB:addToTripEventsInFB,
    editEventInFB:editEventInFB,
    deleteTripEventsFromFB:deleteTripEventsFromFB,
    deleteBaseEventsFromFB:deleteBaseEventsFromFB,
    deleteEventFromFB:deleteEventFromFB
  };

});