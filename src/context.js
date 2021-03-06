import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

/*
  The Provider is just like any other React component.
  Everything gets wrapped within the Provider.
*/

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS': {
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
      };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => {
      this.setState(state => reducer(state, action));
    },
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );
      this.setState({
        track_list: data.message.body.track_list,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {/*
          The Provider wraps around every other component, so that whatever
          state is put inside the Provider is accessible within all other
          components so long as a Consumer is used.
        */}
        {this.props.children}
      </Context.Provider>
    );
  }
}

/*
  The Consumer is what is imported into a component in order to be able to
  access the state within the component, similar to how connect works in Redux.
*/
export const Consumer = Context.Consumer;
