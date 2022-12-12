require('dotenv').config()
const express = require('express');
const https = require('https')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require("mongoose")
const passport = require('passport')
const session = require('express-session')
const bcrypt = require('bcrypt');
const data = require('./JSpage/data')
var itemData = ["Buy Food", "Cook Food", "Eat Food"]
const restApi = require('./RESTAPI/router/index')
const userData = require('./model/userData')
const Login = require('./model/login');
const login = require('./model/login');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Items = require("./model/item")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: true
}))


app.use(express.static('public'));

mongoose.set({ "strictQuery": false })
mongoose.connect(process.env.DATABASE, { useNewUrlParser: false, })
  .then(console.log('Database connecting'))
  .catch(err => console.log(`error: ${err}`))

app.use(passport.initialize())
app.use(passport.session())
passport.use(Login.createStrategy())
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Login.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
},
function(accessToken, refreshToken, profile, cb) {
  // console.log(profile ,"dkdfd")
  Login.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: "/login" }),
function(req, res) {
  // Successful authentication, redirect to secrets.
  res.redirect("/secrets");
  });

  

// file system
// fs.copyFileSync('index.txt' , 'index2.txt')
// The list is just a JSON file and can be used anywhere 'superheroes'pakage.
// The list is just a JSON file and can be used anywhere. supervillains pakage

// Json data 
app.get('/JsonData', (req, res) => {
  res.sendFile(__dirname + "/htmlPage/index.html");
})

// email  Mailchimp
app.post('/', (req, res) => {
  let query = req.body.cityName;
  let Apikey = '5c7b8d2d0fa0da93c8bf09a739f5fb68'
  let apiUnit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + Apikey + '&units=' + apiUnit + '';
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      let weather = JSON.parse(data)
      let temp = weather.main.temp
      let desc = weather.weather[0].description
      let icon = weather.weather[0].icon
      let iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write('<p>The weather is currently ' + desc + '</P>');
      res.write('<h1>The Temperature in ' + query + ' is ' + temp + ' Degrees Celcius </h1>');
      res.write('<img src=' + iconUrl + '>');
      res.send();

    })
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/htmlPage/signup.html")
})

app.post('/loginData', (req, res) => {
  const { fname, lname, email } = req.body
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        }
      }
    ]
  }
  const JsonData = JSON.stringify(data)
  const UrlM = 'https://us17.api.mailchimp.com/3.0/lists/eba18afc7f'
  const option = {
    method: 'POST',
    auth: "Div:70b8cf542b8b2a08fc0fc4f783bd5c98-us17"
  }

  const requests = https.request(UrlM, option, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/htmlPage/success.html")
    } else {
      res.sendFile(__dirname + "/htmlPage/failure.html")
    }

    response.on('data', (data) => {
      console.log(JSON.parse(data));
    })
  })
  requests.write(JsonData)
  requests.end()

})

app.post('/failure', (req, res) => {
  res.redirect('/')
})

app.get('/calculater', (req, res) => {
  res.sendFile(__dirname + '/htmlPage/calculater.html')
})

app.get('/dicegame', (req,res)=>{
  res.sendFile(__dirname + '/Dom/dice.html')
})

app.get('/drumgame', (req,res)=>{
  res.sendFile(__dirname + '/Dom/drum.html')
})

app.post('/calculater-data', (req, res) => {
  const { fName, lname } = req.body
  var n1 = fName + lname;
  const Bmi = parseFloat(fName) / (parseFloat(lname) * parseFloat(lname))
  res.send("The result of the calculation is  " + n1)
})

// EJS Embedded JavaScript templating
let workItem = [];
app.get('/about', (req, res) => {
  const dates = data()
  var day = dates.day
  var kindDay = dates.kindDay

  res.render('toDoList', {
    kindOfday: day,
    kindDay: kindDay,
    itemData: itemData
  })
})

app.post('/to-do', (req, res) => {
  const items = req.body.item
  console.log(req.body);
  if (req.body.list === 'work list') {
    workItem.push(items)
    res.redirect('/work')
  } else {
    itemData.push(items)
    res.redirect('/about')
  }
})

app.get('/work', (req, res) => {
  res.render('toDoList', { kindDay: 'work list', itemData: workItem, kindOfday: 0 })
})

app.post('/work', (req, res) => {
  let items = req.body.item
  workItem.push(items)
  res.redirect('/work')
})

app.get('/pass', (req, res) => {
  res.render('about', {

  })
})

app.use('/', restApi)

// =========== Request tragating  all Artical ==========================
app.route('/articalData').get(function (req, res) {
  userData.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
}).post(function (req, res) {
  const user = new userData({
    title: req.body.title,
    content: req.body.content
  })
  user.save((error) => {
    if (!error) {
      res.send("INSER DATA SUCCESSFULLY ")
    } else {
      res.send(error)
    }
  })
})
  .delete(function (req, res) {
    userData.deleteMany((error) => {
      if (!error) {
        res.send("successfully delete Data")
      } else {
        res.send(error)
      }
    })
  })

