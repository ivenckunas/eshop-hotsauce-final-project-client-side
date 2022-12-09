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
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    swiperArray: null,
    productToEdit: {},
    errorMessage: null,
    showChat: false,
    showReviews: false,
    reviews: []
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
    },
    setSwiperArray: (state, action) => {
      state.swiperArray = action.payload
    },
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setShowChat: (state, action) => {
      state.showChat = action.payload
    },
    setShowReviews: (state, action) => {
      state.showReviews = action.payload
    }
  }
}
)

export const { setLoggedIn, setShowLinks, setIsAdmin, setCurrentUserId, setCurrentUserName, setAllProducts, setCart, setSwiperArray, setProductToEdit, setErrorMessage, setShowChat, setShowReviews } = generalSlice.actions

export default generalSlice.reducer