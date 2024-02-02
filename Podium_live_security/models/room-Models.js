const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  title: {type: String,required: true},
  description: {type: String,required: true},
  creator: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  participants: [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
  speakers: [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
  raisedHands: [{type: mongoose.Schema.Types.ObjectId,ref: 'User'}]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;