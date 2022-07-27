const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dreamteam6:v8i612JQE3FWEBAN@project3.jwcjx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
