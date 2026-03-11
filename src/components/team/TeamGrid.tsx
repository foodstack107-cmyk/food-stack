import { motion } from 'framer-motion';

import TeamMember, { TeamMemberProps } from './TeamMember';

interface TeamGridProps {
  members: Omit<TeamMemberProps, 'index'>[];
}

const TeamGrid: React.FC<TeamGridProps> = ({ members }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
        {members.map((member, index) => (
          <TeamMember
            key={`${member.name}-${index}`}
            {...member}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TeamGrid;
