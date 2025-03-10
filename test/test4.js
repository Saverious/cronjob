function main () {
    let date1 = new Date();
    date1.setMinutes(date1.getMinutes() - 30);  // past date
    let date2 = new Date();
    date2.setMinutes(date2.getMinutes() + 30);  // future date

    let pastTime1 = {
        year: date1.getFullYear(),
        month: date1.getMonth() + 1,
        day: date1.getDate(),
        hour: date1.getHours(),
        minute: date1.getMinutes()
    };

    let pastTime2 = {
        year: date1.getFullYear() - 1,
        month: date1.getMonth() + 1,
        day: date1.getDate(),
        hour: date1.getHours(),
        minute: date1.getMinutes()
    };

    let futureTime = {
        year: date2.getFullYear(),
        month: date2.getMonth() + 1,
        day: date2.getDate(),
        hour: date2.getHours(),
        minute: date2.getMinutes()
    };
    
    console.log('pastTime1: ', pastTime1)
    console.log('pastTime2: ', pastTime2)
    console.log('futureTime: ', futureTime)
}

main()