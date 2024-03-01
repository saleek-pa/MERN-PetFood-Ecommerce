import React from 'react';
import { MDBInput, MDBRadio, MDBTextArea } from 'mdb-react-ui-kit';

const Input = ({ type, label, name, value, onChange }) => {
  return (
    <MDBInput
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      wrapperClass="mb-4 p-1"
      min="1"
      required
    />
  );
};

const TextArea = ({ type, label, name, value, onChange }) => {
  return (
    <MDBTextArea
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      className="mb-4"
      rows="4"
      required
    />
  );
};

const Radio = ({ key, label, checked, value, onChange }) => {
  return (
    <MDBRadio
      key={key}
      label={label}
      name="category"
      checked={checked}
      value={value}
      onChange={onChange}
      inline
    />
  );
};

export { Input, TextArea, Radio };
