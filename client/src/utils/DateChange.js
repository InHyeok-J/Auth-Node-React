export const DateChange = (date) => {
    const New = new Date(date);
    // const Year = New.getFullYear();
    // const month = New.getMonth() + 1;
    const day = New.getDate();
    const hour = New.getHours();
    const min = New.getMinutes();
    let Changemin = "";
    if (parseInt(min, 10) < 10) {
        Changemin = "0" + min.toString();
    } else {
        Changemin = min;
    }
    if (parseInt(hour, 10) > 12) {
        return (
            "오후" +
            " " +
            (parseInt(hour, 10) - 12).toString() +
            ":" +
            Changemin
        );
    }
    return "오전" + " " + hour + ":" + Changemin;
};
