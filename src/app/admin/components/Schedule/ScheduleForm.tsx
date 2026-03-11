import dayjs from 'dayjs';
import { useState } from 'react';

import { LocationSearchInput } from './LocationSearchInput';
import { MapDisplay } from './MapDisplay';

interface ScheduleFormProps {
  onSubmit: (data: {
    startDate: string;
    endDate?: string;
    time: { startTime: string; endTime: string };
    location: string;
    coordinates: { lat: string; lng: string };
    phoneNumber: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    _id?: string;
    startDate: string;
    endDate?: string;
    time: { startTime: string; endTime: string };
    location: string;
    coordinates: { lat: string; lng: string };
    phoneNumber?: string;
  };
}

export function ScheduleForm({
  onSubmit,
  onCancel,
  initialData,
}: ScheduleFormProps) {
  // Format initial data using dayjs
  const initialStartDate = initialData?.startDate
    ? dayjs(initialData.startDate).format('YYYY-MM-DD')
    : '';
  const initialEndDate = initialData?.endDate
    ? dayjs(initialData.endDate).format('YYYY-MM-DD')
    : '';
  const initialStartTime = initialData?.time?.startTime
    ? dayjs(initialData.time.startTime).format('HH:mm')
    : '';
  const initialEndTime = initialData?.time?.endTime
    ? dayjs(initialData.time.endTime).format('HH:mm')
    : '';
  const initialLocation = initialData?.location || '';
  const initialCoordinates = initialData?.coordinates || { lat: '', lng: '' };
  const initialPhoneNumber = initialData?.phoneNumber || '';

  // Initialize states
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [showEndDate, setShowEndDate] = useState(!!initialEndDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [location, setLocation] = useState(initialLocation);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isLocationSelected, setIsLocationSelected] = useState(
    !!initialCoordinates.lat && !!initialCoordinates.lng,
  );

  const handleSelectLocation = (location: string, lat: string, lng: string) => {
    setLocation(location);
    setCoordinates({ lat, lng });
    setIsLocationSelected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = dayjs(
      `${startDate} ${startTime}`,
      'YYYY-MM-DD HH:mm',
    ).toISOString();
    const payload: {
      startDate: string;
      endDate?: string;
      time: { startTime: string; endTime: string };
      location: string;
      coordinates: { lat: string; lng: string };
      phoneNumber: string;
    } = {
      startDate: startDateTime,
      time: { startTime, endTime },
      location,
      coordinates,
      phoneNumber,
    };
    if (showEndDate && endDate) {
      payload.endDate = dayjs(
        `${endDate} ${startTime}`,
        'YYYY-MM-DD HH:mm',
      ).toISOString();
    }
    onSubmit(payload);
  };

  return (
    <div className='max-h-[600px] overflow-y-auto pr-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Start Date
          </label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
          />
        </div>

        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={showEndDate}
            onChange={(e) => setShowEndDate(e.target.checked)}
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label className='ml-2 block text-sm font-medium text-gray-700'>
            Add End Date
          </label>
        </div>

        {showEndDate && (
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              End Date
            </label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
            />
          </div>
        )}

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Start Time
          </label>
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            End Time
          </label>
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='+1 123-456-7890'
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border'
          />
        </div>

        <div className='relative z-10'>
          <label className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <LocationSearchInput
            onSelectLocation={handleSelectLocation}
            initialLocation={initialLocation}
          />
        </div>

        {isLocationSelected && coordinates.lat && coordinates.lng && (
          <div className='relative z-0'>
            <MapDisplay lat={coordinates.lat} lng={coordinates.lng} />
          </div>
        )}

        <div className='flex justify-end space-x-2 pt-4'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
          >
            {initialData?._id ? 'Update Schedule' : 'Save Schedule'}
          </button>
        </div>
      </form>
    </div>
  );
}
