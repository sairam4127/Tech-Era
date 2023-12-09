import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="Nav">
    <Link to="/" className="link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo-img"
      />
    </Link>
  </nav>
)

export default Header
