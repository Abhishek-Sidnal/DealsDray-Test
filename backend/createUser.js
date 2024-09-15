const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function createUser() {
    const username = 'Abhishek';
    const plainPassword = 'admin123';

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createUser();
