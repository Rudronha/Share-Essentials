import React, { useState } from 'react';
import './Profile.css';
import imgUser from '../../image/prof.jpg'

// Mock user data for demonstration purposes
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, Anytown, USA',
  profileImage: imgUser // Add an image URL here if available
};

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(user.profileImage || '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send updatedUser and profileImage to your server
    console.log('Updated user:', updatedUser);
    console.log('Profile Image:', profileImage);
    setEditMode(false);
  };

  return (
    <div className="container">
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label className="form-label">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
            {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}
          </div>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={updatedUser.address}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-image-container">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">No Image</div>
            )}
          </div>
          <div className="profile-field">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{user.name}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Address:</span>
            <span className="profile-value">{user.address}</span>
          </div>
          <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
        </div>
      )}
    </div>
    </div>
  );
};





export default Profile;
