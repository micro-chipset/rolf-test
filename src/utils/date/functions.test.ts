import {DateFormats} from './constant';
import {formatDate} from './functions';

describe('Date utils', () => {
    it('Get day, month and year from date', () => {
        const date = new Date(2019, 1, 1);
        const parsedDate = formatDate(date, DateFormats.DDMMYYYY_DOT);

        expect(parsedDate).toEqual('01.02.2019');
    });

    it('Get year from date', () => {
        const date = new Date(2019, 1, 1);
        const year = formatDate(date, DateFormats.YYYY);

        expect(year).toEqual('2019');
    });
});
