const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');

const app=express();

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


const port=3000;
app.listen(port,function(){
  console.log('Server started on port '+port);
});

const config=require('./config/database');
mongoose.connect(config.database);
  mongoose.connection.on('connected',()=>{
    console.log('Conected to database '+config.database);
  })
  mongoose.connection.on('error',()=>{
    console.log('Database error '+err);
  })

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) =>{
  res.send('Invalid Endpoint');
})

const users=require('./routes/users');
app.use('/users',users);
