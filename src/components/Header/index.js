import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="main-header">
      <nav className="nav-bar">
        <h2>HeroBook</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favoritos">Favoritos</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;