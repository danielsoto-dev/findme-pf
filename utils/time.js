const {
  differenceInCalendarYears,
  differenceInYears,
  intervalToDuration,
  parse,
} = require("date-fns");

export function calculateAge(dob) {
  const date = parse(dob, "dd/MM/yyyy", new Date());
  const age = differenceInYears(new Date(), date);
  return age;
}

export function calculateFullAge(dob) {
  const birthDate = parse(dob, "dd/MM/yyyy", new Date());
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  });
  return { years, months, days };
}
