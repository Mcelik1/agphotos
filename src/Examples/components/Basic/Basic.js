import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import languages from './languages';
import { escapeRegexCharacters } from './utils/utils';
import styles from './Basic.less';


const getSuggestionValue = suggestion => suggestion.alt_text.split(",");

const renderSuggestion = suggestion => {

  let suggestionContent = '';
  let suggestionAltTextArr = suggestion.alt_text.split(",");

  suggestionAltTextArr.forEach(element => suggestionContent += '<li>'+element+'</li>');
  return <ul dangerouslySetInnerHTML={{__html: suggestionContent}}></ul>

};




export default class Basic extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      tags:[],
      media:[],
      suggestions: []

    };
  }


  getSuggestions = value => {

    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.media;
  };

  componentDidMount() {
    return fetch('http://geekpowerdev.com/agway-photos/wp-json/wp/v2/media')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({media: responseJson});
        })
        .catch((error) => {
          console.error(error);
        });
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
        <div id="basic-example" className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.title}>Basic</div>
            <div className={styles.description}>
              Let’s start simple. Here’s a plain list of suggestions.
            </div>
          </div>
          <div className={styles.autosuggest}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                id="basic-example"
            />
          </div>
        </div>
    );
  }
}
