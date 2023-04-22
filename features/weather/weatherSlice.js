import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPost, getWeather } from './weatherApi';

const initialState ={
    weather:{},
    dataPost: {},
    isError: false,
    error: '',
    isLoading: false,
}

// thunk function
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (query)=>{
    const weather = await getWeather(query);
    localStorage.setItem('weather', JSON.stringify(weather))
    return weather;
})

export const fetchPost = createAsyncThunk('post/fetchPost', async ({lat, lon})=>{
    const post = await getPost(lat, lon);
    return post;
})


export const weatherSlice = createSlice({
    name:"weather",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchWeather.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchWeather.fulfilled, (state, action)=>{
            state.isError = false;
            state.weather = action.payload
        })
        .addCase(fetchWeather.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message
            state.weather = {}
        })
        .addCase(fetchPost.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchPost.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.dataPost = action.payload
        })
        .addCase(fetchPost.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message,
            state.dataPost = {}
        })
    }
    
})

export default weatherSlice.reducer;