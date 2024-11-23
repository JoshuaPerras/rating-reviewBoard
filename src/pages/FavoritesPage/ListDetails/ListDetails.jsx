import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ListDetails.css';

function ListDetailsPage() {
  const { id } = useParams(); // Get the list ID from the URL
  const navigate = useNavigate();

  return (
    <div className="list-details-container">
      <h1>Details for List {id}</h1>
      <p>This is where movies for the list will be displayed.</p>
      <button onClick={() => navigate('/favorites')} className="back-button">
        Back to Favorites
      </button>
    </div>
  );
}

export default ListDetailsPage;
