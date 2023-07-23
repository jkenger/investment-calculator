function InvestmentTable({ data }) {
  return (
    <>
      {data === null ? (
        <table className="result">
          <thead>
            <tr>
              <th>No Investment Calculation Yet.</th>
            </tr>
          </thead>
        </table>
      ) : (
        <table className="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data) => (
                <tr key={data.yearNumber}>
                  <td>{data.yearNumber}</td>
                  <td>${data.savingsEndOfYear}</td>
                  <td>${data.yearlyInterest}</td>
                  <td>${data.totalInterest}</td>
                  <td>${data.investedCapital}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default InvestmentTable;
