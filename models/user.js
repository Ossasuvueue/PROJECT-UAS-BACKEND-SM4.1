const mongoose = require('mongoose');

// Definisi skema untuk pengguna
const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  no_hp: {
    type: Number,
    required: true
  }
}, { collection: 'siswa' }); // Menggunakan koleksi 'pengguna'

// Membuat dan mengekspor model User
module.exports = mongoose.model('User', userSchema);
