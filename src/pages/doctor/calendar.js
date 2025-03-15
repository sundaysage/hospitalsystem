import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/Auth';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import {
  ConvertHtmlTimeToTimeInMinutes,
  ConvertTimeInMinutesToHtmlTime,
  EventStyleGetter,
  GetAvailablity,
  RemoveAvailability,
  UpsertAvailability,
} from '../../../components/doctor/availability';
import { Constants } from '../../../common/constants';

Modal.setAppElement('#__next');

export default function DoctorDashboard() {
  const { user, logout, accessToken } = useAuth();
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const [availability, setAvailability] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);

  const [checkedDays, setCheckedDays] = useState({});

  const handleEventClicked = (event, element) => {
    if (event.type == Constants.calendar.eventType.availability) {
      const avail = availabilities.find((a) => a.id == event.id);
      setAvailability(avail);
      const days = {};
      for (const day of avail?.days || []) {
        days[day] = day;
      }
      setCheckedDays(days);
    } else if (event.type == Constants.calendar.eventType.appointment) {
      setEvent(events.find((e) => e.id == event.id));
    }
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleCheckboxChange = (day) => {
    setCheckedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
    setAvailability((prev) => ({
      ...prev,
      days: [...new Set(Object.keys(checkedDays))],
    }));
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');

    if (!storedUser || role !== 'doctor') {
      router.push('/doctor/auth/login');
    }

    GetAvailablity(accessToken(), logout).then((res) => {
      setAvailabilities(res.availability);
      setEvents(res.events);
    });
  }, [router]);

  return (
    <div className="flex-1 overflow-hidden ">
      <Calendar
        localizer={momentLocalizer(moment)}
        events={events}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        popup={true}
        onSelectEvent={handleEventClicked}
        style={{ height: 600 }}
        eventPropGetter={EventStyleGetter}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Availability Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg outline-none z-[1000] max-w-md w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      >
        {availability && (
          <div>
            <div className="flex justify-end">
              <button className="text-2xl" onClick={closeModal}>
                X
              </button>
            </div>

            <div className="bg-gray-300 p-3 rounded-md">
              <div className="flex justify-between mt-3 mb-3 ">
                <div>
                  From:{' '}
                  <input
                    type="time"
                    step={900}
                    className="p-1 ml-1 rounded-md"
                    value={ConvertTimeInMinutesToHtmlTime(availability.startTimeInMinutes)}
                    onChange={(evt) => {
                      setAvailability((prev) => ({
                        ...prev,
                        start: evt.target.value,
                        startTimeInMinutes: ConvertHtmlTimeToTimeInMinutes(evt.target.value),
                      }));
                    }}
                  />
                </div>
                <div>
                  To:
                  <input
                    type="time"
                    step={900}
                    className="p-1 ml-1 rounded-md"
                    value={ConvertTimeInMinutesToHtmlTime(availability.endTimeInMinutes)}
                    onChange={(evt) => {
                      setAvailability((prev) => ({
                        ...prev,
                        end: evt.target.value,
                        endTimeInMinutes: ConvertHtmlTimeToTimeInMinutes(evt.target.value),
                      }));
                    }}
                  />
                </div>
              </div>

              <div>
                {Constants.calendar.days.map((day, index) => (
                  <li key={day} className="flex items-center">
                    <input
                      key={`input-select-${index}`}
                      type="checkbox"
                      id={day}
                      checked={checkedDays[day] || false}
                      onChange={() => handleCheckboxChange(day)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={day} className="ml-3 text-lg text-gray-700 cursor-pointer">
                      {day.toLowerCase()}
                    </label>
                  </li>
                ))}
              </div>
            </div>

            <div className="flex justify-around mt-3">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove availability')) {
                    RemoveAvailability(accessToken(), availability.id, logout).then((res) => {
                      setAvailabilities(res.availability);
                      setEvents(res.events);
                      closeModal();
                    });
                  }
                }}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Remove
              </button>
              <button
                className="bg-green-600 text-white p-2 rounded-md"
                onClick={() => {
                  UpsertAvailability(
                    accessToken(),
                    availability?.id,
                    {
                      start: availability.start,
                      end: availability.end,
                      days: Object.keys(checkedDays),
                    },
                    logout
                  ).then((res) => {
                    if (res.availability && res.events) {
                      setAvailabilities(res.availability);
                      setEvents(res.events);
                      closeModal()
                    }
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex justify-end p-4 fixed w-full bottom-0">
        <div className="flex justify-center items-center w-10 h-10 rounded-3xl bg-green-700">
          <button
            className="text-white text-2xl"
            onClick={() => {
              setAvailability({
                startTimeInMinutes: 750,
                endTimeInMinutes: 885,
                start: '12:30',
                end: '14:45',
                days: [],
              });
              setCheckedDays({});
              openModal();
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
