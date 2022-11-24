export const days = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};

export const months = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

export const getDaysInMonth = (
  month: number,
  year: number,
  dayToFind: number
) => {
  var d = new Date();

  var getTot = new Date(month, year, 0).getDate(); //Get total days in a month

  var datesOfday = new Array(); //Declaring array for inserting Saturdays

  for (var i = 1; i <= getTot; i++) {
    //looping through days in month
    var newDate = new Date(d.getFullYear(), d.getMonth(), i);
    if (newDate.getDay() == dayToFind) {
      datesOfday.push(i);
    }
  }

  return datesOfday;
};
