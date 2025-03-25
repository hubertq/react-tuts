import { Route, Routes } from "react-router"
import Layout from "./layout"
import HomePage from "./pages/home"
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import NotFoundPage from "./pages/not-found"
import CreateTicketPage from "./pages/create-ticket"
import ProtectedRoute from "./components/protected-route"
import TicketsPage from "./pages/tickets"
import TicketPage from "./pages/ticket"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create-ticket" element={<CreateTicketPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/tickets" element={<TicketsPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/ticket/:ticketId" element={<TicketPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
