import { db } from "../../firebaseInit";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  orders: [],
  orderPlaced: false,
  loadingCart: false,
  message: false,
};

export const setInitialState = createAsyncThunk(
  "cart/setInitialState",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(cartActions.loading());

    let docRef = collection(db, "carts");
    let q = query(
      docRef,
      where("uid", "==", payload.user.uid),
      orderBy("created_at", "desc")
    );
    onSnapshot(q, (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let cart_arr = data.filter((ele) => ele.ordered === false);
      let orders_arr = data.filter((ele) => ele.ordered === true);

      thunkAPI.dispatch(
        cartActions.setInitialState({
          cart: cart_arr.length > 0 ? cart_arr[0] : null,
          orders: orders_arr,
        })
      );
    });
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (payload, thunkAPI) => {
    try {
      const docNew = {
        uid: payload.user.uid,
        items: [{ ...payload.product, qty: 1 }],
        totalPrice: payload.product.price,
        ordered: false,
        created_at: new Date(),
      };

      const docRef = collection(db, "carts");
      await addDoc(docRef, docNew);
      //   setCart({ id: newDocRef.id, ...docNew });
      thunkAPI.dispatch(
        cartActions.setNotification({ success: payload.success_msg })
      );
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        cartActions.setNotification({ error: "Something Went Wrong!!!" })
      );
    }
  }
);

export const updateCart = createAsyncThunk(
  "car/updateCart",
  async (payload, thunkAPI) => {
    try {
      const docRef = doc(db, "carts", payload.cart.id);
      await updateDoc(docRef, {
        items: payload.items,
        totalPrice: payload.totalPrice,
      });
      thunkAPI.dispatch(
        cartActions.setNotification({ success: payload.success_msg })
      );
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        cartActions.setNotification({ error: "Something Went Wrong!!!" })
      );
    }
  }
);

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (payload, thunkAPI) => {
    try {
      const docRef = doc(db, "carts", payload.cart_id);
      await updateDoc(docRef, {
        ordered: true,
        ordered_at: new Date(),
        order_id: uuidv4(),
      });
      thunkAPI.dispatch(cartActions.setOrderPlaced());
      thunkAPI.dispatch(
        cartActions.setNotification({
          success: "Congratulations!! Your Order has been Confirmed",
        })
      );
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        cartActions.setNotification({ error: "Something Went Wrong!!!" })
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loadingCart = true;
    },
    setInitialState: (state, action) => {
      state.cart = action.payload.cart;
      state.orders = action.payload.orders;
      state.loadingCart = false;
    },
    setOrderPlaced: (state, action) => {
      state.orderPlaced = true;
    },
    resetOrderPlaced: (state, action) => {
      state.orderPlaced = false;
    },
    setNotification: (state, action) => {
      state.message = true;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer;
