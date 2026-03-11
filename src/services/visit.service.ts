import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import visitModel from '@/models/visit.model'; // adjust the import path accordingly

// Initialize the isoWeek plugin
dayjs.extend(isoWeek);

export async function visitsAnalytics(timeframe: string) {
  const now = dayjs();
  const startOfDay = now.startOf('day').toDate();
  const startOfWeek = now.startOf('week').toDate();
  const startOfMonth = now.startOf('month').toDate();

  let data = [];

  switch (timeframe) {
    case 'DAILY': {
      // Modified to show last 3 days, current day, and next 2 days
      const last3Days = dayjs().subtract(3, 'days').startOf('day').toDate();
      const result = await visitModel.aggregate([
        { $match: { createdAt: { $gte: last3Days } } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
      ]);

      // Create array for last 3 days, today, and next 2 days
      const daysArray = Array.from({ length: 6 }, (_, i) =>
        dayjs().subtract(3 - i, 'days'),
      );

      // Create a map of counts by date
      const countMap = new Map<string, number>();
      result.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}-${item._id.day}`;
        countMap.set(key, item.count);
      });

      // Format the data with proper date format and counts
      data = daysArray.map((day) => {
        const year = day.year();
        const month = day.month() + 1;
        const dayOfMonth = day.date();
        const key = `${year}-${month}-${dayOfMonth}`;

        // Format the label - show day name + date
        const label = day.format('ddd DD');

        // If this is today, mark it
        const isToday = day.isSame(now, 'day');
        const displayLabel = isToday ? `${label} (Today)` : label;

        return {
          date: displayLabel,
          visitors: countMap.get(key) || 0,
          isToday,
        };
      });
      break;
    }
    case 'WEEKLY': {
      // Fix: Instead of relying only on $isoWeek, we'll use a range-based approach
      // Get the last 5 weeks
      const weeksToShow = 5;
      const weekRanges = [];

      for (let i = 0; i < weeksToShow; i++) {
        const weekStart = dayjs()
          .subtract(weeksToShow - 1 - i, 'week')
          .startOf('week');
        const weekEnd = weekStart.endOf('week');
        weekRanges.push({
          start: weekStart.toDate(),
          end: weekEnd.toDate(),
          label: `${weekStart.format('MMM DD')}-${weekEnd.format('DD')}`,
          isCurrentWeek: i === weeksToShow - 1,
        });
      }

      // Get counts for each week range
      const countPromises = weekRanges.map((range) =>
        visitModel.countDocuments({
          createdAt: {
            $gte: range.start,
            $lte: range.end,
          },
        }),
      );

      const counts = await Promise.all(countPromises);

      // Combine the data
      data = weekRanges.map((range, index) => ({
        date: range.isCurrentWeek ? `${range.label} (Current)` : range.label,
        visitors: counts[index] || 0,
        isCurrent: range.isCurrentWeek,
      }));
      break;
    }
    case 'MONTHLY': {
      // Get last 12 months including current month
      const last12Months = Array.from({ length: 12 }, (_, i) =>
        dayjs()
          .subtract(11 - i, 'month')
          .startOf('month'),
      );
      const start = last12Months[0].toDate();

      const result = await visitModel.aggregate([
        { $match: { createdAt: { $gte: start } } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);

      const countMap = new Map<string, number>();
      result.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}`;
        countMap.set(key, item.count);
      });

      // Current month
      const currentYear = now.year();
      const currentMonth = now.month() + 1;

      data = last12Months.map((monthDate) => {
        const year = monthDate.year();
        const month = monthDate.month() + 1; // 0-indexed
        const key = `${year}-${month}`;

        // Create label and mark current month
        const isCurrentMonth = year === currentYear && month === currentMonth;
        const label = isCurrentMonth
          ? `${monthDate.format('MMM YY')} (Current)`
          : monthDate.format('MMM YY');

        return {
          date: label,
          visitors: countMap.get(key) || 0,
          isCurrent: isCurrentMonth,
        };
      });
      break;
    }
    default: {
      // Summary view remains the same
      const [daily, weekly, monthly] = await Promise.all([
        visitModel.countDocuments({ createdAt: { $gte: startOfDay } }),
        visitModel.countDocuments({ createdAt: { $gte: startOfWeek } }),
        visitModel.countDocuments({ createdAt: { $gte: startOfMonth } }),
      ]);

      data = [
        { date: 'Today', visitors: daily },
        { date: 'This Week', visitors: weekly },
        { date: 'This Month', visitors: monthly },
      ];
      break;
    }
  }

  return {
    data,
    message: 'Analytics fetched successfully',
  };
}
