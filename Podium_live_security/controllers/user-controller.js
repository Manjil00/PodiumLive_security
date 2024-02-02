const User = require('../models/user-Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: (req, res, next) => {
    const { username, email ,password} = req.body;

    User.findOne({ username: username })
      .then((user) => {
        if (user) return res.status(400).json({ error: 'Duplicated username!' });

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return res.status(500).json({ error: err.message });

          User.create({ username, email , password: hash, })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch(next);
        });
      })
      .catch(next);
  },

  login: (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body)

    User.findOne({ username: username })
      .then((user) => {
        if (!user) return res.status(400).json({ error: 'User is not registered' });

        bcrypt.compare(password, user.password, (err, success) => {
          if (err) return res.status(500).json({ error: err.message });
          if (!success) return res.status(400).json({ error: 'Password does not match' });

          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,


          };

          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: '1d' },
            (err, token) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json({ status: 'success', token: token });
            }
          );
        });
      })
      .catch(next);
  },

  getUserProfile: (req, res, next) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.id;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Remove sensitive data from the user object if needed
        const userProfile = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        res.json(userProfile);
      })
      .catch(next);
  },

  updateUserProfile: (req, res, next) => {
    const userId = req.user.id;
    const { username, email } = req.body;

    User.findByIdAndUpdate(userId, { username, email }, { new: true })
      .then((user) => {
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Remove sensitive data from the user object if needed
        const updatedUserProfile = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        res.json(updatedUserProfile);
      })
      .catch(next);
  },

  updateUserProfilePicture: (req, res, next) => {
    const userId = req.user.id;
    // const { profilePicture } = req.body;

    User.findByIdAndUpdate(userId,  { new: true })
      .then((user) => {
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Remove sensitive data from the user object if needed
        const updatedUserProfile = {
          id: user.id,
          username: user.username,
          email: user.email,
        //   profilePicture: user.profilePicture,
        };

        res.json(updatedUserProfile);
      })
      .catch(next);
  },
};