import React, { useState } from 'react';
import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { SearchBar } from '../components/SearchBar';
import { QuickActions } from '../components/QuickActions';
import { NotificationPanel } from '../components/NotificationPanel';
import { RegistrationForm } from '../components/RegistrationForm';
import { EventDetails } from '../components/EventDetails';
import { AuthModal } from '../components/AuthModal';
import { Calendar, Users, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const mockEvents = [
  {
    id: 1,
    title: "AI/ML Workshop by Google Developer Expert",
    date: "2025-01-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    category: "Workshop",
    organizer: "CSE Department",
    description: "Learn the fundamentals of Machine Learning with hands-on projects using TensorFlow and Google Cloud.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Campus Placement Drive - TCS",
    date: "2025-01-18",
    time: "9:00 AM",
    venue: "Placement Cell",
    category: "Placement",
    organizer: "Placement Cell",
    description: "Major recruitment drive for final year students. Bring your updated resume and dress professionally.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Hackathon 2025 - Innovation Challenge",
    date: "2025-01-22",
    time: "8:00 AM",
    venue: "Computer Lab",
    category: "Competition",
    organizer: "Technical Club",
    description: "48-hour hackathon focused on solving real-world problems. Form teams of 4 members.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Cultural Fest - Expressions 2025",
    date: "2025-01-25",
    time: "4:00 PM",
    venue: "Open Ground",
    category: "Cultural",
    organizer: "Cultural Committee",
    description: "Annual cultural festival featuring dance, music, drama, and art competitions.",
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationFormType, setRegistrationFormType] = useState<'event' | 'placement'>('event');
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const { user } = useAuth();
  const location = useLocation();

  // On mount or when the URL changes, check for ?category=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const categories = ['all', 'Workshop', 'Placement', 'Competition', 'Cultural'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { icon: Calendar, label: "Upcoming Events", value: "24", color: "text-blue-600" },
    { icon: Users, label: "Registered Students", value: "3,247", color: "text-green-600" },
    { icon: BookOpen, label: "Active Clubs", value: "18", color: "text-purple-600" }
  ];

  const handleRegisterClick = (event: any, formType: 'event' | 'placement' = 'event') => {
    setSelectedEvent(event);
    setRegistrationFormType(formType);
    setShowRegistrationForm(true);
  };

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNotificationClick={() => setShowNotifications(!showNotifications)} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-blue-200">CampusConnect</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop portal for all PSNA College events and opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/events"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View All Events
              </Link>
              {!user && (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Sign Up for Updates
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="mb-8">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Events Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Upcoming Events ({filteredEvents.length})
              </h2>
              {filteredEvents.length > 0 ? (
                <div className="grid gap-6">
                  {filteredEvents.map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onRegister={() => handleRegisterClick(event, 'event')}
                      onViewDetails={() => handleViewDetails(event)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <QuickActions />
            {showNotifications && <NotificationPanel />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CampusConnect</h3>
              <p className="text-blue-200">
                Connecting PSNA students with opportunities and events across campus.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/events" className="hover:text-white">Events Calendar</Link></li>
                <li><Link to="/clubs" className="hover:text-white">Student Clubs</Link></li>
                <li><Link to="/placements" className="hover:text-white">Placement Portal</Link></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-blue-200">
                PSNA College of Engineering and Technology<br />
                Dindigul, Tamil Nadu<br />
                campusconnect@psnacet.edu.in
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p className="text-blue-200">© 2025 CampusConnect - PSNA College. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        formType={registrationFormType}
        eventName={selectedEvent?.title || ''}
      />

      <EventDetails
        event={selectedEvent}
        isOpen={showEventDetails}
        onClose={() => setShowEventDetails(false)}
        onRegister={() => {
          setShowEventDetails(false);
          handleRegisterClick('event');
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        setMode={setAuthMode}
      />
    </div>
  );
};

export default Index;
