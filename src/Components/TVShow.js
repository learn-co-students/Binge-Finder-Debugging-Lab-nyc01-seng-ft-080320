import React from 'react';

const tvShow = (props) => {
  const selectShow = () => {
    props.selectShow(props.show)
  }
  return (
    <div>
      <br/>
  {/* of course the api is broken and sometimes there's no image so i put a picture of a dog instead. probably coulda used default props thingy here too if i wanted to make this a class component.*/}
      <img src={!!props.show.image ? props.show.image.medium : 'https://upload.wikimedia.org/wikipedia/commons/c/cf/BassetHound_profil.jpg'} onClick={selectShow} alt=""/>
    </div>
  );
}

export default tvShow;
