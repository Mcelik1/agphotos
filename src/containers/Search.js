import React, { Component } from 'react'
import axios from 'axios'

import Suggestions from './Suggestions'

const API_URL = 'http://geekpowerdev.com/agway-photos/wp-json/wp/v2/media'

class Search extends Component {
  state = {
    error: false,
    query: '',
    results: []
  };

  getInfo = () => {
    return fetch('http://geekpowerdev.com/agway-photos/wp-json/wp/v2/media')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({results: responseJson});
        })
        .catch((error) => {
          console.error(error);
        });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        // this.showDropdown()
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
        // this.hideDropdown()
      }
    })
  };

  render() {
    return (


      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>


    )
  }
}

export default Search
