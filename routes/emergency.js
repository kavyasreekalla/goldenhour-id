require('dotenv').config();
const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const Patient = require('../models/Patient');
const { decrypt } = require('../utils/encrypt');

// Get all patients (for homepage listing)
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find({}, 'name _id');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Generate QR code for a patient
router.get('/qr/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const url = `${req.protocol}://${req.get('host')}/emergency/view/${req.params.id}`;
    const qrDataURL = await qrcode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#D32F2F',
        light: '#FFFFFF'
      }
    });

    res.json({ qr: qrDataURL, url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// View emergency info page (what doctor sees after scanning)
router.get('/view/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send('Patient not found');

    const decrypted = JSON.parse(decrypt(patient.encryptedData));

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GoldenHourID — Emergency Info</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; background: #0D0D0D; color: #FFFFFF; padding: 20px; }
          .alert-banner { background: #D32F2F; color: white; text-align: center; padding: 12px; font-size: 14px; font-weight: bold; letter-spacing: 2px; border-radius: 8px; margin-bottom: 20px; }
          .card { background: #1A1A1A; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #D32F2F; }
          .card h3 { color: #D32F2F; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
          .card p { font-size: 22px; font-weight: bold; color: #FFFFFF; }
          .name { text-align: center; font-size: 26px; font-weight: bold; margin-bottom: 20px; color: #FFFFFF; }
          .disclaimer { text-align: center; font-size: 11px; color: #555; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="alert-banner">⚠ EMERGENCY MEDICAL INFORMATION</div>
        <div class="name">${patient.name}</div>
        <div class="card">
          <h3>Blood Group</h3>
          <p>${decrypted.bloodGroup}</p>
        </div>
        <div class="card">
          <h3>Age & Weight</h3>
          <p>${decrypted.age} years — ${decrypted.weight}</p>
        </div>
        <div class="card">
          <h3>⚠ Allergies</h3>
          <p>${decrypted.allergies}</p>
        </div>
        <div class="card">
          <h3>Medical Conditions</h3>
          <p>${decrypted.conditions}</p>
        </div>
        <div class="card">
          <h3>Emergency Contact 1</h3>
          <p>${decrypted.emergencyContact1}</p>
        </div>
        <div class="card">
          <h3>Emergency Contact 2</h3>
          <p>${decrypted.emergencyContact2}</p>
        </div>
        <div class="disclaimer">GoldenHourID — Educational Prototype. Sample data only. Not for real medical use.</div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading emergency information');
  }
});

module.exports = router;