import { useEffect, useState } from "react";
import "./cals.css";
import "./fonts.css";
const SolarCal = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [currentDay, setcurrentDay] = useState("");
  const [currentMonth, setcurrentMonth] = useState("");
  const [currentYear, setcurrentYear] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [birthDayCounter, setBirthDayCounter] = useState("");
  useEffect(() => {
    const date = new Date();

    setcurrentDay(
      date.toLocaleDateString("fa-IR-u-nu-latn", { day: "numeric" })
    );
    setcurrentMonth(
      date.toLocaleDateString("fa-IR-u-nu-latn", { month: "numeric" })
    );
    setcurrentYear(
      date.toLocaleDateString("fa-IR-u-nu-latn", {
        year: "numeric",
      })
    );
  }, []);
  const handleMonth = (e) => {
    setMonth(Number(e.target.value));
  };
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleDay = (e) => {
    setDay(Number(e.target.value));
  };
  const leapYear = (year) => {
    const rem1 = [1, 5, 9, 13, 17, 21, 26, 30];
    const rem2 = [1, 5, 9, 13, 17, 22, 26, 30];
    if (year <= 1342) return rem1.includes(year % 33);
    if (year > 1342 && year < 1473) return rem2.includes(year % 33);
  };
  const daysInMonth = (month, year) => {
    if (month <= 6) return 31;
    if (month < 11) return 30;
    return leapYear(year) ? 30 : 29;
  };
  const days = [];
  for (let i = 1; i <= daysInMonth(month, year); i++) {
    days.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const handleCalculate = (birthYear, birthMonth, birthDay) => () => {
    setError("");
    let yearOfAge = currentYear - birthYear;
    let monthOfAge;
    let dayOfAge;
    let firstMonth1 = 1;
    let countedDays1 = 0;
    let distanceFromToday;
    let distanceFromBirthday;
    while (firstMonth1 <= currentMonth - 1) {
      countedDays1 += daysInMonth(firstMonth1, currentYear);
      firstMonth1++;
    }
    distanceFromToday = countedDays1 + Number(currentDay);
    let firstMonth2 = 1;
    let countedDays2 = 0;
    while (firstMonth2 <= birthMonth - 1) {
      countedDays2 += daysInMonth(firstMonth2, currentYear);
      firstMonth2++;
    }
    let distance;
    distanceFromBirthday = countedDays2 + Number(birthDay);

    if (distanceFromBirthday < distanceFromToday) {
      distance =
        (leapYear(currentYear) ? 366 : 365) -
        Math.abs(distanceFromBirthday - distanceFromToday);
      setBirthDayCounter(
        `${distance.toLocaleString("fa-IR")} روز تا ${(
          yearOfAge + 1
        ).toLocaleString("fa-IR")} سالگی `
      );
    } else if (distanceFromBirthday > distanceFromToday) {
      distance = distanceFromBirthday - distanceFromToday;
      setBirthDayCounter(
        `${distance.toLocaleString("fa-IR")} روز تا ${yearOfAge.toLocaleString(
          "fa-IR"
        )} سالگی `
      );
    } else setBirthDayCounter("تولدت مبارک.");

    if (birthDay != 0 && birthMonth != 0 && birthYear != "") {
      if (currentDay < birthDay) {
        let newMonth = currentMonth - 1;
        console.log(newMonth);
        let newDay =
          Number(currentDay) + daysInMonth(currentMonth, currentYear);
        monthOfAge = newMonth - birthMonth;
        dayOfAge = newDay - birthDay;
        console.log(newDay);
      } else {
        monthOfAge = currentMonth - birthMonth;
        dayOfAge = currentDay - birthDay;
      }
      if (
        birthMonth > currentMonth ||
        (birthMonth == currentMonth && birthDay > currentDay)
      ) {
        yearOfAge--;
        monthOfAge += 12;
      }
      let persianYearOfAge = yearOfAge.toLocaleString("fa-IR");
      let persianMonthOfAge = monthOfAge.toLocaleString("fa-IR");
      let persianDayOfAge = dayOfAge.toLocaleString("fa-IR");
      console.log(persianDayOfAge);
      console.log(persianMonthOfAge);
      console.log(persianYearOfAge);
      if (
        currentYear < birthYear ||
        (currentYear == birthYear &&
          (currentMonth < birthMonth ||
            (currentMonth == birthMonth && currentDay < birthDay)))
      ) {
        setError("تاریخ را درست وارد کنید.");
      } else if (yearOfAge == 0) {
        if (monthOfAge == 0) {
          if (dayOfAge == 0) {
            setAge("متولد امروز");
          } else if (dayOfAge > 0) {
            setAge(`${persianDayOfAge} روز`);
          }
        } else if (monthOfAge > 0) {
          if (dayOfAge == 0) {
            setAge(`${persianMonthOfAge} ماه`);
          } else if (dayOfAge > 0) {
            setAge(`${persianMonthOfAge} ماه و ${persianDayOfAge} روز`);
          }
        }
      } else if (yearOfAge != 0) {
        if (monthOfAge == 0) {
          if (dayOfAge == 0) {
            setAge(`${persianYearOfAge} سال`);
          } else if (dayOfAge > 0) {
            setAge(`${persianYearOfAge} سال و ${persianDayOfAge} روز`);
          }
        } else if (monthOfAge > 0) {
          if (dayOfAge == 0) {
            setAge(`${persianYearOfAge} سال و ${persianMonthOfAge} ماه`);
          } else if (dayOfAge > 0) {
            setAge(
              `${persianYearOfAge} سال و ${persianMonthOfAge} ماه و ${persianDayOfAge} روز`
            );
          }
        }
      }
    } else {
      setError("تاریخ را درست وارد کنید.");
    }
  };
  const handleReset = () => {
    setAge("");
    setDay(0);
    setMonth(0);
    setYear("");
    setBirthDayCounter("");
    setError("");
  };
  return (
    <main className="calendar-container">
      <section className="calculator">
        <div className="selectors">
          <input
            type="text"
            onChange={handleYear}
            value={year}
            placeholder="سال"
            maxLength={4}
            className="selector vazirmatn-regular"
          />
          <select
            onChange={handleMonth}
            value={month}
            className="selector vazirmatn-regular"
          >
            <option value={0} hidden>
              ماه
            </option>
            <option value={1}>فروردین</option>
            <option value={2}>اردیبهشت</option>
            <option value={3}>خرداد</option>
            <option value={4}>تیر</option>
            <option value={5}>مرداد</option>
            <option value={6}>شهریور</option>
            <option value={7}>مهر</option>
            <option value={8}>آبان</option>
            <option value={9}>آذر</option>
            <option value={10}>دی</option>
            <option value={11}>بهمن</option>
            <option value={12}>اسفند</option>
          </select>
          <select
            onChange={handleDay}
            value={day}
            className="selector vazirmatn-regular"
          >
            <option value={0} hidden>
              روز
            </option>
            {days}
          </select>
        </div>
        <div className="btn">
          <button
            className="calculate-btn vazirmatn-semibold"
            onClick={handleCalculate(year, month, day)}
          >
            محاسبه
          </button>
          <button
            className="reset-btn vazirmatn-semibold"
            onClick={handleReset}
          >
            بازنشانی
          </button>
        </div>
      </section>
      <section className="text-section">
        {age && (
          <div className="calculated-age">
            <p className="solar-age persian">{age}</p>
            <p className="birthDayCounter persian">{birthDayCounter}</p>
          </div>
        )}
        {error && <p className="error-text persian">{error}</p>}
      </section>
    </main>
  );
};

export default SolarCal;
