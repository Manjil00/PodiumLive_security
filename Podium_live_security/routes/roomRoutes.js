const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get rooAm by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      res.json(room);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new room
router.post('/rooms', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.json(newRoom);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update room by ID
router.put('/rooms/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      res.json(updatedRoom);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      res.status(404).json({ error: 'Room not found' });
    } else {
      res.json({ message: 'Room deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
