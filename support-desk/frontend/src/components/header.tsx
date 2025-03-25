import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { logout, selectUser } from "../features/auth/authSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
