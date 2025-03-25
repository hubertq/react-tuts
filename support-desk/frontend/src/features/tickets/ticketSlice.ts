import { createAppSlice } from "../../app/createAppSlice"
import { extractErrorMessage } from "../../utils"
import ticketAPI from "./ticketAPI"

export type TicketType = {
  _id: string
  user: string
  product: "iPhone" | "Macbook Pro" | "iMac" | "iPad"
  description: string
  status: "new" | "open" | "closed"
  createdAt: Date
  updatedAt: Date
}

export interface TicketSliceState {
  ticket: TicketType | null
  tickets: TicketType[]
  isLoading: boolean
}

const initialState: TicketSliceState = {
  ticket: null,
  tickets: [],
  isLoading: false,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const ticketSlice = createAppSlice({
  name: "ticket",
  initialState,
  reducers: create => ({
    createTicket: create.asyncThunk(
      async (
        ticketData: Pick<TicketType, "user" | "product" | "description">,
        { rejectWithValue },
      ) => {
        try {
          return await ticketAPI.create(ticketData)
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
          state.ticket = action.payload
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    getTickets: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          return await ticketAPI.getUserTickets()
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
          state.tickets = action.payload
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    getTicket: create.asyncThunk(
      async (ticketId: string, { rejectWithValue }) => {
        try {
          return await ticketAPI.getUserTicket(ticketId)
        } catch (error) {
          return rejectWithValue(extractErrorMessage(error))
        }
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.ticket = action.payload
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    closeTicket: create.asyncThunk(
      async (ticketId: string, { rejectWithValue }) => {
        try {
          return await ticketAPI.closeUserTicket(ticketId)
        } catch (error) {
          return rejectWithValue(extractErrorMessage(error))
        }
      },
      {
        pending: state => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.tickets.map(ticket =>
            ticket._id === action.payload._id
              ? (ticket.status = "closed")
              : ticket,
          )
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
  }),

  selectors: {
    selectTicket: ticket => ticket.ticket,
    selectTickets: ticket => ticket.tickets,
    selectStatus: ticket => ticket.isLoading,
  },
})

// Action creators are generated for each case reducer function.
export const { createTicket, getTickets, getTicket, closeTicket } =
  ticketSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTicket, selectTickets, selectStatus } =
  ticketSlice.selectors
