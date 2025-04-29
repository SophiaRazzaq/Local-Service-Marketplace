import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroSection from '../components/HeroSection';
import ServiceCategories from '../components/ServiceCategories';
import FeaturedServices from '../components/FeaturedServices';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      <HeroSection />
      <ServiceCategories />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      {!user && (
        <div className="bg-indigo-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-indigo-200">
              Join thousands of satisfied customers and service providers.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Sign up for free
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70"
                >
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;