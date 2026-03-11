export interface ISchedule {
  _id: string;
  startDate: string;
  endDate?: string;
  time: { startTime: string; endTime: string };
  location: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  phoneNumber: string;
}

export interface LocationSearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export interface SchedulePayload {
  startDate: string;
  endDate: string | null;
  time: { startTime: string; endTime: string };
  location: string;
  coordinates: { lat: string; lng: string };
  phoneNumber: string;
  [key: string]:
    | string
    | { lat: string; lng: string }
    | { startTime: string; endTime: string }
    | null;
}
