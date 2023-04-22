import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrency } from './currencyApi';

const initialState ={
    currency:{},
    isError: false,
    error: '',
    isLoading: false,
}

// thunk function
export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async ()=>{
    const currency = await getCurrency();
    return currency;
})



export const currencySlice = createSlice({
    name:"currency",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCurrency.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchCurrency.fulfilled, (state, action)=>{
            state.isError = false;
            state.currency = action.payload
        })
        .addCase(fetchCurrency.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message
            state.currency = {}
        })
    }
    
})

export default currencySlice.reducer;