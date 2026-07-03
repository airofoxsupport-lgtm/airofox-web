import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, name, type } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const isSmtpConfigured = smtpHost && smtpPort && smtpUser && smtpPass;

    let emailSent = false;
    let errorDetails = '';

    if (isSmtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || '587'),
          secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const subject = type === 'register' 
          ? 'Verify your AiroFox Account' 
          : 'Reset your AiroFox Password';

        const titleText = type === 'register'
          ? 'Confirm your Registration'
          : 'Password Reset Request';

        const bodyHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; rounded-corners: 16px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #0F172A; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">AiroFox</h2>
              <p style="color: #64748B; font-size: 14px; margin-top: 5px;">Home Services in Mumbai</p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 25px;" />
            
            <p style="color: #334155; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Hello ${name || 'Valued Customer'},
            </p>
            
            <p style="color: #334155; font-size: 15px; line-height: 1.5; margin-bottom: 25px;">
              You requested a verification code for your AiroFox account. Please use the following One-Time Password (OTP) to complete your ${type === 'register' ? 'registration' : 'password reset'}:
            </p>
            
            <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 25px;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #FF7A00; font-family: monospace;">${otp}</span>
              <p style="color: #94A3B8; font-size: 12px; margin-top: 10px; margin-bottom: 0;">This code is valid for 10 minutes. Do not share this OTP with anyone.</p>
            </div>
            
            <p style="color: #64748B; font-size: 13px; line-height: 1.5; margin-bottom: 25px;">
              If you did not initiate this request, please ignore this email or contact support if you suspect unauthorized access.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 20px;" />
            
            <div style="text-align: center; color: #94A3B8; font-size: 12px;">
              <p style="margin: 0;">&copy; 2026 AiroFox Home Services. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">Mumbai, Maharashtra, India</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"AiroFox Support" <${smtpUser}>`,
          to: email,
          subject: subject,
          html: bodyHtml,
        });

        emailSent = true;
      } catch (err: any) {
        console.error('SMTP send failed:', err);
        errorDetails = err.message || 'SMTP sending failed';
      }
    }

    // Always log OTP in terminal for local testing
    console.log(`\n==========================================\n[OTP DEBUG] Sent to: ${email}\nAction Type: ${type}\nOTP Code: ${otp}\n==========================================\n`);

    return NextResponse.json({
      success: true,
      otp: otp, // In development, return the OTP so the frontend can show it in a toast/banner
      emailSent: emailSent,
      devMode: !emailSent,
      errorDetails: errorDetails
    });
  } catch (error: any) {
    console.error('Send OTP API error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
