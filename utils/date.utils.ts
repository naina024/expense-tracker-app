
export function getFormattedDate(date: Date){
    return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`
}


export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}