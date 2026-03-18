import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, Award, LogOut, Lock, User, Eye, EyeOff, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function App() {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [view, setView] = useState('user'); // 'user' or 'admin'
  const [appointments, setAppointments] = useState([]);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [loading, setLoading] = useState(false);

  const locations = ["Mumbai", "Bangalore", "Hyderabad", "Ahmedabad", "Delhi", "Pune", "Kolkata", "Chennai"];

  useEffect(() => {
    fetchDentists();
  }, [page, location, minExperience]); // Fetch when these change

  useEffect(() => {
    if (view === 'admin' && adminToken) {
      fetchAppointments();
    }
  }, [view, adminToken]);

  const fetchDentists = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 6,
        search,
        location,
        minExperience
      });
      const response = await axios.get(`${API_URL}/dentists?${params.toString()}`);
      setDentists(response.data.dentists);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching dentists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchDentists();
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        headers: { 'x-auth-token': adminToken }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleBookClick = (dentist) => {
    setSelectedDentist(dentist);
    setShowBookingForm(true);
  };

  const handleLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    setView('user');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full text-left" style={{ textAlign: 'left', display: 'block', minHeight: '100vh', width: '100vw' }}>
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">DentalCare</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('user')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'user' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Find Dentist
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Admin Panel
              </button>
              {adminToken && (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-full">
        {view === 'user' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 text-left m-0 p-0" style={{ fontSize: '1.875rem', margin: '0 0 0.5rem 0', letterSpacing: 'normal' }}>Book an Appointment</h1>
              <p className="mt-2 text-gray-600 text-left">Find the right dentist and book your visit easily.</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Name or Clinic..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Experience (Min Years)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={minExperience}
                    onChange={(e) => { setMinExperience(e.target.value); setPage(1); }}
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSearch(''); setLocation(''); setMinExperience(''); setPage(1); }}
                    className="bg-gray-100 text-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Dentist List */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dentists.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                      <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No dentists found</h3>
                      <p className="text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
                    </div>
                  ) : (
                    dentists.map((dentist) => (
                      <div key={dentist._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-start text-left">
                        <div className="h-56 bg-gray-100 overflow-hidden relative w-full border-b border-gray-100">
                          <img
                            src={dentist.photo || 'https://via.placeholder.com/400x300?text=Dentist'}
                            alt={dentist.name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Dentist'; }}
                          />
                        </div>
                        <div className="p-5 w-full flex flex-col items-start text-left">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{dentist.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-3 text-left">
                            <Award className="w-4 h-4 mr-1 text-blue-500" />
                            <span>{dentist.qualification} • {dentist.yearsOfExperience} years exp</span>
                          </div>

                          <div className="space-y-2 mb-4 w-full">
                            <div className="flex items-start text-sm text-gray-600 text-left">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                              <div className="text-left">
                                <p className="font-medium text-gray-900 m-0">{dentist.clinicName}</p>
                                <p className="m-0">{dentist.address}, {dentist.location}</p>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleBookClick(dentist)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-auto"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center space-x-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Booking Modal */}
            {showBookingForm && selectedDentist && (
              <BookingModal
                dentist={selectedDentist}
                onClose={() => setShowBookingForm(false)}
                onSuccess={() => {
                  setShowBookingForm(false);
                  alert('Appointment booked successfully!');
                }}
              />
            )}
          </>
        ) : (
          !adminToken ? (
            <AdminLogin onLogin={handleLogin} />
          ) : (
            <AdminPanel appointments={appointments} refreshData={fetchAppointments} adminToken={adminToken} />
          )
        )}
      </main>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/admin/login`, formData);
      onLogin(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
        <p className="text-gray-600 mt-2">Access the admin dashboard</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <User className="h-5 w-5" />
            </span>
            <input
              type="text"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock className="h-5 w-5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none border-0 bg-transparent cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

function BookingModal({ dentist, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    appointmentDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/appointments`, {
        ...formData,
        dentist: dentist._id
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-left">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden text-left">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold text-gray-900 m-0 p-0" style={{ fontSize: '1.25rem', letterSpacing: 'normal' }}>Book Appointment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold border-0 bg-transparent cursor-pointer">
            &times;
          </button>
        </div>

        <div className="px-6 py-4 bg-white">
          <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-sm text-left">
            <p className="font-medium text-blue-800 m-0 pb-1">Booking with {dentist.name}</p>
            <p className="text-blue-600 m-0">{dentist.clinicName}, {dentist.location}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Patient Name</label>
              <input
                type="text"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min="1" max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Appointment Date</label>
              <input
                type="datetime-local"
                name="appointmentDate"
                required
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ appointments, refreshData, adminToken }) {
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/appointments/${appointmentId}/status`,
        { status: newStatus },
        { headers: { 'x-auth-token': adminToken } }
      );
      refreshData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="text-left w-full">
      <div className="mb-8 flex justify-between items-center w-full">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 text-left m-0 p-0" style={{ fontSize: '1.875rem', margin: '0 0 0.5rem 0', letterSpacing: 'normal' }}>Admin Panel</h1>
          <p className="mt-2 text-gray-600 text-left m-0">Manage all patient appointments.</p>
        </div>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Refresh List
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointment Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dentist
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-left">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50 text-left">
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="text-sm font-medium text-gray-900 text-left">{apt.patientName}</div>
                      <div className="text-sm text-gray-500 text-left">{apt.age} yrs • {apt.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="text-sm text-gray-900 text-left">
                        {new Date(apt.appointmentDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 text-left">
                        {new Date(apt.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="text-sm font-medium text-gray-900 text-left">Dr. {apt.dentist?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500 text-left">{apt.dentist?.clinicName || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <select
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:ring-0 ${
                          apt.status === 'Booked' ? 'bg-green-100 text-green-800' :
                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          apt.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="Booked">Booked</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;