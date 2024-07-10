import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import imgUser from '../../image/prof.jpg';
import axios from '../../axiosConfig';
import { UserContext } from '../../context/userContext';
import { UserDataContext } from '../../context/userDataContext';

const Profile = () => {
  const { userData, updateUserData } = useContext(UserDataContext);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...userData });
  const [profileImage, setProfileImage] = useState(userData.profileImage || imgUser);
  const { user } = useContext(UserContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/updateuser/${user.userId}`, updatedUser);
      updateUserData(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error('Error in updating user data:', error);
    }
  };

  useEffect(() => {
    setUpdatedUser(userData);
    setProfileImage(userData.profileImage || imgUser);
  }, [userData]);

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
                name="username"
                value={updatedUser.username}
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
                name="country"
                value={updatedUser.country}
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
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">No Image</div>
              )}
            </div>
            <div className="profile-field">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{userData.username}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{userData.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Address:</span>
              <span className="profile-value">{userData.country}</span>
            </div>
            <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
