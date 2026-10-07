import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

import { verificationEmail } from '@/lib/email-templates/verification-email';
import { resetPasswordEmail } from './email-templates/reset-password-email';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('news24');

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: 'BanglaNews24 <onboarding@resend.dev>',
        to: user.email,
        subject: 'পাসওয়ার্ড রিসেট করুন — BanglaNews24',
        html: resetPasswordEmail({
          userName: user.name || 'ব্যবহারকারী',
          resetUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: 'BanglaNews24 <onboarding@resend.dev>',
        to: user.email,
        subject: 'আপনার ইমেইল ভেরিফাই করুন — BanglaNews24',

        html: verificationEmail({
          userName: user.name || 'ব্যবহারকারী',
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 24 * 7 * 3600, // 7 days in seconds
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: () => ({
        emailVerified: false,
      }),
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});