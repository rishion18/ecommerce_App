
import { FaCog } from 'react-icons/fa';
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useFetchUserQuery } from '../../store/cartAsyncReducers';
import { setCartAddAlert, setCurrentUser, setUserLoggedIn } from '../../store/productReducers';
import {useNavigate} from 'react-router-dom'






const Header = ({navBar , setNav}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [user , setUser] = useState('')
  const[uid , setId] = useState('')
  const[itemCount , setCount] = useState(0)

  const{userLoggedIn , itemsInCart} = useSelector(state => state.products);

  const accessToken = localStorage.getItem('accessToken');
  const { data: userData, isLoading, isError, error , refetch} = useFetchUserQuery(accessToken);

  const{cartUpdationFlag} = useSelector(state => state.products)

  const logOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    navigate('/')
  }

useEffect(() => {
if(userData){
  dispatch(setCurrentUser(userData))
  setUser(userData.userName)
  setId(userData.userId)
  setCount(userData.itemCount)
  dispatch(setCartAddAlert())
}

} , [userData])

useEffect(() => {
  if(userLoggedIn){
    dispatch(setUserLoggedIn(false));
  }
} , [userLoggedIn])

useEffect(() => {
  refetch()
} , [cartUpdationFlag])

  function openNav() {
    setNav(true);
  }

    return(
      <div className={`flex flex-col top-0 sticky z-10 ${navBar?'opacity-20':''}`} >
          <div className={`w-full flex h-16 items-center justify-between bg-slate-200`}>
            <div className='w-[100px] mx-3 flex justify-center items-center'>
              <FaBars onClick={openNav} className='w-6 h-6 cursor-pointer text-blue-600 hover:text-blue-900'/>
            </div>
            <div className='rounded-xl bg-white flex gap-2 items-center'>
                <CiSearch className=' text-gray-600 m-2 w-5 h-5'/>
                <input type="text" className="rounded-xl h-9 md:w-[500px] border-none" placeholder="search anything here ..."/>
            </div>
            <div className="mx-3 w-[100px] flex justify-center items-center">
              <FaCog className='w-6 h-6 cursor-pointer text-blue-600 hover:text-blue-900'/>
            </div>
          </div>
         
          <div className={`bg-slate-300 h-10 flex items-center justify-center transform transition ease-in duration-300 -z-10 ${user ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className='flex w-4/5 justify-around'>
              <div className='flex gap-2'>Welcome <p className='font-semibold'>{user}</p></div>
              <div>
                <button onClick={logOut} className='text-sm underline cursor-pointer'>Logout</button>
              </div>
              <Link to={`/cart/?u_id=${uid}`}>
                  <div className='flex items-center gap-2'>
                      <FaShoppingCart/>
                      <p className='text-sm text-white px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg'>{itemCount} items</p>
                  </div>
              </Link>
            </div>
          </div>
       </div>
    )
}

export default Header;