import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types';
import StarRating from '../ui/StarRating';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {service.images && service.images.length > 0 ? (
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link
            to={`/services/${service._id}`}
            className="text-lg font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2"
          >
            {service.title}
          </Link>
          <div className="text-lg font-semibold text-indigo-600">
            ${service.price}
            <span className="text-xs font-normal text-gray-500 ml-1">
              / {service.pricingUnit}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <StarRating rating={service.averageRating} />
          <span className="text-gray-500 text-sm ml-1">
            ({service.totalReviews})
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{service.description}</p>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
              <span className="text-sm font-medium leading-none text-indigo-600">
                {service.provider.user.name.charAt(0)}
              </span>
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {service.provider.businessName || service.provider.user.name}
            </p>
            <p className="text-sm text-gray-500">
              {service.provider.averageRating.toFixed(1)} (
              {service.provider.totalReviews} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;