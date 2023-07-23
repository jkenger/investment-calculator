import { useState } from "react";

export default function InvestmentForm({ onSetData }) {
  const [currentSavings, setCurrentSavings] = useState("");
  const [yearlyContribution, setYearlyContribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");

  function handleCurrentSavings(value) {
    setCurrentSavings(value);
  }
  function handleYearlyContribution(value) {
    setYearlyContribution(value);
  }
  function handleExpectedReturn(value) {
    setExpectedReturn(value);
  }
  function handleDuration(value) {
    setDuration(value);
  }

  function handleReset() {
    setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");
    onSetData(null);
  }

  const calculateHandler = (e) => {
    e.preventDefault();

    // Guard Clause
    if (!currentSavings || !yearlyContribution || !expectedReturn || !duration)
      return;

    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    const yearlyData = []; // per-year results
    let newCurrentSavings = currentSavings;
    const newExpectedReturn = expectedReturn / 100;
    const newYearlyContribution = yearlyContribution;
    const newDuration = duration;

    let totalInterest = 0;
    let investedCapital = 0;
    // The below code calculates yearly results (total savings, interest etc)

    for (let i = 0; i < newDuration; i++) {
      const yearlyInterest = newCurrentSavings * newExpectedReturn;
      newCurrentSavings += yearlyInterest + newYearlyContribution;
      totalInterest += yearlyInterest;
      investedCapital =
        i === 0 ? yearlyInterest : newCurrentSavings - totalInterest;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        yearNumber: i + 1,
        yearlyInterest: yearlyInterest.toFixed(2),
        savingsEndOfYear: newCurrentSavings.toFixed(2),
        yearlyContribution: newYearlyContribution.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        investedCapital: investedCapital.toFixed(2),
      });
    }

    // do something with yearlyData ...
    onSetData(yearlyData);
  };

  return (
    <form className="form" onSubmit={calculateHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={currentSavings}
            onChange={(e) => handleCurrentSavings(Number(e.target.value))}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            value={yearlyContribution}
            onChange={(e) => handleYearlyContribution(Number(e.target.value))}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            value={expectedReturn}
            onChange={(e) => handleExpectedReturn(Number(e.target.value))}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => handleDuration(Number(e.target.value))}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
}
