const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
const myChoords =  { latitude: '49.69919967651367', longitude: '-112.8233413696289' };
const mycallback = (error,ip) => {
  if(error){
    console.log("It did'nt work!",error);
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



