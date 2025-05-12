import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8000/events/')
      .then(res => setEvents(res.data));
  }, []);

  const locations = [...new Set(events.map(event => event.location))];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === "" || event.location === locationFilter)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationFilter]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-center font-extrabold text-teal-800 mb-6">Upcoming Events</h1>

      {/* Search and Location Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Locations</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      {paginatedEvents.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.map(event => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === i + 1 ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
