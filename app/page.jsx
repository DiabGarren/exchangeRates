/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // Store all coutries
  const [countries, setCountries] = useState([{}]);
  // Store base and converted countries
  const [baseCountry, setBaseCountry] = useState({ code: "", value: 0.0 });
  const [convCountry, setConvCountry] = useState({ code: "", value: 0.0 });

  // Get the list of all countries from the JSON file on page load
  useEffect(() => {
    const getCountries = () =>
      fetch("/countries.json")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
          setBaseCountry(() => {
            return { code: data[0].code, value: 0.0 };
          });
          setConvCountry(() => {
            return { code: data[0].code, value: 0.0 };
          });
          console.log(data);
        });
    getCountries();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-[25px] font-[600]">Currency Converter</h1>
      <div className="grid grid-cols-2 gap-[20px_10px] mt-[50px]">
        <select
          className="p-[5px_10px] rounded-[5px]"
          // When the value is changed
          onChange={(event) => {
            // Set the base country
            setBaseCountry(() => {
              return { code: event.target.value, value: baseCountry.value };
            });

            // Use the API to update the converted country's value
            fetch(
              "https://exchange-rates-api.oanda.com/v2/rates/spot.json?api_key=fc2c45c7-34ef-42c6-a38d-e1f76051e8f5&base=" +
                event.target.value +
                "&quote=" +
                convCountry.code
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setConvCountry(() => {
                  return {
                    code: convCountry.code,
                    // Use the exchange rate multiplied by the base country's value and round to 2 decimal places
                    value: (data.quotes[0].bid * baseCountry.value).toFixed(2),
                  };
                });
              });
          }}
        >
          {countries.map((country) => {
            return <option value={country.code}>{country.description}</option>;
          })}
        </select>
        <input
          type="number"
          className="border rounded-[5px] p-[5px_10px]"
          value={baseCountry.value}
          // When the value is changed
          onChange={async (event) => {
            // Update the converted country's value
            setBaseCountry(() => {
              return {
                code: baseCountry.code,
                value: parseInt(event.target.value),
              };
            });

            // Use the API to update the base country's value
            fetch(
              "https://exchange-rates-api.oanda.com/v2/rates/spot.json?api_key=fc2c45c7-34ef-42c6-a38d-e1f76051e8f5&base=" +
                baseCountry.code +
                "&quote=" +
                convCountry.code
            )
              .then((res) => res.json())
              .then((data) => {
                setConvCountry(() => {
                  return {
                    code: convCountry.code,
                    // Use the exchange rate multiplied by the converted country's value and round to 2 decimal places
                    value: (
                      data.quotes[0].bid * parseInt(event.target.value)
                    ).toFixed(2),
                  };
                });
              });
          }}
        />

        <select
          className="p-[5px_10px] rounded-[5px]"
          onChange={(event) => {
            // When the value is changed
            setConvCountry(() => {
              // Set the converted country
              return { code: event.target.value, value: convCountry.value };
            });

            // Use the API to update the base country's value
            fetch(
              "https://exchange-rates-api.oanda.com/v2/rates/spot.json?api_key=fc2c45c7-34ef-42c6-a38d-e1f76051e8f5&base=" +
                event.target.value +
                "&quote=" +
                baseCountry.code
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setBaseCountry(() => {
                  return {
                    code: baseCountry.code,
                    // Use the exchange rate multiplied by the converted country's value and round to 2 decimal places
                    value: (data.quotes[0].bid * convCountry.value).toFixed(2),
                  };
                });
              });
          }}
        >
          {countries.map((country) => {
            return <option value={country.code}>{country.description}</option>;
          })}
        </select>

        <input
          type="number"
          className="border rounded-[5px] p-[5px_10px]"
          value={convCountry.value}
          // When the value is changed
          onChange={async (event) => {
            // Update the converted country's value
            setConvCountry(() => {
              return {
                code: convCountry.code,
                value: parseInt(event.target.value),
              };
            });

            // Use the API to update the base country's value
            fetch(
              "https://exchange-rates-api.oanda.com/v2/rates/spot.json?api_key=fc2c45c7-34ef-42c6-a38d-e1f76051e8f5&base=" +
                convCountry.code +
                "&quote=" +
                baseCountry.code
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setBaseCountry(() => {
                  return {
                    code: baseCountry.code,
                    // Use the exchange rate multiplied by the converted country's value and round to 2 decimal places
                    value: (
                      data.quotes[0].bid * parseInt(event.target.value)
                    ).toFixed(2),
                  };
                });
              });
          }}
        />
      </div>
    </main>
  );
}
