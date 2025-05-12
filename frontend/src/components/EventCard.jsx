import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, PhoneCall } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 mb-1 gap-2">
        <CalendarDays className="w-4 h-4" />
        <span>{event.event_date}</span>
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
        <MapPin className="w-4 h-4" />
        <span>{event.location}</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm transition"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          View Details
        </button>

        <a
          href="tel:+1234567890"
          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
        >
          <PhoneCall className="w-4 h-4" />
          Call
        </a>
      </div>
    </div>
  );
};

export default EventCard;
