'use client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

import { useSchedules } from '@/hooks/useSchedules';

import { ScheduleForm } from './ScheduleForm';
import { Modal } from '../Modal';

import { ISchedule, SchedulePayload } from '@/types/schedule';
dayjs.extend(utc);
export function Schedule() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } =
    useSchedules();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ISchedule | null>(
    null,
  );

  const handleAddSchedule = (data: {
    startDate: string;
    endDate?: string;
    time: { startTime: string; endTime: string };
    location: string;
    coordinates: { lat: string; lng: string };
    phoneNumber: string; // Added phone number
  }) => {
    const payload: SchedulePayload = {
      ...data,
      endDate: data.endDate || null,
    };
    addSchedule(payload);
    setIsAddModalOpen(false);
  };

  const handleUpdateSchedule = (data: {
    startDate: string;
    endDate?: string;
    time: { startTime: string; endTime: string };
    location: string;
    coordinates: { lat: string; lng: string };
    phoneNumber: string; // Added phone number
  }) => {
    if (editingSchedule) {
      const payload: SchedulePayload = {
        ...data,
        endDate: data.endDate || null,
      };
      updateSchedule({ id: editingSchedule._id, payload });
      setEditingSchedule(null);
    }
  };

  const handleEditClick = (schedule: ISchedule) => {
    setEditingSchedule(schedule);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      deleteSchedule(id);
    }
  };

  // Function to format the date range
  const formatDate = (startDate?: string, endDate?: string | null) => {
    if (!startDate) return 'No date provided';
    try {
      const parsedStartDate = dayjs.utc(startDate); // Parse as UTC
      if (!parsedStartDate.isValid()) return 'Invalid start date';
      const startFormatted = parsedStartDate.local().format('MMMM D, YYYY'); // Convert to local time
      if (!endDate) return startFormatted;

      const parsedEndDate = dayjs.utc(endDate); // Parse as UTC
      if (!parsedEndDate.isValid()) return startFormatted;
      return `${startFormatted} - ${parsedEndDate.local().format('MMMM D, YYYY')}`; // Convert to local time
    } catch (e) {
      console.error('Date parsing error:', { startDate, endDate, error: e });
      return startDate; // Fallback to raw string
    }
  };

  // Function to format time range
  const formatTime = (time: { startTime: string; endTime: string }) => {
    if (!time?.startTime || !time?.endTime) return 'No time provided';
    const startFormatted = dayjs.utc(time.startTime).local().format('h:mm A'); // Parse UTC and convert to local time
    const endFormatted = dayjs.utc(time.endTime).local().format('h:mm A'); // Parse UTC and convert to local time
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className='min-h-screen sticky top-0 z-10'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8 bg-white border-b border-b-gray-100 pb-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Schedule Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Organize and manage your schedules efficiently
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
          >
            <Plus className='w-5 h-5 mr-2' />
            Add Schedule
          </button>
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title='Add Schedule'
        >
          <ScheduleForm
            onSubmit={handleAddSchedule}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={!!editingSchedule}
          onClose={() => setEditingSchedule(null)}
          title='Edit Schedule'
        >
          {editingSchedule && (
            <ScheduleForm
              onSubmit={handleUpdateSchedule}
              onCancel={() => setEditingSchedule(null)}
              initialData={editingSchedule}
            />
          )}
        </Modal>

        <div className='max-h-[calc(105vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-100 pr-2 pb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center mb-2'>
                        <Calendar className='w-5 h-5 text-indigo-600 mr-2' />
                        <h3 className='text-xl font-semibold text-gray-900'>
                          {formatDate(schedule.startDate, schedule.endDate)}
                        </h3>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Clock className='w-5 h-5 mr-2' />
                        <p>{formatTime(schedule.time)}</p>
                      </div>
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                        onClick={() => handleEditClick(schedule)}
                      >
                        <Pencil className='w-4 h-4 text-gray-600' />
                      </button>
                      <button
                        className='p-2 hover:bg-red-50 rounded-full transition-colors duration-200'
                        onClick={() => handleDeleteClick(schedule._id)}
                      >
                        <Trash2 className='w-4 h-4 text-red-500' />
                      </button>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-center text-gray-700 bg-gray-50 rounded-lg p-3'>
                      <MapPin className='w-5 h-5 text-indigo-600 mr-2 flex-shrink-0' />
                      <p className='text-sm'>
                        {schedule.location || 'No location'}
                      </p>
                    </div>
                    <div className='flex items-center text-gray-700 bg-gray-50 rounded-lg p-3'>
                      <Phone className='w-5 h-5 text-indigo-600 mr-2 flex-shrink-0' />
                      <p className='text-sm'>
                        {schedule.phoneNumber || 'No phone number'}
                      </p>
                    </div>
                    <div className='text-xs text-gray-500 bg-gray-50 rounded-lg p-3'>
                      <span className='font-medium'>Coordinates:</span>
                      <br />
                      {schedule.coordinates?.lat && schedule.coordinates?.lng
                        ? `${schedule.coordinates.lat}, ${schedule.coordinates.lng}`
                        : 'No coordinates'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {schedules.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>
                No schedules found. Add your first schedule!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
