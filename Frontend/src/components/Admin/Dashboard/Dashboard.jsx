import React from 'react'

function Dashboard() {
  return (
    <>
    <h1 style={{display:'flex', justifyContent:"center"}}>Welcome Admin</h1>

    <div className='buttonsContainer' style={{textAlign:'center', padding:'20px'}}>
      <button className="button1">Products</button>
      <button className="button2">Orders</button>  
      <button className="button3">Users</button>
    </div>
    
    <div className="addProduct">
      <button>Add Product + </button>
    </div>


    </>
  )
}

export default Dashboard  