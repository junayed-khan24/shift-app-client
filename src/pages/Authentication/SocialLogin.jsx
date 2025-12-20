import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';




const SocialLogin = () => {

    const { signinWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {



        signinWithGoogle()
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Google Login Succesfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='text-center'>
            <p>or</p>
            <div className='text-center flex items-center text-1xl font-bold btn mt-2'
                onClick={handleGoogleSignIn}
            >
                <FcGoogle size={24} />
                Login With Google
            </div>
        </div>
    );
};

export default SocialLogin;