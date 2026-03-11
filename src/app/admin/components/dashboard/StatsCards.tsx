// import { TrendingUp } from 'lucide-react';
// import React from 'react';

// interface StatCardProps {
//   stats: {
//     title: string;
//     value: string;
//     description: string;
//     icon: React.ReactNode;
//     trend: string;
//   }[];
// }

// const StatsCards: React.FC<StatCardProps> = ({ stats }) => {
//   return (
//     <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
//       {stats.map((stat, index) => (
//         <div key={index} className='card stat-card-hover'>
//           <div className='card-header flex flex-row items-center justify-between pb-2'>
//             <h3 className='text-sm font-medium'>{stat.title}</h3>
//             {stat.icon}
//           </div>
//           <div className='card-content'>
//             <div className='text-2xl font-bold'>{stat.value}</div>
//             <p className='text-xs text-muted-foreground'>{stat.description}</p>
//             <div className='mt-2 flex items-center text-xs text-green-500'>
//               <TrendingUp className='mr-1 h-3 w-3' />
//               {stat.trend}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;
