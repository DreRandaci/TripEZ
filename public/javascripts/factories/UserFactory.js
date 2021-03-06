app.factory("UserFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  let addUser = (authData) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
        JSON.stringify({ 
          uid: authData.uid,
          email: authData.email
        })
      )
      .then((storeUserSuccess) => {
        resolve(storeUserSuccess);
      })
      .catch((storeUserError) => {
        reject(storeUserError);
      });
    });
  };

  let getUser = (userId) =>{
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userObject) => {
          let users = [];
          Object.keys(userObject.data).forEach((key) => {
            users.push(userObject.data[key]);
          });
          resolve(users[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  let getAllUsers = () => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`)
        .then((userObject) => {
          let users = [];
          Object.keys(userObject.data).forEach((key) => {
            users.push(userObject.data[key]);
          });
          resolve(users);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    addUser:addUser, 
    getUser:getUser,
    getAllUsers:getAllUsers
  };

});