import { Outlet } from "react-router"
import Header from "./components/header"

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  )
}
export default Layout
