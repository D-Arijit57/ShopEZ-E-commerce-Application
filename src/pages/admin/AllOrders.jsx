import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const AllOrders = () => {


  const [orders, setOrders] = useState([]);

  const [updateStatus, setUpdateStatus] = useState('');


  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async () =>{
    await axios.get(`http://localhost:6001/fetch-orders`).then(
      (response)=>{
        setOrders(response.data.reverse());
      }
    )
  }


  const  cancelOrder = async(id) =>{
    await axios.put('http://localhost:6001/cancel-order', {id}).then(
      (response)=>{
        alert("Order cancelled!!");
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order cancellation failed!!");
    })
  }


  const updateOrderStatus = async(id) =>{
    await axios.put('http://localhost:6001/update-order-status', {id, updateStatus}).then(
      (response)=>{
        alert("Order status updated!!");
        setUpdateStatus('');
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order update failed!!");
    })
  }

  return (
    <div className="all-orders-page">
        <h3>Orders</h3>

        <div className="all-orders">

          {orders.map((order)=>{
            return(
              <div className="all-orders-order">
                <img src={order.mainImg} alt="" />
                <div className="all-orders-order-data">
                  
                  <h4>{order.title}</h4>
                  <p>{order.description}</p>
                  <div>
                    <span><p><b>Size: </b> {order.size}</p></span>
                    <span><p><b>Quantity: </b> {order.quantity}</p></span>
                    <span><p><b>Price: </b> &#8377; {parseInt(order.price - (order.price * order.discount)/100) * order.quantity}</p></span>
                    <span><p><b>Payment method: </b> {order.paymentMethod}</p></span>
                  </div>
                  <div>
                    <span><p><b>UserId: </b> {order.userId}</p></span>
                    <span><p><b>Name: </b> {order.name}</p></span>
                    <span><p><b>Email: </b> {order.email}</p></span>
                    <span><p><b>Mobile: </b> {order.mobile}</p></span>
                  </div>
                  <div>
                    <span><h5><b>Ordered on: </b> {order.orderDate.slice(0,10)}</h5></span>
                    <span><h5><b>Address: </b> {order.address}</h5></span>
                    <span><h5><b>Pincode: </b> {order.pincode}</h5></span>
                  </div>
                    <div>
                      <span><h5><b>Order status: </b> {order.orderStatus}</h5></span>
                      {order.orderStatus === 'delivered' || order.orderStatus === 'cancelled' ?
                        ""
                      :
                      <span>
                        <div >
                          <select class="form-select form-select-sm" id='flotingSelect-allOrders' defaultValue="" onChange={(e)=> setUpdateStatus(e.target.value)}>
                            <option value="" disabled>Update order status</option>
                            <option value="Order placed">Order Placed</option>
                            <option value="In-transit">In-transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                        <button className='btn btn-primary' onClick={()=> updateOrderStatus(order._id)}>Update</button>
                      </span>
                      }
                      


                        {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ?
                  
                          <button className='btn btn-danger' onClick={()=> cancelOrder(order._id)}>Cancel</button>
                        :
                        ""}
                    </div>
                </div>
              </div>
            )
          })}

            


            



        </div>

    </div>
  )
}

export default AllOrders