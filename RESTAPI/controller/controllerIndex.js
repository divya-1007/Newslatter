const userData = require('../../model/userData')

exports.getArtical = async(req,res)=>{
    // const getDAta = await userData.find()
    userData.find(function(err, foundArticles){
        if (!err) {
          res.send(foundArticles);
        } else {
          res.send(err);
        }
    })
}

exports.createArtical = (req,res)=>{
 const {title ,content}  =req.body
    const user = new userData({
        title:title,
        content:content
    })

    user.save((error ,data)=>{
      if(!error){
      res.send(data)
      }else{
       res.send(error)
      }
    })
}

exports.deleteArtical = (req,res)=>{
  userData.deleteMany((error)=>{
    if(!error){
      res.send("successfully delete Data")
    }else{
      res.send(error)
    }
  })
}