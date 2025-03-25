import axios from "axios"
import { TicketType } from "./ticketSlice"

const API_URL = "http://localhost:5000/api/tickets"

// Create Ticket
const create = async (
  ticketData: Pick<TicketType, "user" | "product" | "description">,
) => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.post(API_URL, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
}

// Fetch user tickets
const getUserTickets = async () => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  }
}

// Fetch ticket
const getUserTicket = async (id: string) => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.get(API_URL + "/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  }
}
// Close ticket
const closeUserTicket = async (id: string) => {
  const user = localStorage.getItem("user")
  if (user) {
    const { token } = JSON.parse(user)
    const response = await axios.patch(
      API_URL + "/" + id,
      { status: "closed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  }
}

const ticketAPI = {
  create,
  getUserTickets,
  getUserTicket,
  closeUserTicket,
}
export default ticketAPI
