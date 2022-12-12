
var el = document.querySelector('h1');
// console.log(el); // 👉️ null
if(el !== null){
el.innerHTML = '<em>Good Bye </em>';
el.style.color = 'red';
}

var ulElement = document.getElementsByTagName("li")
if(ulElement !== null){
var element ,fontWeight ,linehight;
ulElement[2].style.color = 'blue';
ulElement[1].style.color = 'red';
ulElement[0].style.color = 'green';
   
for (let index = 0; index < ulElement.length; index++) {
    // el.textContent = "Hello";
    element = ulElement[index].style.fontWeight = 'bold';
    fontWeight = ulElement[index].style.fontSize = '1rem';
    linehight = ulElement[index].style.lineHeight = '2rem';
}

linehight ;
fontWeight;
element  ;
}

var ButtonElement = document.querySelector('button')
var Link = document.querySelector('a')
if(ButtonElement !== null  || Link !== null){
    ButtonElement.classList.add('invisival')
    ButtonElement.classList.remove('removing')
    ButtonElement.classList.toggle('invisival')
//    Link.attributes
    Link.getAttribute('href');
    Link.setAttribute('href','https://www.bing.com')
   
//    console.log(Link.getAttribute('href'));

}