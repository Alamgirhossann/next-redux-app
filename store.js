import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./features/weather/weatherSlice";
import currencySlice from "./features/currency/currencySlice";

export const store = configureStore({
    reducer: {
        weather: weatherSlice,
        currency: currencySlice
    },
});
