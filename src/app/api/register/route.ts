import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 * @description Handles POST requests to /api/register
 *
 * @param {any} request - The request object
 *
 * @returns {NextResponse} - The response object
 *
 * @throws {NextResponse} - If the email or password is missing/invalid
 * @throws {NextResponse} - If the user already exists
 * @throws {NextResponse} - If there's an error creating the user
 */
export const POST = async (request: any) => {
    console.log("first")
    const {email, password} = await request.json();
    console.log("second")
    if(!email || !email.includes('@') || !password || password.length < 7) {
        return new NextResponse('Email and password are required', {status: 400});

    }

    await connect();

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return new NextResponse('User already exists', {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        return new NextResponse('User created successfully', {status: 200});
    } catch (err: any) {
        return new NextResponse(err, {status: 500})
    }
}