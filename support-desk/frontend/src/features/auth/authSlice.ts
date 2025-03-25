import { createAppSlice } from "../../app/createAppSlice"
import authAPI from "./authAPI"
import { extractErrorMessage } from "../../utils"

export type UserData = {
  _id: string
  token: string
  name: string
  email: string
  password: string
}

export interface AuthSliceState {
  user: Omit<UserData, "password"> | null
  isLoading: boolean
}

// Get user from localstorage
const user = localStorage.getItem("user")

const initialState: AuthSliceState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    register: create.asyncThunk(
      async (user: Omit<UserData, "_id" | "token">, { rejectWithValue }) => {
        try {
          return await authAPI.register(user)
        } catch (error) {
          return rejectWithValue(extractErrorMessage(error))
        }
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.isLoading = false
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    login: create.asyncThunk(
      async (
        user: Pick<UserData, "email" | "password">,
        { rejectWithValue },
      ) => {
        try {
          return await authAPI.login(user)
        } catch (error: any) {
          return rejectWithValue(extractErrorMessage(error))
        }
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.user = action.payload
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    logout: create.reducer(state => {
      authAPI.logout()
      state.user = null
    }),
  }),
  selectors: {
    selectUser: auth => auth.user,
    selectStatus: auth => auth.isLoading,
  },
})

// Action creators are generated for each case reducer function.
export const { register, login, logout } = authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser, selectStatus } = authSlice.selectors
