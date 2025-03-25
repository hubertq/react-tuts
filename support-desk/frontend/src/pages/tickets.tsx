import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getTickets, selectTickets } from "../features/tickets/ticketSlice"
import Spinner from "../components/spinner"
import BackButton from "../components/back-button"
import TicketItem from "../components/ticket-item"

const TicketsPage = () => {
  const tickets = useAppSelector(selectTickets)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])
  if (!tickets) return <Spinner />

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}
export default TicketsPage
