import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../AxiosOrders";

export const getAllProducts = createAsyncThunk(
    "allProducts/getAllProducts",
    async (page, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(`/liquors/allproductsforuser`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const getSelectedProduct = createAsyncThunk(
    "select/product",
    async (page, { rejectWithValue }) => {
            return page;
    });

export const postReviews = createAsyncThunk(
    "postReviews/Reviews",
    async ({ Data, productId}, { rejectWithValue }) => {
        try {
            const { data } = await instance.post(`/reviews/addreview/${productId}`, Data,
                {
                    headers: { "Content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify(Data),
                },
        );
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getProductReviews = createAsyncThunk(
    "productReviews/Reviews",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(`/liquors/${productId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


export const deleteReview = createAsyncThunk(
    'deleteReview/DeleteReview',
    async (id, { rejectWithValue }) => {
        try {
            const data = await instance.delete(`/reviews/delete/${id}`,
                // headers: { "Content-type": "application/json; charset=utf-8" },

            );
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

