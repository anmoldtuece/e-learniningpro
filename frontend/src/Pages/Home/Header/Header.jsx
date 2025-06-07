import './Header.css'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Logo from '../../Images/logo.svg'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo Section */}
          <NavLink to='/' className="logo-link" onClick={closeMobileMenu}>
            <div className="logo">
              <img src={Logo} alt="DTU E-learning Logo" />
              <span className="logo-text">DTU E-learning</span>
            </div>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li>
                <NavLink 
                  to='/' 
                  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/courses' 
                  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/about' 
                  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/contact' 
                  className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="auth-section">
            <NavLink to='/login' className="login-link" onClick={closeMobileMenu}>
              Login
            </NavLink>
            <NavLink to='/signup' onClick={closeMobileMenu}>
              <button className="cta-button">Get Started</button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
        
        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-list">
            <li>
              <NavLink 
                to='/' 
                className={({isActive}) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/courses' 
                className={({isActive}) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/about' 
                className={({isActive}) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/contact' 
                className={({isActive}) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          
          <div className="mobile-auth">
            <NavLink to='/login' className="mobile-login" onClick={closeMobileMenu}>
              Login
            </NavLink>
            <NavLink to='/signup' onClick={closeMobileMenu}>
              <button className="mobile-cta">Get Started</button>
            </NavLink>
          </div>
        </nav>
      </header>
      <div className="header-spacer"></div>
    </>
  )
}

export default Header
