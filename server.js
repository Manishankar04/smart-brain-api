const express= require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register =require('./controllers/register');
const signin =require('./controllers/signin');
const profile =require('./controllers/profile');
const image =require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app= express();

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) =>{res.send('it is working')})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
console.log(`app is running on port ${process.env.PORT}`);
});

/*
    const handleApiCall = (req, res) => {
      app.models
        // This part has been updated with the recent Clarifai changed. Used to be:
        // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
    }
*/