export interface ReminderMessage {
  name: string;
  schedule: string;
  humanReadableSchedule: string;
  message: string;
  image?: string;
}