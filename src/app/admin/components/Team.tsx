import {
  Glasses as MagnifyingGlass,
  Pencil,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { useState } from 'react';

import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from '@/hooks/team/mutation';
import { useGetAlUsers } from '@/hooks/team/query';

import { Modal } from './Modal';
import { TeamMember } from '../types';

export function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobRole: '',
  });

  const { mutate: createTeam, isPending: isCreating } = useCreateUser();
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteTeam, isPending: isDeleting } = useDeleteUser();

  const {
    data: teamMembers,
    isLoading,
    refetch,
  } = useGetAlUsers({ role: 'Staff' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      jobRole: formData.jobRole,
      role: 'Staff',
    };

    if (editingMember) {
      updateTeam(
        { id: editingMember._id, payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingMember(null);
            resetForm();
            refetch();
          },
        },
      );
    } else {
      createTeam(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          resetForm();
          refetch();
        },
      });
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      jobRole: member.jobRole || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeam(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      jobRole: '',
    });
  };

  const filteredMembers = teamMembers?.filter(
    (member: TeamMember) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.jobRole.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='sticky top-0 z-10 bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Team Management
              </h1>
              <p className='mt-1 text-sm text-gray-500'>
                Manage your team members and their roles
              </p>
            </div>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
              <div className='relative'>
                <MagnifyingGlass className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search team members...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              <button
                onClick={() => {
                  setEditingMember(null);
                  resetForm();
                  setIsModalOpen(true);
                }}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200'
              >
                <UserPlus className='w-5 h-5 mr-2' />
                Add Member
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar'>
          {isLoading ? (
            <div className='flex items-center justify-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
          ) : filteredMembers?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredMembers.map((member: TeamMember) => (
                <div
                  key={member._id}
                  className='bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'
                >
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h3 className='text-xl font-semibold text-gray-900'>
                          {member.name}
                        </h3>
                        <p className='text-blue-600 font-medium'>
                          {member.jobRole}
                        </p>
                      </div>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleEdit(member)}
                          className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
                          title='Edit member'
                        >
                          <Pencil className='w-4 h-4 text-gray-600' />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          disabled={isDeleting}
                          className='p-2 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Delete member'
                        >
                          <Trash2 className='w-4 h-4 text-red-600' />
                        </button>
                      </div>
                    </div>
                    <div className='space-y-2 text-sm'>
                      <p className='flex items-center text-gray-600'>
                        <span className='font-medium mr-2'>Email:</span>
                        <span className='truncate'>{member.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-16 bg-white rounded-xl shadow-sm'>
              <p className='text-gray-600 text-xl font-medium'>
                No team members found
              </p>
              <p className='text-gray-500 mt-2'>
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Click "Add Member" to create your first team member'}
              </p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
          resetForm();
        }}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
      >
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Enter name'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Enter email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Job Role
            </label>
            <input
              type='text'
              name='jobRole'
              value={formData.jobRole}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Enter job role'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isCreating || isUpdating}
            className='w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200'
          >
            {editingMember
              ? isUpdating
                ? 'Updating...'
                : 'Update Member'
              : isCreating
                ? 'Adding...'
                : 'Add Member'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
