 module.exports = getDate

function getDate() {

var dates = new Date();
var currentDate = dates.getDay();
var day = ''

switch (currentDate) {
  case 0:
    day = 'Sunday';
    break;
  case 2:
    day = 'Monday';
    break; 
  case 2:
    day = 'Tuesday';
    break;
  case 3:
    day = 'Wednesday';
    break; 
  case 4:
    day = 'Thursday';
    break;
  case 5:
    day = 'Friday';
    break; 
  case 6:
    day = 'Saturday';
    break;
  default:
    console.log('Error: current day is equal to : ' + currentDate)
}

const options = {
  weekend:"long",
  day:"numeric",
  month:"long"
}

var kindDay = dates.toLocaleDateString("en-US",options)
return {kindDay ,day}

}