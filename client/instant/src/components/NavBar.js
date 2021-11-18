import './navbar.css'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function NavBar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Instant App</span>
        </Link>
      </div>
      <div className="topbarCenter"></div>
      <div className="topbarRight">
        <Link to={`/profile/`}>
          <AccountCircleIcon />
        </Link>
      </div>
    </div>
  )
}
