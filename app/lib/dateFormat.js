


export function dateReducer(sentDate){
  // For formatting date string
  if(sentDate == undefined){
    console.log("an error happened. sentDate is undefined")
    return "error"
  }
  let isToday = false
  let inputDate = new Date(sentDate)
  let todaysDate = new Date()

  // Get hour
  var hours = inputDate.getHours()
  var minutes = inputDate.getMinutes()

  var ampm = (hours >= 12) ? "PM" : "AM"
  var americanHour = hours % 12        // The only sane format for Americans

  // Get month
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var monthOfYear = month[inputDate.getMonth()];

  // Get full length weekday
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var dayOfWeek = weekday[inputDate.getDay()];
  // console.log(n)
  isWithinTheWeek = (Date.parse(inputDate) > Date.parse(todaysDate) + 604800000) // 1 week in ms


  if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
      isToday = true
  }

  let formattedSentDate = sentDate
  // Date Text formatters
  // Format as Today 10:03 AM
  if(isToday){
    formattedSentDate = `Today ${americanHour}:${minutes} ${ampm}`
  }
  // Format as Monday 10:03 AM
  else if(isWithinTheWeek){
    formattedSentDate = `${dayOfWeek} ${americanHour}:${minutes} ${ampm}`
  }
  // Format as Mon, Jun 5, 10:03 AM
  else {
    dayOfWeek = dayOfWeek.substring(0,3)
    monthOfYear = monthOfYear.substring(0,3)
    formattedSentDate = `${dayOfWeek}, ${monthOfYear} ${inputDate.getDate()}, ${americanHour}:${minutes} ${ampm}`
  }

  return formattedSentDate
}
