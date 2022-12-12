
// selector use $(element name or class name ,or id name)
$("h1")

// selecting  manipulating Style with jQuery
$("h1").css("color" ,"red")
$("h1").css("font-size" ,"3rem");
$("h1").css("font-weight", "bolder");

// add multipul class in jquery
$("a").addClass('link btn-warning')

// add text 
$("a").text("GO Home")

$('button').html("<em>Don't Click to Me</em>")

// manipulating attribute in jquery
// $("a").attr('href' ,'https://www.google.com')

// adding event listen to jquery
$("h1").click(function (){
   $("h1").css("color","blue") 
})

// JavaScript
// for (let i = 0; i <5; i++) {
//     document.querySelectorAll("button")[i].addEventListener('click',function(){
//     document.querySelector("h1").style.color = "purple"  
//     })
// }

// jquery
$("button").click(function(){
    $('h1').css('color','purple')
})

$("input").keypress(function(event){
    $("h2").text(event.key)
})

$("h1").on("mouseover" ,function(){
    $('h1').css("color","green")
})

$("h1").before('<button>Click</button>')

$("h1").after("<button>Hello</button>")

$("h1").append("<button>Submit</button>")

$("h1").prepend("<button>Click everyOne</button>")

$("button").on("click" ,function(){
// $("h1").hide()
// $("h1").fadeOut() //remove evement
// $("h1").fadeIn() // add the element
// $("h1").fadeToggle()  // add element and remove element click button
// $('h1').slideUp()  // slide up and remove element
// $('h1').slideUp()   // slide Down  and remove element
// $('h1').slideToggle()  // slide up and slide Down remove element and add element
$('h1').slideUp().slideDown().animate({opacity:'0.5'})
})

