const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Sesuaikan dengan model User Anda

// Mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mendapatkan pengguna berdasarkan ID
router.get('/:nama', async (req, res) => {
  try {
    const user = await User.findOne({ nama: req.params.nama });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menambah pengguna baru
router.post('/', async (req, res) => {
  const user = new User({
    nama: req.body.nama,
    alamat: req.body.alamat,
    no_hp: req.body.no_hp
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Memperbarui pengguna berdasarkan alamat
router.put('/:nama', async (req, res) => {
  try {
    const user = await User.findOne({ nama: req.params.nama });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.nama = req.body.nama || user.nama;
    user.alamat = req.body.alamat || user.alamat;
    user.no_hp = req.body.no_hp || user.no_hp;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Menghapus pengguna berdasarkan ID
router.delete('/:nama', async (req, res) => {
  try {
    const result = await User.deleteOne({ nama: req.params.nama });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
