import { useEffect, useState } from "react";
import "./cals.css";
import "./fonts.css";
const ChristianCal = () => {
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
    setcurrentDay(date.getDate());
    setcurrentMonth(date.getMonth() + 1);
    setcurrentYear(date.getFullYear());
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
    if (
      year % 4 == 0 &&
      ((year % 100 == 0 && year % 400 == 0) ||
        (year % 100 != 0 && year % 400 == 0) ||
        (year % 100 != 0 && year % 400 != 0))
    )
      return true;
    if (year % 4 == 0 && year % 100 == 0 && year % 400 != 0) return false;
  };
  const daysInMonth = (month, year) => {
    let d;
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        d = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        d = 30;
        break;
      case 2:
        leapYear(year) ? (d = 29) : (d = 30);
    }
    return d;
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
    let yearOfAge = currentYear - birthYear;
    let monthOfAge;
    let dayOfAge;
    setError("");
    let firstMonth1 = 1;
    let countedDays1 = 0;
    let distanceFromToday;
    let distanceFromBirthday;
    let distance;
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
    distanceFromBirthday = countedDays2 + Number(birthDay);
    if (distanceFromBirthday < distanceFromToday) {
      distance =
        (leapYear(currentYear) ? 366 : 365) -
        Math.abs(distanceFromBirthday - distanceFromToday);
      setBirthDayCounter(`${distance} Days Until ${yearOfAge + 1}`);
    } else if (distanceFromBirthday > distanceFromToday) {
      distance = distanceFromBirthday - distanceFromToday;
      setBirthDayCounter(`${distance} Days Until ${yearOfAge}`);
    } else setBirthDayCounter("Happy Birthday.");

    if (birthDay != 0 && birthMonth != 0 && birthYear != "") {
      if (currentDay < birthDay) {
        let newMonth = currentMonth - 1;
        let newDay = currentDay + days.length;
        monthOfAge = newMonth - birthMonth;
        dayOfAge = newDay - birthDay;
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
      if (
        currentYear < birthYear ||
        (currentYear == birthYear &&
          (currentMonth < birthMonth ||
            (currentMonth == birthMonth && currentDay < birthDay)))
      ) {
        setError("Please Enter The Date Correctly.");
      } else if (yearOfAge == 0) {
        if (monthOfAge == 0) {
          if (dayOfAge == 0) {
            setAge("New Born Baby!!!!");
          } else if (dayOfAge > 0) {
            setAge(`${dayOfAge} days.`);
          }
        } else if (monthOfAge > 0) {
          if (dayOfAge == 0) {
            setAge(`${monthOfAge} months`);
          } else if (dayOfAge > 0) {
            setAge(`${monthOfAge} months and ${dayOfAge} days.`);
          }
        }
      } else if (yearOfAge != 0) {
        if (monthOfAge == 0) {
          if (dayOfAge == 0) {
            setAge(`${yearOfAge} years.`);
          } else if (dayOfAge > 0) {
            setAge(`${yearOfAge} years and ${dayOfAge} days.`);
          }
        } else if (monthOfAge > 0) {
          if (dayOfAge == 0) {
            setAge(`${yearOfAge} years and ${monthOfAge} months.`);
          } else if (dayOfAge > 0) {
            setAge(
              `${yearOfAge} years and ${monthOfAge} months and ${dayOfAge} days.`
            );
          }
        }
      }
    } else {
      setError("Please Enter The Date Correctly.");
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
            className="selector poppins-regular"
            placeholder="Year"
            maxLength={4}
          />

          <select
            onChange={handleMonth}
            value={month}
            className="selector poppins-regular"
          >
            <option value={0} hidden>
              Month
            </option>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          <select
            onChange={handleDay}
            value={day}
            className="selector poppins-regular"
          >
            <option value={0} hidden>
              Day
            </option>
            {days}
          </select>
        </div>
        <div className="btn">
          <button
            className="calculate-btn poppins-semibold"
            onClick={handleCalculate(year, month, day)}
          >
            Calculate
          </button>
          <button className="reset-btn poppins-semibold" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>
      <section className="text-section">
        {age && (
          <div className="calculated-age">
            <p className="christian-age">{age}</p>
            <p className="birthDayCounter">{birthDayCounter}</p>
          </div>
        )}
        {error && <p className="error-text">{error}</p>}
      </section>
    </main>
  );
};
export default ChristianCal;
