import { Constants } from '../../common/constants';

export function EventStyleGetter(event, start, end, isSelected) {
  let style = {
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block',
  };

  if (event.type === Constants.calendar.eventType.availability) {
    style.backgroundColor = 'rgb(50, 200, 50)';
  } else if (event.type === Constants.calendar.eventType.appointment) {
    style.backgroundColor = 'rgb(50, 50, 200)';
  }

  return { style };
}

function ProcessEvents(events, isAvailability) {
  const _events = [];

  for (const { startTimeInMinutes, endTimeInMinutes, days, id } of events) {
    const startHour = PadTimeDigit(Math.floor(startTimeInMinutes / 60));
    const startMinute = PadTimeDigit(startTimeInMinutes % 60);
    const endHour = PadTimeDigit(Math.floor(endTimeInMinutes / 60));
    const endMinute = PadTimeDigit(endTimeInMinutes % 60);

    const { oneYearAgo, oneYearLater } = GetYearRange();
    const dayInMilliseconds = 1000 * 3600 * 24;
    for (let i = oneYearAgo; i <= oneYearLater; i += dayInMilliseconds) {
      const today = new Date(i);
      for (const day of days) {
        if (today.getDay() == Constants.calendar.days.indexOf(day)) {
          const [_day] = today.toISOString().split('T');
          _events.push({
            index: i,
            id: id,
            start: new Date(`${_day}T${startHour}:${startMinute}`),
            end: new Date(`${_day}T${endHour}:${endMinute}`),
            title: '',
            type: isAvailability ? Constants.calendar.eventType.availability : Constants.calendar.eventType.appointment,
          });
        }
      }
    }
  }
  return { events: _events, ...(isAvailability && { availability: events }) };
}

export async function GetAvailablity(accessToken, logout) {
  const rawRes = await fetch(`${Constants.url.baseurl}/doctor/appointment/availability`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });

  const res = await rawRes.json();
  if (res.statusCode == 401) {
    await logout('doctor');
  } else if (`${res.statusCode}`[0] == 4) {
    window.alert(res?.message?.join(',') || res?.message);
  }

  if (res.data) {
    return res.data ? ProcessEvents(res.data, true) : { events: [], availability: [] };
  }

  if (!res.data) {
    throw Error('Something When Wrong');
  }
}

export async function RemoveAvailability(accessToken, id, logout) {
  const rawRes = await fetch(`${Constants.url.baseurl}/doctor/appointment/availability/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });

  const res = await rawRes.json();
  if (res.statusCode == 401) {
    await logout('doctor');
  } else if (`${res.statusCode}`[0] == 4) {
    window.alert(res?.message instanceof Array ? res?.message?.join(',') : res?.message);
  }

  if (res.data == '') {
    return await GetAvailablity(accessToken, logout);
  }
}

export async function UpsertAvailability(accessToken, id, payload, logout) {
  const rawRes = id
    ? await fetch(`${Constants.url.baseurl}/doctor/appointment/availability/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      })
    : await fetch(`${Constants.url.baseurl}/doctor/appointment/availability`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      });

  const res = await rawRes.json();
  if (res.statusCode == 401) {
    await logout('doctor');
  } else if (`${res.statusCode}`[0] == 4) {
    window.alert(res?.message instanceof Array ? res?.message?.join(',') : res?.message);
  }

  return res.data ? GetAvailablity(accessToken, logout) : { events: [], availability: [] };
}

function GetYearRange() {
  const thisYear = new Date().getFullYear();

  const oneYearAgo = +new Date(`${thisYear - 1}-01-01`);
  const oneYearLater = +new Date(`${thisYear + 1}-01-01`);
  return { oneYearAgo, oneYearLater };
}

function PadTimeDigit(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

export function ConvertTimeInMinutesToHtmlTime(timeInMinutes) {
  return `${PadTimeDigit(Math.floor(timeInMinutes / 60))}:${PadTimeDigit(Math.floor(timeInMinutes % 60))}`;
}

export function ConvertHtmlTimeToTimeInMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map((num) => +num);

  return hours * 60 + minutes;
}
