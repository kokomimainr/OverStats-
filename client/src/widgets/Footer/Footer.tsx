import React from 'react';
import { useNavigate } from 'react-router-dom';

type FooterProps = {
}

const Footer = ({}: FooterProps): JSX.Element => {
    const navigate = useNavigate();
  return (
    <div className='Footer'>
        <div className="container my-5">
        <footer style={{ backgroundColor: "transparent" }} className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            © 2024 Juicy Pussy, Inc
          </p>

          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <img
              src="/OverStats.png"
              alt="Logo"
              width="10%"
              height="7%"
              className="d-inline-block align-text-top mx-3"
            />
          </a>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a
                onClick={() => navigate("/")}
                className="nav-link px-2 text-body-secondary"
              >
                Главная
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate("/stats")}
                className="nav-link px-2 text-body-secondary"
              >
                Статистика
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate("/heroes")}
                className="nav-link px-2 text-body-secondary"
              >
                Герои
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
