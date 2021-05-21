import React from 'react'
import './Home.css'
import Product from './Product'
import homeLogo from '../images/home_logo.jpg'
import img1 from '../images/img1.png'
import img2 from '../images/headset.png'
import img3 from '../images/shoe.png'
import img4 from '../images/watch1.png'
import img5 from '../images/phone.png'
import img6 from '../images/moniter.jpg'
function Home() {
    return (
        <div className="home">

        <div className="home__container">
       
        <img className="home__image"  src={homeLogo} alt=""/>
       
        
        <div className="home__row">

         <Product 
         title='The Lean Startup is about learning what your customers really want — and learning it quickly'
         price={199}
         image={img1}
         rating={5}
         id={11110}
         />

         <Product
         title='Boat headset are designed to give you an experience which no other brand can match. 
         '
         price={1499}
         image={img2}
         rating={5}
         id={11111}
         />

         <Product
         title='Nike shoes comes with a herringbone pattern and a solid rubber, 
         which adds to the comfort and support of users.'
         price={599}
         image={img3}
         rating={5}
         id={11112}
         />
         </div>

         <div className="home__row">
         <Product
         title='Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks,
          including making phone calls, sending text messages and reading email.'
         price={39999}
         image={img4}
         rating={5}
         id={11113}
         />
         <Product
         title='Oppo f11 pro comes with a 6.50-inch touchscreen display. 
         It comes with 4GB of RAM. The Oppo F11 runs Android 9.0 and is powered by a 4020mAh battery.'
         price={8499 }
         image={img5}
         rating={5}
         id={11114}
         />
         </div>

         <div className="home__row">
         <Product
         title='Samsung moniter providing a wider field of view, 
         curved screen monitors let you enjoy a more immersive experience.5 Hz, 
         combined with the lowest response time you can find.'
         price={10999}
         image={img6}
         rating={5}
         id={11115}
         />
         </div>
         
         </div>
        
         </div>
       
    )
}

export default Home
