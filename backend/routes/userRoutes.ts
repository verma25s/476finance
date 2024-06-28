// routes/userRoutes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db'; // Import the database connection

const router = express.Router();

// User registration
router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password, dob } = req.body as { username: string; email: string; password: string; dob: string };
    try {
        // Check if email already exists
        const checkUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (checkUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Insert new user
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt for hashing passwords
        db.prepare('INSERT INTO users (username, email, password_hash, dob) VALUES (?, ?, ?, ?)').run(username, email, hashedPassword, dob);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        // Retrieve user by email
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Validate password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
