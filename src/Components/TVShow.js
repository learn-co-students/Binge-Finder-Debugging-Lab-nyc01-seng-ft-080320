import React from 'react';

const tvShow = (props) => {
    const localSelectShow = () => {
        props.selectShow(props.show)
    }
  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={localSelectShow} alt=""/>
    </div>
  );
}

export default tvShow;
