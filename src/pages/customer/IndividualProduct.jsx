import React, { useContext, useEffect, useState } from 'react'
import '../../styles/IndividualProduct.css'
import {HiOutlineArrowSmLeft} from 'react-icons/hi'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const IndividualProduct = () => {

const {id} = useParams();
const navigate = useNavigate()

const userId = localStorage.getItem('userId');

const {fetchCartCount} = useContext(GeneralContext);

const [productName, setProductName] = useState('');
const [productDescription, setProductDescription] = useState('');
const [productMainImg, setProductMainImg] = useState('');
const [productCarouselImg1, setProductCarouselImg1] = useState('');
const [productCarouselImg2, setProductCarouselImg2] = useState('');
const [productCarouselImg3, setProductCarouselImg3] = useState('');
const [productSizes, setProductSizes] = useState([]);
const [productPrice, setProductPrice] = useState(0);
const [productDiscount, setProductDiscount] = useState(0);


useEffect(()=>{
    fetchProduct();
},[])

const fetchProduct = async () =>{
    await axios.get(`http://localhost:6001/fetch-product-details/${id}`).then(
        (response)=>{
            setProductName(response.data.title);
            setProductDescription(response.data.description);
            setProductMainImg(response.data.mainImg);
            setProductCarouselImg1(response.data.carousel[0]);
            setProductCarouselImg2(response.data.carousel[1]);
            setProductCarouselImg3(response.data.carousel[2]);
            setProductSizes(response.data.sizes);
            setProductPrice(response.data.price);
            setProductDiscount(response.data.discount);
        }
    )
}

const [productQuantity, setProductQuantity] = useState(1);

const [size, setSize] = useState('');
const [name, setName] = useState('');
const [mobile, setMobile] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [pincode, setPincode] = useState('');
const [paymentMethod, setPaymentMethod] = useState('');




const buyNow = async() =>{
    await axios.post('http://localhost:6001/buy-product',{userId, name, email, mobile, address, pincode, title: productName, description: productDescription, mainImg: productMainImg, size, quantity: productQuantity, price: productPrice, discount: productDiscount, paymentMethod: paymentMethod, orderDate: new Date()}).then(
        (response)=>{
            alert('Order placed!!');
            navigate('/profile');
        }
    ).catch((err)=>{
        alert("Order failed!!");
    })
}


const handleAddToCart = async() =>{
    await axios.post('http://localhost:6001/add-to-cart', {userId, title: productName, description: productDescription, mainImg: productMainImg, size, quantity: productQuantity, price: productPrice, discount: productDiscount}).then(
        (response)=>{
            alert("product added to cart!!");
            navigate('/cart');
        }
    ).catch((err)=>{
        alert("Operation failed!!");
    })
}

  return (
    <div className="IndividualProduct-page">
        <span onClick={()=> navigate('')}> <HiOutlineArrowSmLeft /> <p>back</p></span>

        <div className="IndividualProduct-body">

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={productCarouselImg1} className="d-block w-100" alt="..."  />
                    </div>
                    <div className="carousel-item">
                    <img src={productCarouselImg2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src={productCarouselImg3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <div className="IndividualProduct-data">
                <h3>{productName}</h3>
                <p>{productDescription}</p>
                
                <span>
                    <label htmlFor="productSize">Choose size</label>
                    <select name="productSize" id="productSize" value={size} onChange={(e)=>setSize(e.target.value)}>
                        <option value=""></option>
                        {productSizes.map((size)=>{
                            return(
                                <option key={size} value={size}>{size}</option>
                            )
                        })}
                    </select>
                </span>
                <span>
                    <label htmlFor="productQuantity">Quantity</label>
                    <select name="productQuantity" id="productQuantity" value={productQuantity} onChange={(e)=>setProductQuantity(e.target.value)}>

                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>

                    </select>
                </span>

                <span><h5><b>Price: </b> 	&#8377; {parseInt(productPrice - (productPrice * productDiscount)/100)}  </h5> <s>{productPrice}</s> <p>({productDiscount}% off)</p></span>
                <h6><b>Rating:</b> 3.4/5 </h6>
                <p className="delivery-date">Free delivery in 5 days</p>

                <div className="productBuyingButtons">
                    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">Buy now</button>
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>

            </div>
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

                    <h4>Details</h4>
                    
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput1" value={name} onChange={(e)=>setName(e.target.value)} />
                        <label htmlFor="floatingInput1">Name</label>
                    </div>

                    <section>

                        <div className="form-floating mb-3">
                            <input type='text' className="form-control" id="floatingInput3" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
                            <label htmlFor="floatingInput3">Mobile</label>
                        </div>
                        <div className="form-floating mb-3 span-child-1">
                            <input type='text' className="form-control" id="floatingInput2" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <label htmlFor="floatingInput2">Email</label>
                        </div>

                    </section>


                    <section>
                        <div className="form-floating mb-3 span-child-1">
                            <input type='text' className="form-control" id="floatingInput6" value={address} onChange={(e)=>setAddress(e.target.value)} />
                            <label htmlFor="floatingInput6">Address</label>
                        </div>

                        <div className="form-floating mb-3 span-child-2">
                            <input type='text' className="form-control" id="floatingInput7" value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                            <label htmlFor="floatingInput7">Pincode</label>
                        </div>
                    </section>


                </div>

                <div className="checkout-payment-method">
                    <h4>Payment method</h4>
                    <div className="form-floating mb-3">
                        <select className="form-select form-select-md mb-3" id="floatingInput8" value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)}>
                        <option value=""></option>
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={buyNow}>Buy now</button>
                </div>
            </div>
            </div>
        </div>



    </div>
  )
}

export default IndividualProduct