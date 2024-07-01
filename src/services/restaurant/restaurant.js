import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const getPromotion = createAsyncThunk(
    "promotion/getPromotion",
    async (restaurantId, { rejectWithValue }) => {
    try {
        const { data } = await instance.get(`/promotions/getallpromotionsusers/${restaurantId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getFoods = createAsyncThunk(
    "foods/getFoods",
    async (restaurantId, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(`/foods/allfoodsbyrestaurant/${restaurantId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (restaurantId, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(`/resturantaddedliquors/allliquorsbyrestaurant/${restaurantId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });
