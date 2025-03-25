import axios from "axios"

const API_URL = "http://localhost:5000/api/tickets/"

// Create Ticket Note
const createTicketNote = async (noteText: string, ticketId: string) => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.post(
      API_URL + ticketId + "/notes",
      { text: noteText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  }
}

// Fetch ticket notes
const getTicketNotes = async (ticketId: string) => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.get(API_URL + ticketId + "/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  }
}

const noteAPI = {
  createTicketNote,
  getTicketNotes,
}
export default noteAPI
