const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose')
const route = require('./route/route');

const app = express();
  
app.use(bodyParser.json());



// mongoose.connect("mongodb+srv://rohankesarkar:rohan123@cluster0.sgev7.mongodb.net/group32Database", {
//     useNewUrlParser: true
// })
// .then( () => console.log("MongoDb is connected"))
// .catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

