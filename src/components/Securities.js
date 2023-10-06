import React, { useState, useEffect } from 'react';
import { makeAPICall } from '../utils/makeApiCall';
import './Securities.css'

const Securities = () => {
  const symbols = ["FTSE:FSI", "INX:IOM", "EURUSD", "GBPUSD", "IB.1:IEU"];
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //pay attention in the future if the path for the api changes
        const results = await Promise.all(symbols.map(symbol =>
          makeAPICall(`https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=${symbol}`)
        ));
        setInfo(results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!info.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='securities'>
      {info.map((item, index) => {
        
        const change1DayPercent = item.data.items[0].quote.change1DayPercent.toFixed(2);
        const changeColor = change1DayPercent <= 0 ? 'red' : 'green';

        let displayName = item.data.items[0].basic.name;

        //adjust regex to the needs for future changes
        displayName = displayName.replace(/index|us |fx|rate|spot|ice|front| sterling| month|uk/gi, '').trim();
        return (
          <div key={index}>
            <div>
              {displayName}
              <span style={{ color: changeColor }}> {change1DayPercent}%</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Securities;
