import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-info">
        <h2>HIGH QUALITY</h2>
        <h1>PET FOOD</h1>
        <p>Sale up to 40% off today</p>
        <Button color="black" className="header-button" onClick={() => navigate('/products')}>
          Shop Now
        </Button>
      </div>
    </header>
  );
};

export default Header;
