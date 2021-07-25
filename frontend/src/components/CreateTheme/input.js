import React from 'react';
import './ConversationInput.css';

export default function ConversationInput() {
    return (
      <div className="conversation-search">
        <input
          type="text"
          className="conversation-search-input"
          placeholder="Назовите тему разговора"
        />
      </div>
    );
}