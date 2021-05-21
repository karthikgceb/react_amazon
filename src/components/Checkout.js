import React from 'react'
import './Checkout.css'
import  Subtotal from './Subtotal'
import ad from '../images/ad_banner.jpg'
import CheckoutProducts from './CheckoutProducts'
import { useStateValue } from "./StateProvider";

const Checkout = () => {

    const [{ basket , user }, dispatch] = useStateValue();


    return (
        <div className="checkout">
        
        <div className="checkout__left">
        <img src={ad} alt="" className="checkout__ad"/>
      

       <div >
       <h3>Hello , {user?.email}</h3>
       <h2 className="checkout__title">Your Shopping Basket</h2>
       {/* Basket item*/}
       {basket.map(item => (
        <CheckoutProducts
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      </div>
      </div>
     <div className="checkout__right">
      <Subtotal/>
    </div>
    </div>
    )
}

export default Checkout
