import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);  
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:5000/api/users/find/${id}`, {
          headers: {
            'x-auth-token': token, 
          },
        });


        setUser(response.data);
        setIsLoading(false); 
      } catch (err) {
        setError(err.response ? err.response.data.msg : 'Lỗi xảy ra khi lấy dữ liệu');
        setIsLoading(false); 
      }
    };

    fetchUserDetails();
  }, [id]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500">Không tìm thấy người dùng</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-lg font-semibold">First Name</label>
          <p className="text-gray-600">{user.firstname}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Last Name</label>
          <p className="text-gray-600">{user.lastname}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Username</label>
          <p className="text-gray-600">{user.username}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Email</label>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Phone</label>
          <p className="text-gray-600">{user.phone || 'Chưa cung cấp'}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Gender</label>
          <p className="text-gray-600">{user.gender || 'Chưa xác định'}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Admin Status</label>
          <p className="text-gray-600">{user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Created At</label>
          <p className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <label className="text-lg font-semibold">Updated At</label>
          <p className="text-gray-600">{new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
