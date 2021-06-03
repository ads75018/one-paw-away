const mongoose = require('mongoose')
const {Schema}= mongoose;

const doggoSchema = new Schema({
  name: String,
  type: String,
  birthday: Date,
  location: String,
  Important: String,
  


})