// =========== Request tragating Specific all Artical ==========================
app.route('/articalspecific/:articalTitle')
  .get(function (req, res) {
    userData.findOne({ title: req.params.articalTitle }, function (error, data) {
      if (!error) {
        res.send(data)
      } else {
        res.send(error)
      }
    })
  })
  .put(function (req, res) {
    userData.updateOne({ title: req.params.articalTitle },
      { title: req.body.title, content: req.body.content },
      function (error) {
        if (!error) {
          res.send("Update data")
        } else {
          res.send(error)
        }
      })
  })
  .patch(function (req, res) {
    userData.updateOne({ title: req.params.articalTitle },
      { $set: req.body },
      function (error) {
        if (!error) {
          res.send("Update data Patch")
        } else {
          res.send(error)
        }
      })
  })
  .delete(function (req, res) {
    userData.deleteOne({ title: req.params.articalTitle }, function (error) {
      if (!error) {
        res.send('Data Delete ')
      } else {
        res.send(error)
      }
    })
  })

//=================== Authentication & Security ===========================

app.get('/home', (req, res) => {
  res.send("Home")
})

app.get('/submit',(req,res)=>{
  
  // if (req.isAuthenticated()) {
    res.render("submit", {
    })
  // } else {
  //   res.redirect("/login")
  // }
})

app.post('/submit', (req,res)=>{
 const secret = req.body.secret
 console.log(req.session.user.id);
 Login.findOne({email:req.session.user.email} ,function(error ,foundUser){
  console.log(error ,foundUser);
  if(error){
      console.log(error);
  }else{
  if(foundUser){
    foundUser.secret = secret
    foundUser.save(function(){
        res.redirect('/secrets')
    })
  }
  }
 })
})

app.get('/login', (req, res) => {
  res.render('Login', {
  })
})

app.get('/register', (req, res) => {
  res.render('register.ejs', {
  })
})

app.get('/secrets', function (req, res) {
  
    res.render("secrets", {
    })
  
})

app.post('/register', (req, res) => {
  //   const saltRounds = 10;
  //   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //     const signup = new Login({
  //       email:req.body.email,
  //       password:hash
  //     })
  //     signup.save((error)=>{
  //       if(error && error !== null){
  //         res.redirect("/register")
  //       }else{
  //         res.redirect('/secrets')
  //       }
  //     })
  // });

  Login.register({ username: req.body.email }, req.body.password, function (err, user) {
    if (err) {
      console.log('error registering user');
      console.log(err);
      return res.send('oops');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/secrets');
    });
  });

  // Login.register({email:req.body.email} ,req.body.password , function (error, user) {
  //   console.log(error ,user);
  //   if(error){
  //     res.redirect("/register")
  //   }else{
  //     passport.authenticate('local')(req,res, function(){
  //       res.redirect('/secrets')
  //     })
  //   }
  // })
})

app.post('/login', (req, res) => {
  const email1 = req.body.email
  const password1 = req.body.password

  login.findOne({ email: email1 }, (error, foundData) => {
    if (error) {
      console.log(error);
    } else {
      if (foundData) {
        bcrypt.compare(password1, foundData.password, function (err, result) {
          req.session.user = foundData
          res.cookie("token", foundData);
          if (result === true) {
            res.render('secrets')
          } else {
            res.send("password Not Match")
          }
        });
      }
    }
  })
})

//==============Putting everything  together===============================
const item1 = new Items({
  itemName:"welcome to your todoList!"
})

const item2 = new Items({
  itemName:"Hi the + Button to a new item"
})

const item3 = new Items({
  itemName:" Hi this to delete an item ."
})

 const InsertMany = [item1 ,item2 ,item3]



app.get('/todoData', async(req,res)=>{
  const recordData = await Items.find({})
  if(recordData.length === 0){
    Items.insertMany(InsertMany ,function(error){
  if(error){
    console.log(error);
  }else{
    console.log("Successfully save all itme to DB");
  }
 }) 
 res.redirect("/failure")
  }else{
    res.render('TodoList1', {
      kindOfday: 0,
      kindDay: "Today",
      itemData: recordData
    })
  }
})

app.post('/todolist1' ,function(req,res){

  const item3 = new Items({
    itemName:req.body.itemName,
  })
  item3.save()

  res.redirect('/todoData')
})

app.post('/delete' ,function(req,res){

  const deleteData = req.body;
  console.log(deleteData);
  Items.findByIdAndRemove({_id: req.body.checkbox} ,function(error){
    if(!error){
      console.log("successfully delete");
    }else{
      console.log(error);
    }
  })
  // res.redirect('/todoData')
})

app.get("/:CustomeListName" ,function(req,res){
  const CustomeListName = req.body.CustomerListName
})




app.listen(process.env.PORT || 3000, () => {
  console.log(`server start http://localhost:${process.env.PORT}`);
})

