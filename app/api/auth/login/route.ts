import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with a secure secret key

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration
    );

    return NextResponse.json({
      message: 'Login successful.',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
