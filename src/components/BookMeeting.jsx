import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, MessageCircle, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

const BookMeeting = () => {
  // Component state
  const [selectedDate, setSelectedDate] = useState(null);
  const [timezone, setTimezone] = useState('UTC');
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Debug state
  const [debugLogs, setDebugLogs] = useState([]);
  const [showDebug, setShowDebug] = useState(true);

  // Debug function
  const addDebugLog = (message, type = 'info', data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      message,
      type, // 'info', 'success', 'error', 'warning'
      data: data ? JSON.stringify(data, null, 2) : null
    };
    setDebugLogs(prev => [...prev.slice(-9), logEntry]); // Keep last 10 logs
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`, data || '');
  };

  // Backend API URL
  const API_BASE_URL = 'https://hasanweb-calender.onrender.com/api';

  // Limited timezone options
  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/Los_Angeles', label: 'PDT' },
    { value: 'America/New_York', label: 'EST' },
    { value: 'Asia/Dhaka', label: 'Bangladesh Time (BD)' }
  ];

  // Set default timezone to Bangladesh
  useEffect(() => {
    setTimezone('Asia/Dhaka');
  }, []);

  // Fetch booked slots from backend
  const fetchBookedSlots = async (startDate, endDate) => {
    try {
      addDebugLog('Fetching booked slots...', 'info');
      const response = await fetch(
        `${API_BASE_URL}/booked-slots?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      
      addDebugLog(`API Response Status: ${response.status}`, 'info');
      
      if (response.ok) {
        const data = await response.json();
        addDebugLog(`Fetched ${data.bookedSlots?.length || 0} booked slots`, 'success', data);
        setBookedSlots(data.bookedSlots || []);
      } else {
        const errorText = await response.text();
        addDebugLog('Failed to fetch booked slots', 'error', { status: response.status, error: errorText });
        setBookedSlots([]);
      }
    } catch (error) {
      addDebugLog('Network error fetching booked slots', 'error', error.message);
      setBookedSlots([]);
    }
  };

  // Helper function to check if a day is available (Mon-Sat, minimum 2 days from today)
  const isDayAvailable = (date) => {
    const dayOfWeek = date.getDay();
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);
    
    const available = dayOfWeek >= 1 && dayOfWeek <= 6 && date >= minDate;
    if (!available && dayOfWeek === 0) {
      addDebugLog(`Date ${date.toDateString()} unavailable: Sunday`, 'warning');
    }
    return available;
  };

  // Helper function to check if a time slot is in unavailable hours (4 AM to 12 PM Bangladesh time)
  const isUnavailableHour = (hour) => {
    return hour >= 4 && hour < 12;
  };

  // Generate time slots for a given date in Bangladesh time
  const generateSlotsForDate = (date) => {
    if (!date || !isDayAvailable(date)) {
      addDebugLog('Cannot generate slots for unavailable date', 'warning');
      return [];
    }

    const slots = [];
    const dateStr = date.toISOString().split('T')[0];
    
    addDebugLog(`Generating slots for ${dateStr} in timezone ${timezone}`, 'info');
    
    for (let hour = 0; hour < 24; hour++) {
      // Create slot time in Bangladesh timezone first
      const slotTime = new Date(`${dateStr}T${hour.toString().padStart(2, '0')}:00:00`);
      
      // Convert to UTC for backend storage
      let utcTime;
      if (timezone === 'Asia/Dhaka') {
        // Bangladesh is UTC+6
        utcTime = new Date(slotTime.getTime() - (6 * 60 * 60 * 1000));
      } else {
        // For other timezones, use as-is for now
        utcTime = slotTime;
      }
      
      const isUnavailable = isUnavailableHour(hour);
      const isBooked = bookedSlots.includes(utcTime.toISOString());
      const isPast = utcTime <= new Date();
      
      slots.push({
        startUTC: utcTime.toISOString(),
        displayTime: formatTimeInTimezone(slotTime, timezone),
        hour: hour,
        isUnavailable: isUnavailable,
        isBooked: isBooked,
        isPast: isPast,
        isSelectable: !isUnavailable && !isBooked && !isPast
      });
    }

    addDebugLog(`Generated ${slots.length} slots, ${slots.filter(s => s.isSelectable).length} selectable`, 'success');
    return slots;
  };

  // Format time in a specific timezone
  const formatTimeInTimezone = (date, tz) => {
    try {
      if (tz === 'Asia/Dhaka') {
        // Handle Bangladesh timezone manually
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      }
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(new Date(date));
    } catch (error) {
      addDebugLog('Error formatting time', 'error', { date, tz, error: error.message });
      return new Date(date).toLocaleTimeString();
    }
  };

  // Format date for display
  const formatDateDisplay = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Handle date selection
  const handleDateSelect = async (date) => {
    if (isDayAvailable(date)) {
      addDebugLog(`Date selected: ${date.toDateString()}`, 'info');
      setSelectedDate(date);
      setSelectedSlot(null);
      setSuccess(false);
      setError('');
      
      // Fetch booked slots for the selected month
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      await fetchBookedSlots(startOfMonth, endOfMonth);
    } else {
      addDebugLog(`Date not available: ${date.toDateString()}`, 'warning');
    }
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    if (slot.isSelectable) {
      addDebugLog(`Time slot selected: ${slot.displayTime} (UTC: ${slot.startUTC})`, 'info');
      setSelectedSlot(slot);
    } else {
      addDebugLog(`Slot not selectable: ${slot.displayTime}`, 'warning');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedSlot || !form.name || !form.email) {
      const errorMsg = 'Please fill in all required fields and select a time slot.';
      setError(errorMsg);
      addDebugLog(errorMsg, 'error');
      return;
    }

    addDebugLog('Starting booking submission...', 'info');
    setLoading(true);
    setError('');

    const bookingData = {
      name: form.name,
      email: form.email,
      message: form.message,
      startTime: selectedSlot.startUTC,
      timezone: timezone
    };

    addDebugLog('Booking data prepared', 'info', bookingData);

    try {
      const response = await fetch(`${API_BASE_URL}/book-meeting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      addDebugLog(`Booking API response status: ${response.status}`, 'info');

      const data = await response.json();
      addDebugLog('Booking API response received', 'info', data);

      if (response.ok) {
        // Add to booked slots locally
        setBookedSlots(prev => [...prev, selectedSlot.startUTC]);
        
        // Reset form
        setForm({ name: '', email: '', message: '' });
        setSelectedSlot(null);
        setSuccess(true);
        addDebugLog('Booking successful!', 'success', data);
        
        // Refresh booked slots
        const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        await fetchBookedSlots(startOfMonth, endOfMonth);
      } else {
        const errorMsg = data.error || 'Failed to book meeting';
        setError(errorMsg);
        addDebugLog('Booking failed', 'error', data);
      }

    } catch (err) {
      const errorMsg = 'Network error during booking. Please check your connection.';
      setError(errorMsg);
      addDebugLog('Network error during booking', 'error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle go back to calendar
  const handleGoBack = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setSuccess(false);
    setError('');
    addDebugLog('Returned to calendar view', 'info');
  };

  // Update slots when date, timezone, or booked slots change
  useEffect(() => {
    if (selectedDate) {
      addDebugLog('Regenerating slots due to state change', 'info');
      setSlots(generateSlotsForDate(selectedDate));
    }
  }, [selectedDate, timezone, bookedSlots]);

  // Fetch initial booked slots for current month
  useEffect(() => {
    const fetchInitialData = async () => {
      addDebugLog('Fetching initial data on component mount', 'info');
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      await fetchBookedSlots(startOfMonth, endOfMonth);
    };
    
    fetchInitialData();
  }, []);

  const calendarDays = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e5e7eb]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12 py-8">
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-4">Schedule A Meeting</h1>
          <p className="text-[#9ca3af] text-lg">Book an hour meeting session</p>
        </div>

        {/* Debug Console */}
        {showDebug && (
          <div className="mb-6 bg-[#1f2937] border border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-[#e5e7eb]">Debug Console</h3>
              <button
                onClick={() => setShowDebug(false)}
                className="text-xs text-[#9ca3af] hover:text-[#e5e7eb] px-2 py-1 rounded"
              >
                Hide Debug
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 text-xs font-mono">
              {debugLogs.map((log, index) => (
                <div key={index} className={`flex gap-2 p-2 rounded ${
                  log.type === 'error' ? 'bg-red-900/20 text-red-400' :
                  log.type === 'success' ? 'bg-green-900/20 text-green-400' :
                  log.type === 'warning' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-gray-800/50 text-gray-300'
                }`}>
                  <span className="text-[#9ca3af]">[{log.timestamp}]</span>
                  <span>{log.message}</span>
                  {log.data && (
                    <details className="ml-2">
                      <summary className="cursor-pointer text-[#60a5fa]">Data</summary>
                      <pre className="mt-1 text-xs whitespace-pre-wrap text-[#9ca3af]">{log.data}</pre>
                    </details>
                  )}
                </div>
              ))}
              {debugLogs.length === 0 && (
                <div className="text-[#9ca3af] text-center py-4">No debug logs yet</div>
              )}
            </div>
          </div>
        )}

        {!showDebug && (
          <button
            onClick={() => setShowDebug(true)}
            className="mb-4 text-xs text-[#60a5fa] hover:text-[#38bdf8] underline"
          >
            Show Debug Console
          </button>
        )}

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column: Calendar or Time Selection (60%) */}
          <div className="w-[60%] pr-4">
            
            {/* Show Calendar when no date selected */}
            {!selectedDate && (
              <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={async () => {
                      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
                      setCurrentMonth(newMonth);
                      const startOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
                      const endOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0);
                      await fetchBookedSlots(startOfMonth, endOfMonth);
                    }}
                    className="p-2 hover:bg-[#0d0d0d] rounded-lg transition-colors text-[#e5e7eb]"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h3 className="text-xl font-semibold text-[#e5e7eb]">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={async () => {
                      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
                      setCurrentMonth(newMonth);
                      const startOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
                      const endOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0);
                      await fetchBookedSlots(startOfMonth, endOfMonth);
                    }}
                    className="p-2 hover:bg-[#0d0d0d] rounded-lg transition-colors text-[#e5e7eb]"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-[#9ca3af] p-3">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    const isAvailable = isDayAvailable(day);
                    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                    const isToday = day.toDateString() === new Date().toDateString();
                    const isSunday = day.getDay() === 0;

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(day)}
                        disabled={!isCurrentMonth || !isAvailable}
                        className={`
                          h-14 w-14 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                          ${!isCurrentMonth ? 'text-[#6b7280] cursor-not-allowed' : ''}
                          ${isSunday && isCurrentMonth ? 'text-red-500 cursor-not-allowed' : ''}
                          ${isCurrentMonth && !isAvailable && !isSunday ? 'text-[#6b7280] cursor-not-allowed' : ''}
                          ${isCurrentMonth && isAvailable && !isSelected ? 'text-[#e5e7eb] hover:bg-[#0d0d0d] ring-2 ring-[#6366f1] hover:ring-[#38bdf8]' : ''}
                          ${isSelected ? 'bg-[#6366f1] text-white ring-2 ring-[#38bdf8]' : ''}
                          ${isToday && !isSelected ? 'bg-[#0d0d0d] ring-1 ring-[#9ca3af]' : ''}
                        `}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-xs text-center text-[#9ca3af]">
                  * Minimum 2 days advance booking required
                </div>
              </div>
            )}

            {/* Show Time Selection when date is selected */}
            {selectedDate && (
              <div className="space-y-6">
                {/* Go Back Link */}
                <button
                  onClick={handleGoBack}
                  className="flex items-center gap-2 text-[#38bdf8] hover:text-[#6366f1] transition-colors text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Go Back to Calendar
                </button>

                {/* Selected Date Display */}
                <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-[#e5e7eb] text-center">
                    {formatDateDisplay(selectedDate)}
                  </h3>
                </div>

                {/* Timezone Selector */}
                <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700">
                  <label className="block text-sm font-medium text-[#e5e7eb] mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => {
                      setTimezone(e.target.value);
                      addDebugLog(`Timezone changed to: ${e.target.value}`, 'info');
                    }}
                    className="w-full bg-[#0d0d0d] border border-gray-600 rounded-lg px-4 py-3 text-[#e5e7eb] focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-colors"
                  >
                    {timezoneOptions.map(tz => (
                      <option key={tz.value} value={tz.value} className="bg-[#0d0d0d]">{tz.label}</option>
                    ))}
                  </select>
                </div>

                {/* Available Time Slots */}
                <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-[#e5e7eb] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#6366f1]" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                    {slots.map((slot, index) => {
                      let buttonClass = "p-3 text-sm font-medium rounded-lg border transition-all duration-200 ";
                      
                      if (slot.isUnavailable) {
                        buttonClass += "bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed";
                      } else if (slot.isBooked) {
                        buttonClass += "bg-red-900 text-red-400 border-red-700 cursor-not-allowed";
                      } else if (slot.isPast) {
                        buttonClass += "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed";
                      } else if (selectedSlot?.startUTC === slot.startUTC) {
                        buttonClass += "bg-[#6366f1] text-white border-[#6366f1] ring-2 ring-[#38bdf8]";
                      } else {
                        buttonClass += "bg-[#0d0d0d] text-[#e5e7eb] border-gray-600 hover:border-[#38bdf8] hover:bg-[#1f2937]";
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!slot.isSelectable}
                          className={buttonClass}
                        >
                          {slot.displayTime}
                        </button>
                      );
                    })}
                  </div>
                  
                  {slots.length === 0 && (
                    <p className="text-[#9ca3af] text-center py-8">No available time slots for this date.</p>
                  )}
                  
                  {/* Legend */}
                  <div className="mt-4 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-600 rounded"></div>
                      <span className="text-[#9ca3af]">Unavailable (4 AM - 12 PM BD Time)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-900 rounded"></div>
                      <span className="text-[#9ca3af]">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#6366f1] rounded"></div>
                      <span className="text-[#9ca3af]">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Form (40%) */}
          <div className="w-[40%] pl-4">
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700 space-y-4">
              <h3 className="text-xl font-semibold text-[#e5e7eb] mb-4">Booking Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#0d0d0d] border border-gray-600 rounded-lg px-4 py-3 text-[#e5e7eb] focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#0d0d0d] border border-gray-600 rounded-lg px-4 py-3 text-[#e5e7eb] focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-[#0d0d0d] border border-gray-600 rounded-lg px-4 py-3 text-[#e5e7eb] focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-colors resize-none"
                  placeholder="Any specific topics you'd like to discuss?"
                />
              </div>

              {/* Selected Time Display */}
              {selectedSlot && (
                <div className="bg-[#0d0d0d] border border-[#6366f1]/30 rounded-lg p-4">
                  <p className="text-sm text-[#e5e7eb]">
                    <strong className="text-[#6366f1]">Selected:</strong> {formatDateDisplay(selectedDate)} at {selectedSlot.displayTime}
                    <br />
                    <span className="text-xs text-[#9ca3af]">Timezone: {timezone}</span>
                    <br />
                    <span className="text-xs text-[#9ca3af]">UTC Time: {selectedSlot.startUTC}</span>
                  </p>
                </div>
              )}

              {/* Error and Success Messages */}
              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-400 text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>Meeting booked successfully! Confirmation emails have been sent.</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !selectedSlot}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-4 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Booking Meeting...' : 'Schedule Meeting'}
              </button>

              {/* Instructions */}
              {!selectedDate && (
                <div className="text-center pt-4 border-t border-gray-600 mt-6">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-[#9ca3af]" />
                  <p className="text-[#9ca3af] text-sm">Select a date from the calendar to continue</p>
                </div>
              )}

              {selectedDate && !selectedSlot && (
                <div className="text-center pt-4 border-t border-gray-600 mt-6">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-[#9ca3af]" />
                  <p className="text-[#9ca3af] text-sm">Select a time slot to complete your booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMeeting;