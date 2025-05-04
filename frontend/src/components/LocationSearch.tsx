import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../config";

interface LocationSearchProps {
	onSelect: (address: string, location: { lat: number; lng: number }) => void;
	initialValue?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
	onSelect,
	initialValue = "",
}) => {
	const [address, setAddress] = useState(initialValue);
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
		autocompleteRef.current = autocomplete;
	};

	const onPlaceChanged = () => {
		if (autocompleteRef.current) {
			const place = autocompleteRef.current.getPlace();
			if (place.geometry?.location) {
				const location = {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				};
				onSelect(place.formatted_address || "", location);
			}
		}
	};

	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
			<Autocomplete
				onLoad={onLoad}
				onPlaceChanged={onPlaceChanged}
				fields={["formatted_address", "geometry.location"]}
			>
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Enter your address"
					className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</Autocomplete>
		</LoadScript>
	);
};

export default LocationSearch;
