//  Anonymous Function
// if you select only one element then use querySelector
// if you select all Element use querySelectorAll
// document.querySelector('button').addEventListener('click',function () {
//     alert("hello") ;
// })

// Detecting button press
var buttonSelect = document.querySelectorAll('.drum')
for (let index = 0; index < buttonSelect.length; index++) {
 buttonSelect[index].addEventListener('click', handalClick)
}

function handalClick() {
var expression =  this.innerHTML
soundCreate(expression)
buttonAnimation(expression)
}

// Detecting key press
document.addEventListener('keypress', function(event){
soundCreate(event.key)
})


function soundCreate(expression) {
switch (expression) {
    case "w":
    var audio = new Audio('sounds/tom-1.mp3');
    audio.play();
    break;

    case "a":
    var audio = new Audio('sounds/tom-2.mp3');
    audio.play();
    break;

    case "s":
    var audio = new Audio('sounds/tom-3.mp3');
    audio.play();
    break;

    case "d":
    var audio = new Audio('sounds/tom-4.mp3');
    audio.play();
    break;

    case "j":
    var audio = new Audio('sounds/snare.mp3');
    audio.play();
    break;

    case "k":
    var audio = new Audio('sounds/crash.mp3');
    audio.play();
    break;

    case "l":
    var audio = new Audio('sounds/kick-bass.mp3');
    audio.play();
    break;
    default:
}
}

function buttonAnimation(currentKey){
 var decoration = document.querySelector('.'+ currentKey)
   decoration.classList.add('pressed')

   setTimeout(() => {
    decoration.classList.remove('pressed')
   }, 100);
}


// Higher Order Function
function add(num1, num2) {
    return num1 + num2;
    }
     
function subtract(num1, num2) {
return num1 - num2;
}
    
function multiply(num1, num2) {
return num1 * num2;
}
    
function divide(num1, num2) {
return num1 / num2;
}
    
function calculator(num1, num2, operator) {
return operator(num1, num2);
}

// callback == wating a click event , then the callback function gets called back and executed
function AnotherAddEventListener(typeOfEvent ,callback){
    var eventHouse ={
        eventType:'keypress',
        key:'p',
        durationOfKeypress : 2
     }

if(eventHouse.eventType === typeOfEvent){
    callback(eventHouse)
}
}

AnotherAddEventListener('keypress' ,function(event){
    console.log(event)
})


 

// constructor Function
function Ballyboy1 (name ,hasWorkPermit ,languages) {
        this.name = name,
        this.hasWorkPermit = hasWorkPermit,
        this.languages = languages,
        this.moveSuitcase = function () {
            alert('May I take your suitcase ?'),
          pickUpSuitcase()  ,
          move()
        }
       this.cleaning = function(){
        alert('Cleaning is progress...')
       } 
    }

    var ballyboy = {
        name:'ballyBoy',
        hasWorkPermit: true,
        languages:['Hindi' ,"English"],
        moveSuitcase:function () {
            alert('May I take your suitcase ?'),
          pickUpSuitcase()  ,
          move()
        }
    }   
    // call Method
// ballyboy.moveSuitcase()