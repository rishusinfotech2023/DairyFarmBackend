const express=require('express');
const Router=express.Router();

const code=require('../controller/login');
const jwt=require('./middleware');

Router.post('/signup',code.admin);
Router.post('/login',code.adminlogin);
Router.post('/order',code.order);
Router.post('/getintouch',code.getintouch);
Router.get('/getorder',jwt,code.orderget);
Router.get('/Get',jwt,code.getintouchget);

module.exports=Router;


