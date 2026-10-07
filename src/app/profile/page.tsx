"use client";

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEdit3,
  FiKey,
  FiLogOut,
  FiMail,
  FiSave,
  FiUser,
  FiX,
  FiXCircle,
} from 'react-icons/fi';
import { toast } from 'sonner';

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(user.name || '');
    }
  }, [user]);

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error('নাম দিন।');
      return;
    }

    if (trimmedName.length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
      return;
    }

    if (trimmedName === user?.name) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || 'নাম update করা যায়নি।');
        return;
      }

      setEditing(false);

      toast.success('নাম সফলভাবে update হয়েছে।');

      router.refresh();
    } catch (error) {
      console.error('Profile update error:', error);

      toast.error('নাম update করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEditing(false);
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error('Sign out করতে সমস্যা হয়েছে।');
        return;
      }

      toast.success('সফলভাবে Sign out হয়েছে।');

      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);

      toast.error('Sign out করতে সমস্যা হয়েছে।');
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl animate-pulse">
          <div className="h-8 w-40 rounded bg-slate-200" />

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 rounded-full bg-slate-200" />

              <div>
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-56 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="h-16 rounded-lg bg-slate-100" />
              <div className="h-16 rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiUser className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Sign in required</h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              আপনার profile দেখতে হলে আগে sign in করুন।
            </p>

            <Link
              href="/signin"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const firstLetter = user.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <main className="min-h-[70vh] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-red-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          হোমে ফিরে যান
        </Link>

        {/* Heading */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-red-600">Account</p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">My Profile</h1>

          <p className="mt-2 text-sm text-slate-500">
            আপনার BanglaNews24 account-এর তথ্য manage করুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Profile Header */}
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* User Image */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-sm">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'Profile'}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-extrabold text-white">
                    {firstLetter}
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                {editing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম"
                    disabled={saving}
                    autoFocus
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-lg font-bold text-slate-900 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100 sm:w-72"
                  />
                ) : (
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {user.name || 'ব্যবহারকারী'}
                  </h2>
                )}

                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500 sm:justify-start">
                  <FiMail className="h-4 w-4" />
                  {user.email}
                </p>

                <div className="mt-3">
                  {user.emailVerified ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      <FiCheckCircle className="h-3.5 w-3.5" />
                      Email Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                      <FiXCircle className="h-3.5 w-3.5" />
                      Email Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">Account Information</h3>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <FiEdit3 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FiUser className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">Name</p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {user.name || 'Not available'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FiMail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">Email</p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">{user.email}</p>
                </div>
              </div>

              {/* Email Status */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FiCheckCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">Email Status</p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {editing && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  <FiX className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSave className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Account Actions */}
            {!editing && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="mb-4 text-lg font-extrabold text-slate-900">Account Actions</h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/forgot-password"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <FiKey className="h-4 w-4" />
                    Change Password
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiLogOut className="h-4 w-4" />
                    {signingOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
