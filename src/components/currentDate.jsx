import { useEffect, useState } from "react";
import "./date.css";
import "./fonts.css";
const CurrentDate = () => {
  const [persianDay, setPersianDay] = useState("");
  const [persianMonth, setPersianMonth] = useState("");
  const [persianYear, setPersianYear] = useState("");
  const [persianWeekDay, setPersianWeekDay] = useState("");
  const [englishDay, setEnglishDay] = useState("");
  const [englishMonth, setEnglishMonth] = useState("");
  const [englishYear, setEnglishYear] = useState("");
  const [englishWeekDay, setEnglishWeekDay] = useState("");
  useEffect(() => {
    const date = new Date();
    setEnglishDay(date.toLocaleDateString("en-us", { day: "numeric" }));
    setEnglishMonth(date.toLocaleDateString("en-us", { month: "long" }));
    setEnglishYear(date.getFullYear());
    setEnglishWeekDay(
      date.toLocaleDateString("en-us", {
        weekday: "long",
      })
    );
    setPersianDay(
      date.toLocaleDateString("fa-IR-u-cu-persian", { day: "numeric" })
    );
    setPersianMonth(
      date.toLocaleDateString("fa-IR-u-cu-persian", { month: "long" })
    );
    setPersianYear(
      date.toLocaleDateString("fa-IR-u-cu-persian", {
        year: "numeric",
      })
    );
    setPersianWeekDay(
      date.toLocaleDateString("fa-IR-u-cu-persian", {
        weekday: "long",
      })
    );
  }, []);
  return (
    <main className="date-container">
      <p className="vazirmatn-regular">
        {persianWeekDay} {persianDay} {persianMonth} {persianYear}
      </p>

      <p className="poppins-regular">
        {englishWeekDay} {englishMonth} {englishDay}, {englishYear}
      </p>
    </main>
  );
};

export default CurrentDate;
