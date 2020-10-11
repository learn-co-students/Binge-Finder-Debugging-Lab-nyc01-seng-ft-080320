import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from './TVShow'

class TVShowList extends Component {

  mapAllShows = (rating) => {
    if (!!this.props.searchTerm){
      return this.props.shows.map((s) => {
        if (s.name.toLowerCase().includes(this.props.searchTerm)){
         return  (<TVShow show={s} key={s.id} selectShow={this.props.selectShow}/> )
        }
      })
    } 
    if(this.props.filterRating !== ''){
        const parsedRating = parseInt(rating, 10)
        const filtered =  this.props.shows.filter(show => {
           return (show.rating.average < parsedRating + 1 && show.rating.average >= parsedRating)
        })
        return filtered.map(show => {
            return  (<TVShow show={show} key={show.id} selectShow={this.props.selectShow}/> )

        })
    }
    return this.props.shows.map( (s)=> <TVShow show={s} key={s.id} selectShow={this.props.selectShow}/>)
  }

  render() {
      
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows(this.props.filterRating)}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
