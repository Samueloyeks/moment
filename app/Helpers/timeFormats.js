exports.formatTimeString = (dateString)=>{
    let date = new Date(dateString);
    let datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];

    return datetext;
}

