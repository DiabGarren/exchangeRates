/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [curr, setCurr] = useState();

  useEffect(() => {
    const getCurrencies = () => {
      fetch(
        "https://exchange-rates-api.oanda.com/v2/currencies.json?api_key=fc2c45c7-34ef-42c6-a38d-e1f76051e8f5"
        // + process.env.apiKey
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCurr(data);
        });
    };
    getCurrencies();
  }, []);

  const displayCurr = () => {
    if (curr) {
      return curr.currencies.map((curr) => {
        return (
          <p>
            {curr.code}- {curr.description}
          </p>
        );
      });
    }
  };
  return <main>{displayCurr()}</main>;
}
