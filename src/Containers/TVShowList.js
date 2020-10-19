import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from '../Components/TVShow'

class TVShowList extends Component {

  mapAllShows = () => {
    if (!!this.props.searchTerm){
      return this.props.shows.map((s) => {
        if (s.name.toLowerCase().includes(this.props.searchTerm)){
          return <TVShow show={s} key={s.id} selectShow={this.props.selectShow}/> 
        }
      })
    } else {
    return this.props.shows.map( (s)=> {return <TVShow show={s} key={s.id} selectShow={this.props.selectShow}/>})
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (this.isBottom(wrappedElement)) {
      this.props.nextPage();
    }
  };

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
        
      </div>
    )
  }

}

export default TVShowList;
