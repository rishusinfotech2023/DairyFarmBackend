const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config();

const DB_URL=process.env.DB_url;

module.exports={
    DB:DB_URL
}