require('dotenv').config();
const mongoose = require('mongoose');
const Dentist = require('./models/Dentist');

const dentists = [
  {
    name: "Dr. Arpit Smith",
    photo: "https://images.unsplash.com/photo-1661443940692-c3b1a66c80ad?q=80&w=800&auto=format&fit=crop",
    qualification: "DDS, MD",
    yearsOfExperience: 12,
    clinicName: "Downtown Dental",
    address: "123 Main St",
    location: "Mumbai"
  },
  {
    name: "Dr. Jane Doe",
    photo: "https://images.unsplash.com/photo-1681967053996-4275be0191e7?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS, MDS",
    yearsOfExperience: 8,
    clinicName: "City Clinic",
    address: "456 Park Ave",
    location: "Bangalore"
  },
  {
    name: "Dr. Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1614579093335-b6ab37ddaace?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 15,
    clinicName: "Smile Dental Care",
    address: "789 MG Road",
    location: "Mumbai"
  },
  {
    name: "Dr. Priya Sharma",
    photo: "https://images.unsplash.com/photo-1661777828441-986ac014eb74?q=80&w=800&auto=format&fit=crop",
    qualification: "MDS - Orthodontics",
    yearsOfExperience: 6,
    clinicName: "Bright Smiles",
    address: "101 Jubilee Hills",
    location: "Hyderabad"
  },
  {
    name: "Dr. Amit Patel",
    photo: "https://images.unsplash.com/photo-1661578889263-95a818568c3e?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS, MDS",
    yearsOfExperience: 10,
    clinicName: "Patel Dental Clinic",
    address: "202 Satellite Road",
    location: "Ahmedabad"
  },
  {
    name: "Dr. Sneha Reddy",
    photo: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 4,
    clinicName: "Healthy Gums",
    address: "303 Indira Nagar",
    location: "Bangalore"
  },
  {
    name: "Dr. Vikram Singh",
    photo: "https://images.unsplash.com/photo-1683121366070-5ceb7e007a97?q=80&w=800&auto=format&fit=crop",
    qualification: "DDS, PhD",
    yearsOfExperience: 20,
    clinicName: "Singhs Advanced Dental",
    address: "404 DLF Phase 3",
    location: "Delhi"
  },
  {
    name: "Dr. Anjali Gupta",
    photo: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 7,
    clinicName: "The Dental Hub",
    address: "505 Koregaon Park",
    location: "Pune"
  },
  {
    name: "Dr. Rahul Verma",
    photo: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d?q=80&w=800&auto=format&fit=crop",
    qualification: "MDS - Oral Surgery",
    yearsOfExperience: 11,
    clinicName: "Verma Specialty Dental",
    address: "606 Salt Lake",
    location: "Kolkata"
  },
  {
    name: "Dr. Meera Iyer",
    photo: "https://images.unsplash.com/photo-1706565029539-d09af5896340?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS, MDS",
    yearsOfExperience: 9,
    clinicName: "Iyer Dental Studio",
    address: "707 Adyar",
    location: "Chennai"
  },
  {
    name: "Dr. Kunal Shah",
    photo: "https://images.unsplash.com/photo-1758691463626-0ab959babe00?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 14,
    clinicName: "Shah Dental Care",
    address: "808 Marine Drive",
    location: "Mumbai"
  },
  {
    name: "Dr. Lisa Ray",
    photo: "https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?q=80&w=800&auto=format&fit=crop",
    qualification: "MDS - Endodontics",
    yearsOfExperience: 18,
    clinicName: "Ray Smile Center",
    address: "909 Banjara Hills",
    location: "Hyderabad"
  },
  {
    name: "Dr. Arjun Kapoor",
    photo: "https://images.unsplash.com/photo-1612636322033-f48f76c34bab?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 3,
    clinicName: "Kapoor Family Dental",
    address: "121 Koramangala",
    location: "Bangalore"
  },
  {
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    qualification: "DDS",
    yearsOfExperience: 16,
    clinicName: "Global Dental",
    address: "343 Connaught Place",
    location: "Delhi"
  },
  {
    name: "Dr. Ravi Teja",
    photo: "https://images.unsplash.com/photo-1674775372058-c4c8813c6611?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS, MDS",
    yearsOfExperience: 5,
    clinicName: "Teja Multi-specialty",
    address: "565 Hitech City",
    location: "Hyderabad"
  },
  {
    name: "Dr. Elena Gilbert",
    photo: "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?q=80&w=800&auto=format&fit=crop",
    qualification: "BDS",
    yearsOfExperience: 2,
    clinicName: "Elena's Dental Care",
    address: "222 Boat Club",
    location: "Pune"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Dentist.deleteMany({});
    await Dentist.insertMany(dentists);
    console.log('Successfully seeded 16 dentists with unique profile pictures!');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();