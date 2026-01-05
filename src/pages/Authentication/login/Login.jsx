import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();

   const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/'; 


  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(result => {
        console.log("Logged In:", result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Login Succesfully",
          showConfirmButton: false,
          timer: 1500
        });

        navigate(from, { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <div className="card-body">

        <h1 className="text-3xl text-center font-bold">Please Login!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">

            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className='text-red-400'>Email is required</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === 'required' && (
              <p className='text-red-400'>Password is required</p>
            )}

            {errors.password?.type === 'minLength' && (
              <p className='text-red-400'>Password must be at least 6 characters</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type='submit' className="btn btn-primary mt-4">
              Login
            </button>
          </fieldset>

          <p className='text-center mt-2'>
            <small>
              New here? <Link to="/register" className='btn btn-link'>Register</Link>
            </small>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
