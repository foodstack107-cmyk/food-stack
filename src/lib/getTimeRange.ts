import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface TimeRangeInput {
  startTime: string;
  endTime: string;
}

interface TimeRangeOutput {
  startTime: string;
  endTime: string;
}

export function getTimeRangeISOString(
  date: string | Date,
  time: TimeRangeInput,
): TimeRangeOutput {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  const startDateTime = dayjs(
    `${formattedDate}T${time.startTime}`,
    'YYYY-MM-DDTHH:mm',
    true,
  );
  const endDateTime = dayjs(
    `${formattedDate}T${time.endTime}`,
    'YYYY-MM-DDTHH:mm',
    true,
  );

  if (!startDateTime.isValid() || !endDateTime.isValid()) {
    throw new Error('Invalid time value');
  }

  return {
    startTime: startDateTime.utc().toISOString(),
    endTime: endDateTime.utc().toISOString(),
  };
}
