const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');
const myChoords =  { latitude: '49.69919967651367', longitude: '-112.8233413696289' };
const mycallback = (error,ip) => {
  if(error){
    console.log("It did not work!",error);
    return;
  }
  console.log('It worked! Retured IP:',ip)
  return;
}
fetchMyIP(mycallback);

fetchCoordsByIP('68.144.212.2', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});
fetchISSFlyOverTimes(myChoords,(error,time) => {
  if(error){
    console.log("It did'nt work!",error);
    return;
  }
  console.log('It worked! Retured IP:',time)
  return;
  });
  const printPassTimes = function(passTimes) {
    for (const passes of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(passes.risetime);
      const duration = passes.duration;
      console.log(`Next  pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work", error);
    }
    printPassTimes(passTimes);
  });


