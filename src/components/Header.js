import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import {useStateValue} from './StateProvider'
import {auth} from '../firebase'
 
const Header = () => {
  
    const [{basket , user},dispatch] = useStateValue();
    
    const handleAuthendication = () => {
        if(user){
            auth.signOut();
        }
    }



    return (
        <div className="header">
        <Link to="/"> 
         <img className="header__logo" src={logo} alt="logo"/>
        </Link>
      
       
        <div className="header__search">
         <input type="text" name="" className="header__searchInput"/>
         {/*logo*/}
         <SearchIcon
         className="header__searchIcon"
         />
         </div>

          <div className="header__nav">
         
          <Link to={!user && '/login'}>
          <div onClick={handleAuthendication} className="header__option">
          <span className="header__optionLineOne">Hello</span>
          <span className="header__optionLineTwo">{user ? 'SignOut' : 'SignIn' }</span>
          </div>
          </Link>
          <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
          </div>
          <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
          </div>
          <Link to="/checkout"> 
          <div className="hearder__optionBasket">
          <ShoppingBasketIcon/>
          <span className="header__optionCount">{basket?.length}</span>
          </div>
          </Link>
         
          
          </div>
        
          </div>
    )
}

export default Header
