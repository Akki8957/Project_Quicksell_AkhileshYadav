// TaskCard.js
import React from 'react';
import './TaskCard.css';
import { BsFillExclamationSquareFill } from 'react-icons/bs';

const TaskCard = ({ preHeading, title, label, imageUrl, isActive, userid }) => (
  <div className="task-card">
    <h4 className="task-pre-heading">{preHeading}</h4>
    <h2 className="task-title">{title}</h2>
    <div className="label-container">
    <span className='label-icon'>...</span>
    {/* <span className='label-icon'><BsFillExclamationSquareFill /></span> */}
      <div className="task-label">
        <span className="label-dot"></span>
        {label}
      </div>
    </div>
    <div className="user-avatar">
      <div className="profile-image">
      {imageUrl ? (
        <img src={imageUrl} alt={userid} />
      ) : (
        <div className="initials">
          {userid.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
      <span className={`active-dot ${isActive ? 'active' : 'inactive'}`}></span>
    </div>
  </div>
);

export default TaskCard;
