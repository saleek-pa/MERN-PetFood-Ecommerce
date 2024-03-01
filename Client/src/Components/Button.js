import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const Button = ({ children, type, color, className, style, onClick }) => {
  return (
    <MDBBtn type={type} rounded color={color} className={className} style={style} onClick={onClick}>
      {children}
    </MDBBtn>
  );
};

export default Button;
