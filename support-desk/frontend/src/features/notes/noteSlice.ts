import { createAppSlice } from "../../app/createAppSlice"
import { extractErrorMessage } from "../../utils"
import noteAPI from "./noteAPI"

export type NoteType = {
  _id: string
  user: string
  staffId: string | null
  ticket: string
  text: string
  isStaff: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NoteSliceState {
  note: NoteType | null
  notes: NoteType[]
  isLoading: boolean
}

const initialState: NoteSliceState = {
  note: null,
  notes: [],
  isLoading: false,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const noteSlice = createAppSlice({
  name: "note",
  initialState,
  reducers: create => ({
    createNote: create.asyncThunk(
      async (
        { noteText, ticketId }: { noteText: string; ticketId: string },
        { rejectWithValue },
      ) => {
        try {
          return await noteAPI.createTicketNote(noteText, ticketId)
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
          state.notes.push(action.payload)
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
    getNotes: create.asyncThunk(
      async (ticketId: string, { rejectWithValue }) => {
        try {
          return await noteAPI.getTicketNotes(ticketId)
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
          state.notes = action.payload
        },
        rejected: state => {
          state.isLoading = false
        },
      },
    ),
  }),

  selectors: {
    selectNote: note => note.note,
    selectNotes: note => note.notes,
    selectStatus: note => note.isLoading,
  },
})

// Action creators are generated for each case reducer function.
export const { createNote, getNotes } = noteSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectNote, selectNotes, selectStatus } = noteSlice.selectors
