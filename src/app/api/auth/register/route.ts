
// File: app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb'; // Adjust the path as necessary
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword , username , role : 'admin' });
    await newUser.save();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          username: newUser.username,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
