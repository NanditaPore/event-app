import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, MapPin, Users } from 'lucide-react';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/events/${id}/`)
      .then(res => setEvent(res.data));
  }, [id]);

  if (!event) return <div className="p-8 text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{event.title}</h1>

      {/* Event Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-teal-500" />
          <span className="text-sm sm:text-base">{event.event_date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-500" />
          <span className="text-sm sm:text-base">{event.location}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-6" />

      {/* Speakers Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-teal-500" />
          Speakers
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {event.speakers?.map((s, idx) => (
            <li key={idx}>
              <span className="font-medium">{s.name}</span> – {s.designation}, {s.company}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-8 flex justify-end">
        <a
          href="tel:+1234567890"
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md text-sm transition"
        >
          Contact Organizer
        </a>
      </div>
    </div>
  );
};

export default EventDetailsPage;
