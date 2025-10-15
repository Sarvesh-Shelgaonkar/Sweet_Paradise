const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedSweets } = require('./src/seeders/sweetSeeder');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB successfully!');

    console.log('🌱 Starting database seeding...');
    
    // Seed sweets
    await seedSweets();
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('📦 Your inventory should now show products in Admin Panel');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeder
seedDatabase();