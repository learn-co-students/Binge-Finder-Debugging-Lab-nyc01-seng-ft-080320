import React from 'react';

const tvShow = (props) => {

  const selectShowHandle = () => {
    props.selectShow(props.show)
  }

  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={selectShowHandle} alt=""/>
    </div>
  );
}

export default tvShow;
