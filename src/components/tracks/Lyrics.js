import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;

      const lyricResponse = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      this.setState({
        lyrics: lyricResponse.data.message.body.lyrics,
      });

      const trackResponse = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      this.setState({
        track: trackResponse.data.message.body.track,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { track, lyrics } = this.state;
    const {
      track_name,
      artist_name,
      album_id,
      first_release_date,
      explicit,
      primary_genres,
    } = track;
    const { lyrics_body } = lyrics;

    if (Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track_name} by <span className="secondary">{artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {album_id}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong>:{' '}
              {primary_genres.music_genre_list[0]
                ? primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : 'N/A'}
            </li>
            <li className="list-group-item">
              <strong>Explicit Lyrics</strong>: {explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{' '}
              <Moment format="MM/DD/YYYY">{first_release_date}</Moment>
            </li>
          </ul>
        </>
      );
    }
  }
}

export default Lyrics;
