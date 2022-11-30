require('dotenv').config()
const express = require('express');
const https = require('https')
const bodyParser = require('body-parser'); 
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

app.get('/JsonData',(req,res)=>{
res.sendFile(__dirname + "/index.html")
})

app.post('/' ,(req,res)=>{
  let query = req.body.cityName;
  let Apikey = '5c7b8d2d0fa0da93c8bf09a739f5fb68'
  let apiUnit = 'metric'
 const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+Apikey+'&units='+apiUnit+'' ;
 https.get(url ,(response) => {
  console.log(response.statusCode);
  response.on('data' ,(data)=>{
    let weather = JSON.parse(data)
    let temp = weather.main.temp
    let desc = weather.weather[0].description
    let icon = weather.weather[0].icon
    let iconUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
    res.write('<p>The weather is currently ' +desc+ '</P>');
    res.write('<h1>The Temperature in '+query+' is '+ temp+ ' Degrees Celcius </h1>');
    res.write('<img src='+iconUrl+'>');
   res.send() ;

  })
 })
})

app.get('/' ,(req,res)=>{
  res.sendFile(__dirname + "/signup.html")
})

app.post('/loginData' ,(req,res)=>{
  const {fname ,lname ,email} = req.body
  const data = {
    members:[
      {email_address:email,
      status:'subscribed',
      merge_fields:{
        FNAME:fname,
        LNAME:lname,
      }
      }
    ]
  }
const JsonData = JSON.stringify(data)
 const UrlM = 'https://us17.api.mailchimp.com/3.0/lists/eba18afc7f'
  const option ={
    method:'POST',
    auth:"Div:70b8cf542b8b2a08fc0fc4f783bd5c98-us17"
  }

  const requests = https.request(UrlM,option ,(response) =>{
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
      }else{
        res.sendFile(__dirname + "/failure.html")
      }
  // if(error){
  //   res.sendFile(__dirname + '/failure.html')  
  // }else{
  //    if(response.statusCode === 200){
  //     res.send("Sucessfully Subscribed !")
  //    }else{
  //     res.sendFile(__dirname + '/failure.html')
  //    }
  // }
    response.on('data' ,(data)=>{
      console.log(JSON.parse(data));
    })
    })
    requests.write(JsonData)
    requests.end()
  
})

app.post('/failure' ,(req,res)=>{
  res.redirect('/')
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`server start http://localhost:${process.env.PORT}`);
})

