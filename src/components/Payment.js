import React, {useState, useEffect} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from "./CheckoutProducts";
import {Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import axios from '../axios';


const Payment = () => {

    const [{basket , user},dispatch] = useStateValue();
     
    const history=useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
     
    useEffect(() => {
         const getclientSecret = async() => {
              const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
         }
       getclientSecret()
    }, [basket])
    

    console.log('THE SECRET IS >>>', clientSecret);
    
    const handleSubmit =async (event) => {
               event.preventDefault();
               setProcessing(true);

             const payLoad = await stripe.confirmCardPayment(clientSecret, {
                 payment_method:{
                     card: elements.getElement(CardElement)
                 }
             }).then(({ paymentIntent}) => {
                 setSucceeded(true);
                 setError(null);
                 setProcessing(false);
                 history.replace('/orders'); 
             })
    }


    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }



    return (
        <div className="payment">
        <div className="payment__container">
    {/**address section */}
    <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
    <div className="payment__section">
    <div className="paymet__title">Delivary Address</div>
    <div className="payment__address">
    <p>{user?.email}</p>
    <p>2nd street</p>
    <p>Ramnad,tamilnadu</p>
    </div>
    </div>
    {/** review section*/}
    <div className='payment__section'>
    <div className='payment__title'>
        <h3>Review items and delivery</h3>
    </div>
    <div className='payment__items'>
        {basket.map(item => (
            <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
            />
        ))}
    </div>
</div>
    {/** payment section*/}
    <div className='payment__section'>
    <div className="payment__title">
        <h3>Payment Method</h3>
    </div>
    <div className="payment__details">
            {/* Stripe magic will go */}

            <form onChange={handleSubmit} >
                <CardElement  onChange={handleChange}/>

                <div className='payment__priceContainer'>
                <CurrencyFormat
                    renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rs."}
                />
              
                <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                
                </button>
            </div>
                  {/* Errors */}
              {error && <div>{error}</div>}
            </form>
    </div>
</div>
        
    </div>   
        </div>
    )
}

export default Payment
