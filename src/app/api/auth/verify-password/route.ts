/**
 * Password Verification API Route
 *
 * Handles server-side password validation for protected case studies.
 * Password is stored securely in environment variables, never exposed to client.
 *
 * @route POST /api/auth/verify-password
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, caseId } = body;

    // Validate required fields
    if (!password || !caseId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get correct password from environment variable based on case ID
    let correctPassword: string | undefined;

    switch (caseId) {
      case '3tpm':
        correctPassword = process.env.CASE_3TPM_PASSWORD;
        break;
      // Add more cases here as needed
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid case ID' },
          { status: 400 }
        );
    }

    // Verify environment variable exists
    if (!correctPassword) {
      console.error(`Environment variable for case ${caseId} not configured`);
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Compare passwords (constant-time comparison would be ideal for production)
    const isValid = password === correctPassword;

    if (isValid) {
      return NextResponse.json(
        { success: true, message: 'Password verified' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
