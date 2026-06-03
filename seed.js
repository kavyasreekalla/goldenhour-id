require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const { encrypt } = require('./utils/encrypt');

const fakePatients = [
  {
    name: "Rahul Krishnan",
    data: {
      bloodGroup: "O+",
      age: 22,
      weight: "68 kg",
      allergies: "Penicillin",
      conditions: "None",
      emergencyContact1: "+91 98765 43210",
      emergencyContact2: "+91 91234 56789"
    }
  },
  {
    name: "Priya Sharma",
    data: {
      bloodGroup: "A+",
      age: 27,
      weight: "54 kg",
      allergies: "Sulfa drugs",
      conditions: "Type 1 Diabetes — carries insulin",
      emergencyContact1: "+91 99887 76655",
      emergencyContact2: "+91 98765 11223"
    }
  },
  {
    name: "Arjun Mehta",
    data: {
      bloodGroup: "B-",
      age: 19,
      weight: "72 kg",
      allergies: "Aspirin",
      conditions: "Asthmatic — uses inhaler",
      emergencyContact1: "+91 97654 32109",
      emergencyContact2: "+91 96543 21098"
    }
  },
  {
    name: "Yashika Menon",
    data: {
      bloodGroup: "AB+",
      age: 34,
      weight: "61 kg",
      allergies: "Latex",
      conditions: "Pacemaker installed — avoid defibrillation",
      emergencyContact1: "+91 95432 10987",
      emergencyContact2: "+91 94321 09876"
    }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    await Patient.deleteMany({});
    console.log('Cleared existing records...');

    for (const patient of fakePatients) {
      const encryptedData = encrypt(JSON.stringify(patient.data));
      await Patient.create({
        name: patient.name,
        encryptedData: encryptedData
      });
      console.log(`Seeded: ${patient.name}`);
    }

    console.log('All fake patients seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();