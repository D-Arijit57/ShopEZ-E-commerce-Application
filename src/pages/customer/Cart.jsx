import React, { useEffect, useState } from 'react'
import '../../styles/Cart.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();


  useEffect(()=>{
    fetchCart();
  },[])

  const fetchCart = async() =>{
    const userId = localStorage.getItem('userId');
    if(userId){
      await axios.get('http://localhost:6001/fetch-cart').then(
        (response)=>{
          setCartItems(response.data.filter(item=> item.userId === userId).reverse());
        }
      )
    }
  }

  const increaseCartQuantity = async(id) =>{
    await axios.put('http://localhost:6001/increase-cart-quantity', {id}).then(
      (response)=>{
        fetchCart();
      }
    ).catch((err)=>{
      // alert("operation failed")
    })
  }

  const decreaseCartQuantity = async(id, quantity) =>{
    if(quantity > 1){
      await axios.put('http://localhost:6001/decrease-cart-quantity', {id}).then(
        (response)=>{
          fetchCart();
        }
      ).catch((err)=>{
        // alert("operation failed")
      })
    }else{

      // remove item
    }
  }

  const removeItem = async(id) =>{
      await axios.put('http://localhost:6001/remove-item', {id}).then(
        (response)=>{
          fetchCart();
        }
      )
  }


  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0)

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const discount = cartItems.reduce((sum, product)=> sum + ((product.price * product.discount)/100 )* product.quantity, 0);
    setTotalPrice(totalPrice);
    setTotalDiscount(Math.floor(discount));
    if(totalPrice > 1000 || cartItems.length === 0){
      setDeliveryCharges(0);
    } else{ 
      setDeliveryCharges(50);
    }
  };

  useEffect(()=>{
    calculateTotalPrice();
  },[cartItems])


  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const userId = localStorage.getItem('userId');
  const placeOrder = async() =>{
    if(cartItems.length > 0){
        await axios.post('http://localhost:6001/place-cart-order', {userId, name, mobile, email, address, pincode, paymentMethod, orderDate: new Date()}).then(
          (response)=>{
            alert('Order placed!!');
            setName('');
            setMobile('');
            setEmail('');
            setAddress('');
            setPincode('');
            setPaymentMethod('');
            navigate('/profile');
          }
        )
    }
  }


  return (
    <div className="cartPage">
      <div className="cartContents">

        {cartItems.length === 0 ?
          <p style={{textAlign: 'center', marginTop: '20vh'}}>Cart is empty...</p>
        :
        
        ""}
        {cartItems.map((item)=>{
          return(
            <div className="cartItem" key={item._id}>
              <img src={item.mainImg} alt="" />
              <div className="cartItem-data">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="cartItem-inputs">

                  <span><p><b>Size: </b> {item.size}</p></span>
                  <span><p><b>Quantity: </b> {item.quantity}</p></span>
                </div>
                <span><h5><b>Price: </b> &#8377; {parseInt(item.price - (item.price * item.discount)/100) * item.quantity}</h5></span>
                <button className='btn' onClick={()=> removeItem(item._id)}>Remove</button>
              </div>
            </div>
          )
        })}



      </div>


      <div className="cartPriceBody">
        <h4>Price Details</h4>
        <span><b>Total MRP: </b> <p>&#8377; {totalPrice}</p></span>
        <span><b>Discount on MRP: </b> <p style={{color:"rgb(7, 156, 106)"}}> - &#8377; {totalDiscount}</p></span>
        <span><b>Delivery Charges: </b> <p style={{color:"red"}}> + &#8377; {deliveryCharges}</p></span>
        <hr />
        <h5><b>Final Price: </b> &#8377; {totalPrice - totalDiscount + deliveryCharges}</h5>
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Place order</button>
      </div>



      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Checkout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            
            <div className="checkout-address">

                <h4>Checkout details</h4>
                
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput1" value={name} onChange={(e)=> setName(e.target.value)} />
                  <label htmlFor="floatingInput1">Name</label>
                </div>

                <section>
                  <div className="form-floating mb-3 span-child-2">
                    <input type='text' className="form-control" id="floatingInput2" value={mobile} onChange={(e)=> setMobile(e.target.value)} />
                    <label htmlFor="floatingInput2">Mobile</label>
                  </div>

                  <div className="form-floating mb-3 span-child-1">
                    <input type='text' className="form-control" id="floatingInput3" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <label htmlFor="floatingInput3">Email</label>
                  </div>
                </section>


                <section>
                  <div className="form-floating mb-3 span-child-1">
                    <input type='text' className="form-control" id="floatingInput6" value={address} onChange={(e)=> setAddress(e.target.value)} />
                    <label htmlFor="floatingInput6">Address</label>
                  </div>

                  <div className="form-floating mb-3 span-child-2">
                    <input type='text' className="form-control" id="floatingInput7" value={pincode} onChange={(e)=> setPincode(e.target.value)} />
                    <label htmlFor="floatingInput7">Pincode</label>
                  </div>
                </section>


            </div>

            <div className="checkout-payment-method">
              <h4>Payment method</h4>
              <div className="form-floating mb-3">
                <select className="form-select form-select-md mb-3" id="floatingInput8" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
                  <option value="">choose payment method</option>
                  <option value="netbanking">netbanking</option>
                  <option value="card">card payments</option>
                  <option value="upi">upi</option>
                  <option value="cod">cash on delivery</option>
                </select>
                <label htmlFor="floatingInput8">Choose Payment method</label>
              </div>
            </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={placeOrder}>Order</button>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Cart