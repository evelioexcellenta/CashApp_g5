import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3300/login", {
        Email: user.email,
        Password: user.password,
      })
      const data = response.data
      localStorage.setItem("token", data.token)
      return data
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const LogOut = createAsyncThunk("user/Logout", async () => {
  await axios.delete("http://localhost:3300/logout", {
    headers: {
      Authorization: `Bearer ${localStorage.removeItem("token")}`,
    },
  })
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })

    //Get User Login
    // builder.addCase(getMe.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(getMe.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.user = action.payload
    // })
    // builder.addCase(getMe.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // })

    //logout
    builder.addCase(LogOut.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(LogOut.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = null
    })
    builder.addCase(LogOut.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
