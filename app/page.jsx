/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState([{}]);
  const [baseCountry, setBaseCountry] = useState({});
  const [convCountry, setCovCountry] = useState({});
  useEffect(() => {
    const getCountries = () =>
      fetch("/countries.json")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
          console.log(data);
        });
    getCountries();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <select
        onChange={(event) => {
          setBaseCountry(event.target.value);
        }}
      >
        {countries.map((country) => {
          return <option value={country.code}>{country.description}</option>;
        })}
      </select>
      <select
        onChange={(event) => {
          setCovCountry(event.target.value);
        }}
      >
        {countries.map((country) => {
          return <option value={country.code}>{country.description}</option>;
        })}
      </select>
    </main>
  );
}
