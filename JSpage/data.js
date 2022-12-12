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

// JavaScript

var name = "container"
var charsplice = name.slice(0,1)
var uppercase = charsplice.toUpperCase()
var chars2 = name.slice(1, name.length)
chars2 = chars2.toLocaleLowerCase()
var resultcon =  uppercase  +  chars2
console.log(resultcon)

var n = Math.random()
 n = n * 6 ;
 n = Math.random(n)
 console.log(n);

//  fizz algorithum in JavaScript Challenge
 var fizzBuzz = function (n) {
  let arr = [];

  // while (i<= 100) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      arr.push("FizzBuzz");
    } else if (i % 3 == 0) {
      arr.push("Fizz");
    } else if (i % 5 == 0) {
      arr.push("Buzz");
    } else {
      arr.push(i + "");
    }
  }
  // i++
  // }
  return arr;
};
 console.log(fizzBuzz(15));

//Solution to the 99 Bottles Challenge
// i am checking in 3 bottles
 var numberOfBottles = 3
while (numberOfBottles >= 0) {
    var bottleWord = "bottle";
    if (numberOfBottles === 1) {
        bottleWord = "bottles";
    } 
    // console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    // console.log(numberOfBottles + " " + bottleWord + " of beer,");
    // console.log("Take one down, pass it around,");
	numberOfBottles--;
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
}

function fibonacci(num)
{
    var num1=[];
  if(num === 1){
    num1 = [0]
  }else if(num === 2){
    num1 = [0,1]
  }else{ 
    num1 = [0,1]
    for (i = 0; i < num; i++) 
    {
      num1.push(num1[num1.length-2] + num1[num1.length-1] )
    }
  }
    return num1;
}
console.log(fibonacci(10))

// The Fibonacci Exercise Challenge
function fibonacciGenerator (n) {
  var result = [] 
if(n === 1){
result = [0]
}else if(n===2){
result = [0,1]
}else{
 result = [0,1]
 for (var i = 2; i < n; i ++){
 result.push(result[result.length-2] + result[result.length-1])
 }
}
return result
}
fibonacciGenerator(3)