import {format} from 'date-fns';
import {DateFormats} from "./constant";

export const formatDate = (
    date: Date | string,
    dateFormat: string = DateFormats.MMDDYYYY_DOT
): string => format(new Date(date), dateFormat);
