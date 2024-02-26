/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [curr, setCurr] = useState();

  useEffect(() => {
    const getCurrencies = () => {
      fetch("/countries.json")
        .then((res) => res.json())
        .then((data) => {
          setCurr(data);
        });
    };
    getCurrencies();
  }, []);

  const displayCurr = () => {
    if (curr) {
      return curr.map((curr) => {
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
