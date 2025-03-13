import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/Auth';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const myEventsList = [
  { start: new Date('2025-03-13 01:30'), end: new Date('2025-03-13 02:00'), title: 'This is a test event' },
];

const localizer = momentLocalizer(moment);
const MyCalendar = (props) => (
  <Calendar
    localizer={localizer}
    events={myEventsList}
    startAccessor="start"
    endAccessor="end"
    popup={true}
    style={{ height: 600 }}
  />
);

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');

    if (!storedUser || role !== 'doctor') {
      router.push('/doctor/auth/login');
    }
  }, [router]);

  return (
    <div className="flex-1 overflow-hidden ">
      <MyCalendar />
    </div>
  );
}
