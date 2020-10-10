import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterRating: "",
  }

  componentDidMount = () => {
    Adapter.getShows().then(shows => {
      return this.setState({shows})
    })
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleSearch =(e)=> {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    return e.target.value === "No Filter" ? this.setState({ filterRating:"" }) : this.setState({ filterRating: e.target.value})
  }

  selectShow = (show) => {
    
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => {
      
      return this.setState({
      selectedShow: show,
      episodes
    })})
  }

  displayShows = () => {
    let shows = this.state.shows.filter(show => {
      return show.name.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())
    })
    if (this.state.filterRating){
      return shows.filter((s)=> {
        
        return s.rating.average >= this.state.filterRating
      })
    } else {
      return shows
    }
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
