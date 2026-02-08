import React from 'react';
import './FeedbackMessage.css';

const FeedbackMessage = ({ message }) => {
  return message ? <p className="feedback-message">{message}</p> : null;
};

export default FeedbackMessage;
