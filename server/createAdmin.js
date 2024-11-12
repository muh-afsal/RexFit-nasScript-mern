// // createAdmin.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import User from '../server/src/model/userSchema.js';

// dotenv.config();

// const createAdminUser  = async () => {
//     try {
//         // Connect to the database
//         await mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');

//         // Check if the admin user already exists
//         const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
//         if (existingAdmin) {
//             console.log('Admin user already exists. Exiting...');
//             return;
//         }

//         // Create a new admin user
//         const hashedPassword = await bcrypt.hash('admin@123', 10);
//         const adminUser  = new User({
//             Username: 'Admin',
//             email: 'admin@gmail.com',
//             password: hashedPassword,
//             role: 'admin',
//         });

//         // Save the admin user to the database
//         await adminUser .save();
//         console.log('Admin user created successfully:', adminUser );
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//     } finally {
//         // Close the database connection
//         await mongoose.connection.close();
//     }
// };

// createAdminUser ();