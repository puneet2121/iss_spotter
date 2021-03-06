const request = require('request');
// const arg = process.argv[2];
// request(url, (error, response, desc) => {
const fetchCoordsByIP = function(ip,callback) {
  request(`https://freegeoip.app/json/${ip}`,(error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code of ${response.statusCode} when fetching Coordinates for IP add: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
    return;
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  request((`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`),(error,response,body) =>{
    if (error) {

      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};
  


const fetchMyIP = function(givenCallBack) {
// this is where i will do api call
  request('https://api.ipify.org?format=json',(error,response,body) => {
    if (response.statusCode !== 200) {
      givenCallBack(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    if (error) {
      // console.log('fetch my IP error',error)
      givenCallBack(error,null);
      return;
    }
    const data = JSON.parse(body);
    givenCallBack(null,data.ip);

  });
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



module.exports = {fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation};
