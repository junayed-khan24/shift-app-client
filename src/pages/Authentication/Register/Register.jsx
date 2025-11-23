import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl text-center font-bold">Create an Acount!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* email fied */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {required: true, minLength: 6})} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-400'>password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 Characters</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
};

export default Register;