import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/Auth';
import DoctorNav from '../../../components/DoctorNav';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');

    if (!storedUser || role !== 'doctor') {
      router.push('/doctor-login'); // ✅ Redirect only if user data is missing
    }
  }, [router]);

  return (
    <>
      <div className="min-h-screen bg-[#e0f2fe] flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold text-[#075985]">Doctor Dashboard</h1>

          {user ? (
            <div className="mt-4">
              <p>
                <strong>Name:</strong> {user.firstName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Specialization:</strong> {user.specialization || 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Loading doctor info...</p>
          )}

          <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
