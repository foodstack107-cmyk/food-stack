import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export interface TeamMemberProps {
  name: string;
  jobRole: string;
  role: string;
  email: string;
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  jobRole,
  role,
  email,
  index,
}) => {
  // Get initials for the avatar
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Generate a random color based on name
  const generateColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate hue based on hash (0-360)
    const hue = hash % 360;
    // Use a vibrant saturation and suitable brightness
    return `hsl(${hue}, 75%, 60%)`;
  };

  const bgColor = generateColor(name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className='h-full'
    >
      <div className='h-full overflow-hidden bg-white/5 border border-red-500/20 hover:border-yellow-400/40 transition-all duration-300 rounded-xl shadow-lg'>
        <div className='p-6 flex flex-col items-center text-center h-full'>
          {/* Custom Avatar with Tailwind */}
          <div
            className='relative h-20 w-20 mb-5 rounded-full ring-2 ring-red-500/30 overflow-hidden flex items-center justify-center'
            style={{ backgroundColor: bgColor }}
          >
            <span className='text-xl font-semibold text-white'>{initials}</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className='flex flex-col items-center'
          >
            <h3 className='text-xl font-medium text-white/80 hover:text-[#E8552D] transition-colors mb-2'>
              {name}
            </h3>
            {role === 'Admin' ? (
              <p className='text-white/80 font-medium mb-3'>Owner</p>
            ) : (
              <p className='text-white/80 font-medium mb-3'>{jobRole}</p>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className='flex items-center gap-2 mb-4 text-white/70 hover:text-[#E8552D] transition-colors'
            >
              <Mail size={14} />
              <a
                href={`mailto:${email}`}
                className='text-sm truncate hover:underline'
              >
                {email}
              </a>
            </motion.div>

            {/* <div className='inline-flex px-3 py-1 text-xs rounded-full bg-red-800/40 text-white/80 border border-red-500/20'>
              {role}
            </div> */}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
