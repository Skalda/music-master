import React from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import {secretConfig} from './config/config.secret';
import Profile from './Profile';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    fetch(FETCH_URL , {
      'method': 'GET',
      headers:  {
        'Authorization': `Bearer ${secretConfig.spotify.accessToken}`
      },
      mode: 'cors',
      cache: 'default'
    })
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
      });
  }

  render() {
    return (
      <div className="app">
        <h1>Music master</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist..."
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {event.key === 'Enter' ? this.search() : void 0}}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile artist={this.state.artist} />
        <section className="gallery">
          Gallery
        </section>
      </div>
    );
  }
}

export default App;