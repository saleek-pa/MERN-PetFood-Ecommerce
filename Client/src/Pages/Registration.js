import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Components/Input';
import { axios } from '../Utils/Axios';
import Button from '../Components/Button';
import toast from 'react-hot-toast';

function Registration() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!name || !email || !password) {
      toast.error('Enter All the Inputs');
    }

    try {
      const userData = { name, email, password };
      const response = await axios.post('/api/users/register', userData);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <MDBContainer className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 text-black">Create an account</h1>

        <Input type="text" label="Full Name" name="name" />
        <Input type="email" label="Email Address" name="email" />
        <Input type="password" label="Password" name="password" />

        <Button type="submit" className="mb-4 w-100" color="black">
          Create Account
        </Button>

        <div className="pointer text-center">
          <p>
            Already have an account?{' '}
            <span className="text-dark fw-bold" onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </div>
      </form>
    </MDBContainer>
  );
}

export default Registration;
