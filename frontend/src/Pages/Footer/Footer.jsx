import React from 'react';
import { Link } from 'react-router-dom'; // ← import Link
import '../Home/Landing/Landing.css';

function Footer() {
  return (
    <div className="footer">
      <div className="rightPart">
        <div className="links">
          <div className="link">
            <hr />
            <Link to="/">Home</Link>
          </div>
          <div className="link">
            <hr />
            <Link to="/about">About</Link>
          </div>
          
          <div className="link">
            <hr />
            <Link to="/courses">Courses</Link>
          </div>
          <div className="link">
            <hr />
            <Link to="/contact">Contact Us</Link>
          </div>
          
        </div>

        <hr className="hr" />

        <div className="icons">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/698567c8ecd3b39bb1b6ac6c68e44bb80ac15d62" width={50} alt="LinkedIn" />
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/04e756fd5877045a0932d92fb8410e1b6b560854" width={50} alt="Twitter" />
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/ecc888c1307cf0749389002f82f9871d6988c809" width={50} alt="Facebook" />
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c3fb00857c69eb46b393dba8d759e426171ef02f" width={50} alt="GitHub" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
