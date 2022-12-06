import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: {
    loggedIn: false,
    showLinks: false,
    isAdmin: false,
    currentUserId: null,
    currentUserName: '',
    allProducts: null,
    cart: [],
  },

  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    setShowLinks: (state, action) => {
      state.showLinks = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload
    },
    setCurrentUserName: (state, action) => {
      state.currentUserName = action.payload
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload
    },
    setCart: (state, action) => {
      state.cart = action.payload
    }
  }
}
)

export const { setLoggedIn, setShowLinks, setIsAdmin, setCurrentUserId, setCurrentUserName, setAllProducts, setCart } = generalSlice.actions

export default generalSlice.reducer