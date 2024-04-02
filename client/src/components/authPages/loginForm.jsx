import React, { useState } from 'react';
import { setCartAddAlert, setUserLoggedIn } from '../../store/productReducers';
import { useDispatch } from 'react-redux';
import { useUserLoginMutation } from '../../store/cartAsyncReducers';

const LoginForm = ({setLoginActive}) => {

    const dispatch = useDispatch()

const[loginBody , setLoginBody] = useState({
    email:'',
    password:'',
    role:'customer'
})


const handleLoginBodyChange = (e) => {
    const {value , name} = e.target
    setLoginBody((prev) => ({
        ...prev,
        [name]:value
    }))
}

const [login, { isLoading, isError }] = useUserLoginMutation();


const handleSubmit = async (e) => {
    e.preventDefault();  
    if (!isLoading && !isError) {
      try {
        const response = await login({body:loginBody});
  
        if (response.data) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          dispatch(setCartAddAlert());
          alert(response.data.message);
          dispatch(setUserLoggedIn(true));
          setLoginActive(false);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred during login');
      }
    }
  };
  


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) => {handleLoginBodyChange(e)}} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => {handleLoginBodyChange(e)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                   <button onClick={(e) => {handleSubmit(e)}} className='px-2 py-1 rounded-xl text-sm bg-blue-500 hover:bg-blue-800 text-white'>Sign in</button>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
