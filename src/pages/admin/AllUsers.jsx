import React, { useEffect, useState } from 'react'
import '../../styles/AllUsers.css'
import axios from 'axios'

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchUsersData();
  }, [])

  const fetchUsersData = async() =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        setUsers(response.data.filter(user=> user.usertype === 'customer'));
      }
    )

    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrders(response.data);
      }
    )
   
  }


  return (
    <div className="all-users-page">
      <h3>All Users</h3>

      <div className="user-cards">

        {users.map((user)=>{
          return(
            <div className="user-card">
              <span>
                <h5>User Id </h5>
                <p>{user._id}</p>
              </span>
              <span>
                <h5>User Name </h5>
                <p>{user.username}</p>
              </span>
              <span>
                <h5>Email Address </h5>
                <p>{user.email}</p>
              </span>
              <span>
                <h5>Orders </h5>
                <p>{orders.filter(order=> order.userId === user._id).length}</p>
              </span>
            </div>
          )
        })}
        

      </div>

    </div>
  )
}

export default AllUsers