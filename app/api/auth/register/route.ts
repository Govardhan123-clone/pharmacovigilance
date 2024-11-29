import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a secure secret key

export async function POST(request: Request) {
  try {
    // Extract data from the request body
    const { name, email, password, country, company, experienceLevel, expertiseAreas } = await request.json();

    // Validate input data
    if (!name || !email || !password || !country || !experienceLevel || !expertiseAreas || expertiseAreas.length === 0) {
      return NextResponse.json({ error: 'All fields are required and expertise areas should not be empty.' }, { status: 400 });
    }

    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 400 });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        country,
        company,  // Optional field, can be null in database
        experienceLevel,
        expertiseAreas: expertiseAreas || [], // Handle the case where expertiseAreas might be empty
      },
    });

    // Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Return a success response with user data and JWT token
    return NextResponse.json({
      message: 'User registered successfully.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    // Return a generic error message with a 500 status code
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
