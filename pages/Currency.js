import Navabar from "@/components/Navabar";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyInput from "@/components/CurrencyInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "@/features/currency/currencySlice";

const Currency = () => {
  const dispatch = useDispatch();
  const { currency, error } = useSelector((state) => state.currency);
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  useEffect(() => {
    dispatch(fetchCurrency());
  }, []);

  useEffect(() => {
    if (!!currency.rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [currency.rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(
      format((amount1 * currency.rates[currency2]) / currency.rates[currency1])
    );
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(
      format((amount1 * currency.rates[currency2]) / currency.rates[currency1])
    );
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(
      format((amount2 * currency.rates[currency1]) / currency.rates[currency2])
    );
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(
      format((amount2 * currency.rates[currency1]) / currency.rates[currency2])
    );
    setCurrency2(currency2);
  }

  return (
    <div>
      {!currency.rates ? (
        <p className="text-center">loading...</p>
      ) : (
        <div className=" mt-11">
          <div>
            <h1 className=" text-center text-lg mt-10 mb-10">
              Currency Converter
            </h1>
            <div className="city flex-1">
              <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(currency.rates)}
                amount={amount1}
                currency={currency1}
              />
              <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(currency.rates)}
                amount={amount2}
                currency={currency2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;
