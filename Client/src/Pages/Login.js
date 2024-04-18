import React, { useContext } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../Context/Context';
import { Input } from '../Components/Input';
import { axios } from '../Utils/Axios';
import Button from '../Components/Button';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(PetContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;
    const loginData = { email, password };
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

    if (!email || !password) {
      return toast.error('Enter All the Inputs');
    }

    const endpoint = email === adminEmail ? '/api/admin/login' : '/api/users/login';

    try {
      const response = await axios.post(endpoint, loginData);
      email === adminEmail
        ? localStorage.setItem('role', 'admin')
        : localStorage.setItem('userID', response.data.data.userID);

      localStorage.setItem('name', response.data.data.name);
      localStorage.setItem('jwt_token', response.data.data.jwt_token);
      toast.success(response.data.message);
      setLoginStatus(true);
      navigate(email === adminEmail ? '/dashboard' : '/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <MDBContainer className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 text-black">Welcome back</h1>

        <Input type="email" label="Email Address" name="email" />
        <Input type="password" label="Password" name="password" />

        <Button type="submit" className="mb-4 w-100" color="black">
          Log in
        </Button>

        <div className="pointer text-center">
          <p>
            Don't have an account?{' '}
            <span className="text-black fw-bold" onClick={() => navigate('/registration')}>
              Register
            </span>
          </p>
        </div>
      </form>
    </MDBContainer>
  );
}

export default Login;
