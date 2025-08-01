const FIRST_TIME_LENGTH = 2;
const TIME_LENGTH = 8;
const DATE_LENGTH = 10;
const DATE_MONTH_DAY = 2;
const HOUR_MIN_LENGTH = 5;

export function compareDate(date1, date2){
    const date1Arr = date1.split('');
    date1Arr.splice(FIRST_TIME_LENGTH, TIME_LENGTH - FIRST_TIME_LENGTH);
    const date2Arr = date2.split('');
    date2Arr.splice(FIRST_TIME_LENGTH, TIME_LENGTH - FIRST_TIME_LENGTH);

    return date1Arr.join('') === date2Arr.join('');
}

export function getMonthDay(date){
    const dateArr = date.split('');
    dateArr.splice(0, DATE_LENGTH - DATE_MONTH_DAY);
    if(dateArr[0] === '0'){
        return dateArr[1];
    }
    return dateArr.join('');
}

export function getHourTime(time){
    const timeArr = time.split('');
    timeArr.splice(HOUR_MIN_LENGTH, TIME_LENGTH - HOUR_MIN_LENGTH);
    return timeArr.join('');
}