/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as speakeasy from 'speakeasy';

function generateOTP() {
  const secret = speakeasy.generateSecret({ length: 20 }).base32;
  const otp = speakeasy.totp({
    secret: secret,
    encoding: 'base32',
    step: 240, // 4 minutes in seconds
    digits: 6,
  });
  return { otp, secret };
}

const { otp, secret } = generateOTP();
console.log('OTP:', otp);
console.log('Secret:', secret);

function verifyOTP(otpToCheck, secret) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: otpToCheck,
    step: 240,
    digits: 6,
    window: 0, // only valid in the current time window
  });
}

const isOTPValid = verifyOTP('123456', secret);
console.log('Is OTP valid?', isOTPValid);
