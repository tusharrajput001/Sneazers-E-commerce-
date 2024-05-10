import React from 'react'
import "./account.css"

function Account() {
  return (
    <section className='AccSection'>
        <div className='parent-container'>
            <div className='accountContainer'>
                <div className='accountInfo'>
                    <div className='avatar'>
                        <img></img>
                    </div>
                    <div>
                        <h4>Name</h4>
                    </div>
                    <div>
                        <h6>abcd@gmail.com</h6>
                    </div>
                    <div>
                        <button>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Account