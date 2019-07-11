const getDate = (num) => {
    switch (num) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
    }
}

export const getDateList = (tomorrow) => {
    return [
        getDate((tomorrow+1)%7),
        getDate((tomorrow+2)%7),
        getDate((tomorrow+3)%7),
        getDate((tomorrow+4)%7)
    ];
}
