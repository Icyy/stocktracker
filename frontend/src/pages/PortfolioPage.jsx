import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);

  useEffect(() => {
    // Fetch portfolio stocks
    axios.get('/api/portfolio')
      .then(response => {
        setPortfolio(response.data.stocks);
      })
      .catch(error => console.error('Error fetching portfolio:', error));

    // Fetch stock prices for the portfolio
    axios.get('/api/portfolio/prices')
      .then(response => {
        setStockPrices(response.data);
      })
      .catch(error => console.error('Error fetching stock prices:', error));
  }, []);

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {portfolio.map(stock => (
          <li key={stock.ticker}>
            {stock.ticker} - {stock.quantity} shares - Purchase Price: ${stock.purchasePrice}
            <br />
            Current Price: ${stockPrices.find(sp => sp.ticker === stock.ticker)?.price || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioPage;
