import "./App.css";
import "./components/fonts.css";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChristianCal from "./components/christianCal";
import SolarCal from "./components/solarCal";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
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
    <div className="grid-container">
      <Router>
        <header className="header-section">
          <h1 className="header-title vazirmatn-semibold">تاریخ و محاسبه سن</h1>
          <nav className="nav-bar">
            <Link className="nav-item vazirmatn-regular" to={"/"}>
              تاریخ امروز
            </Link>
            <Link className="nav-item vazirmatn-regular" to={"/christianCal"}>
              سن با تقویم میلادی
            </Link>
            <Link className="nav-item vazirmatn-regular" to={"/solarCal"}>
              سن با تقویم شمسی
            </Link>
          </nav>
        </header>

        <main className="main-section">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/solarCal" element={<SolarCal />} />
            <Route path="/christianCal" element={<ChristianCal />} />
          </Routes>
          <main className="date-container">
            <p className="vazirmatn-regular">
              {persianWeekDay} {persianDay} {persianMonth} {persianYear}
            </p>

            <p className="poppins-regular">
              {englishWeekDay} {englishMonth} {englishDay}, {englishYear}
            </p>
          </main>
          );
        </main>
      </Router>
    </div>
  );
};

export default App;
