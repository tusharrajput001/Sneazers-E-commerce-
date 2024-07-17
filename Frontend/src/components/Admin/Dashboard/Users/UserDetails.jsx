import React, { useState, useEffect } from 'react';
import './UserDetails.css';

function UserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://sneazers-e-commerce.vercel.app/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className='usersTable'>
      <h2>Users List</h2>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetails;
  