import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signinModal: false,
  signupModal: false,
  signedInUser: false,
  placeOrder: {},
  allOrders: {},
  orderWindowModal: false,
  addressSelected: "",
  addressRemoved: "",
  selectedDough: [],
  showModal: false,
  order: [],
  quantity: [],
  totalPriceOfEachOrder: [],
  sumOfAllOrders: 0,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {
    setSigninModal: (state, action) => {
      state.signinModal = action.payload;
    },
    setSignupModal: (state, action) => {
      state.signupModal = action.payload;
    },
    setUserSiginStatus: (state, action) => {
      state.signedInUser = action.payload;
    },
    setSelectedDough: (state, action) => {
      state.selectedDough = action.payload;
    },
    setModal: (state, action) => {
      state.showModal = action.payload;
    },
    setOrder: (state, action) => {
      return {
        ...state,
        order: state.order.concat(action.payload),
      };
    },

    setQuantity: (state, action) => {
      return {
        ...state,
        quantity: state.quantity.concat(action.payload),
      };
    },

    increaseQuantity: (state, action) => {
      state.quantity[action.payload] = state.quantity[action.payload] + 1;
    },
    decreaseQuantity: (state, action) => {
      if (state.quantity[action.payload] > 0) {
        state.quantity[action.payload] = state.quantity[action.payload] - 1;
      } else {
        return;
      }
    },

    setTotalPriceOfEachOrder: (state, action) => {
      state.totalPriceOfEachOrder[action.payload] =
        state.quantity[action.payload] * state.order[action.payload].price;

      if (state.totalPriceOfEachOrder[action.payload] === 0) {
        state.order[action.payload] = null;
        state.totalPriceOfEachOrder[action.payload] = null;
        state.quantity[action.payload] = null;

        state.order = state.order.filter(Boolean);
        state.totalPriceOfEachOrder =
          state.totalPriceOfEachOrder.filter(Boolean);
        state.quantity = state.quantity.filter(Boolean);
      }
    },
    addUserAdress: (state, action) => {
      state.addUserAddress = action.payload;
    },
    setOrderWindowModal: (state, action) => {
      state.orderWindowModal = action.payload;
    },
    clearOrder: (state) => {
      state.order = [];
      state.quantity = [];
      state.selectedDough = [];
      state.totalPriceOfEachOrder = [];
      state.placeOrder = {};
    },
    resetStore: () => initialState,
  },
});

export const getSigninModal = (state) => state.pizza.signinModal;
export const getSignupModal = (state) => state.pizza.signupModal;
export const getCreatedOrderData = (state) => state.pizza.placeOrder;
export const getPlacedOrder = (state) => state.pizza.placeOrder;
export const getAllOrders = (state) => state.pizza.allOrders;
export const getOrderWindowModal = (state) => state.pizza.orderWindowModal;
export const getSelectedDough = (state) => state.pizza.selectedDough;
export const getModal = (state) => state.pizza.showModal;
export const getOrder = (state) => state.pizza.order;
export const getQuantity = (state) => state.pizza.quantity;
export const getSumOfAllOrders = (state) => state.pizza.totalPriceOfEachOrder;
export const getNewUserAddress = (state) => state.pizza.addUserAddress;

export const {
  setSigninModal,
  setSignupModal,
  setSelectedDough,
  setUserSiginStatus,
  setModal,
  setOrder,
  setQuantity,
  increaseQuantity,
  decreaseQuantity,
  setTotalPriceOfEachOrder,
  setOrderWindowModal,
  setIndexOfSelectedAddress,
  setIndexOfRemovedAddress,
  clearOrder,
  resetStore,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
