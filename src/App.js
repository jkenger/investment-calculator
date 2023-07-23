import { useState } from "react";
import InvestmentForm from "./InvestmentForm";
import InvestmentTable from "./InvestmentTable";
import logo from "./assets/investment-calculator-logo.png";

function App() {
  const [yearlyData, setYearlyData] = useState(null);

  function handleYearlyData(value) {
    setYearlyData(value);
  }

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>
      <InvestmentForm onSetData={handleYearlyData} />
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      <InvestmentTable data={yearlyData} />
    </div>
  );
}

export default App;
