import React, {useEffect} from 'react' 
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login';
import { auth } from './firebase';
import {useStateValue} from './components/StateProvider';
import {loadStripe} from "@stripe/stripe-js"
import {Element, Elements} from "@stripe/react-stripe-js"


const promise = loadStripe('pk_test_51IrZtXSBL35nS4KXQp688i17724y4b1FPDp7siLu2V2Y8LQ2vnE10Vf11aBS4Kq2E1MaRbvuLyGrDWP6hlC8jmvc00xfIJ0z/Hy');

function App() {

  const[{},dispatch] = useStateValue();

  useEffect(()=> {
 
   auth.onAuthStateChanged(authUser => {
     console.log('this is user',authUser)

    if(authUser){

      //user loged in
      
    dispatch({
      type:'SET_USER',
      user:authUser
    })

    }
    else{
       ///user loged out
       dispatch({
        type:'SET_USER',
        user:null
      })
  
    }

   })

  },[])
  
  return (
    <Router>
    <div className="App">

    <Switch>
       {/**router for checkout page */}
      
    <Route path="/login">
    <Login/>
    </Route>
    <Route path="/checkout">
    <Header/>      
    <Checkout/>
    </Route>
    <Route path="/payment">
    <Header/>  
    <Elements stripe={promise}>
    <Payment/>
    </Elements>  
    </Route>
    <Route path="/">
    <Header/>
    <Home/>
    </Route>
    
    </Switch>
   </div>
    </Router>
   
  );
}

export default App;
