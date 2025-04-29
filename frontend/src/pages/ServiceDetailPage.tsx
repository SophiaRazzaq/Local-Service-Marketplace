import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, createBooking } from '../services/api';
import { Service, Booking } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import ServiceHeader from '../components/services/ServiceHeader';
import ServiceDetails from '../components/services/ServiceDetails';
import ServiceProviderInfo from '../components/services/ServiceProviderInfo';
import BookingForm from '../components/bookings/BookingForm';
import ReviewsSection from '../components/reviews/ReviewsSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(id!);
        setService(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBookingSubmit = async (bookingData: Partial<Booking>) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const booking = await createBooking({
        serviceId: id!,
        ...bookingData,
      });
      toast.success('Booking created successfully!');
      setShowBookingForm(false);
      navigate('/bookings');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!service) return <div className="text-center py-10">Service not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <ServiceHeader service={service} />
          <ServiceDetails service={service} />
          <ReviewsSection providerId={service.provider._id} />
        </div>
        <div className="mt-8 lg:mt-0 lg:col-span-1">
          <ServiceProviderInfo provider={service.provider} />
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Price</h3>
            <div className="mt-2">
              <p className="text-3xl font-semibold text-indigo-600">
                ${service.price}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  / {service.pricingUnit}
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowBookingForm(true)}
              className="mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Book Service</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <BookingForm
                service={service}
                onSubmit={handleBookingSubmit}
                onCancel={() => setShowBookingForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;