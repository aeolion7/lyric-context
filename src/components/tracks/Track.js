import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
  const { track } = props;
  const { artist_name, track_name, album_name, track_id } = track;

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{artist_name}</h5>
          <p className="card-text">
            <i className="fas fa-play mr-1" />
            <strong>Track</strong>: {track_name}
            <br />
            <i className="fas fa-compact-disc mr-1" />
            <strong>Album</strong>: {album_name}
          </p>
          <Link
            to={`/lyrics/track/${track_id}`}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" /> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
