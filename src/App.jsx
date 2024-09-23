import "./App.css";
import "./components/fonts.css";
import { Link, Route, HashRouter as Router, Routes } from "react-router-dom";
import ChristianCal from "./components/georgianCal";
import SolarCal from "./components/solarCal";
import CurrentDate from "./components/currentDate";
const App = () => {
  return (
    <div className="grid-container">
      <Router>
        <header className="header-section">
          <h1 className="header-title vazirmatn-semibold">تقویم نگار</h1>
          <nav className="nav-bar">
            <Link className="nav-item vazirmatn-regular" to={"/"}>
              تاریخ امروز
            </Link>
            <Link
              className="nav-item vazirmatn-regular"
              to={"/Georgian-Calendar"}
            >
              سن با تقویم میلادی
            </Link>
            <Link className="nav-item vazirmatn-regular" to={"/Solar-Calendar"}>
              سن با تقویم شمسی
            </Link>
          </nav>
        </header>

        <main className="main-section">
          <Routes>
            <Route path="/" element={<CurrentDate />} />
            <Route path="/Solar-Calendar" element={<SolarCal />} />
            <Route path="/Georgian-Calendar" element={<ChristianCal />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
