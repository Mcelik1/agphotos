import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <img src={r.guid.rendered} key={r.id} className="Agway-logo" alt="logo" ></img>
  ));
  return <ul>{options}</ul>
};

export default Suggestions
