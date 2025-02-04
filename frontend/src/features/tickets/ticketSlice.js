import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create a new ticket
export const createTicket = createAsyncThunk( 
    "tickets/create",
    async (ticketData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const getTickets = createAsyncThunk(
    "tickets/getAll",
    async (_, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const getTicket = createAsyncThunk(
    "tickets/get",
    async (ticketId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const closeTicket = createAsyncThunk(
    "tickets/close",
    async (ticketId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const updateAnswer = createAsyncThunk(
    "tickets/updateAnswer",
    async ({ ticketId, answer }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.updateAnswer(ticketId, answer, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTicket.pending, (state) => {
          state.isLoading = true
       })
        .addCase(getTicket.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.ticket = action.payload
       })
      .addCase(getTicket.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
      .addCase(updateAnswer.pending, (state) => {
        state.isLoading = true
    })
    .addCase(updateAnswer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const updatedTicket = action.payload
        state.tickets = state.tickets.map((ticket) =>
            ticket._id === updatedTicket._id ? updatedTicket : ticket
        )
    })
    .addCase(updateAnswer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets.map((ticket)=> ticket._id === action.payload._id ? (ticket.statusu = 'closed') : ticket)
    })

    },
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer

 

