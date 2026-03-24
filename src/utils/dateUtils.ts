import { format, parseISO } from 'date-fns';

const NOTE_DATE_FORMAT = 'MMM/dd, hh:mm';

export default function formatNoteDate(value: string | Date): string {
  const date = typeof value === 'string' ? parseISO(value) : value;
  return format(date, NOTE_DATE_FORMAT);
}
