import React, { Component } from 'react';
import Adapter from './Adapter';
import TVShowList from './Containers/TVShowList';
import Nav from './Containers/Nav';
import SelectedShowContainer from './Containers/SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    page: 0
  }

  componentDidMount() {
    Adapter.getShows(this.state.page).then(shows => {
      this.setState({shows})
    })
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating: "" }) : this.setState({ filterByRating: e.target.value})
  }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then(json => {
      this.setState({
      selectedShow: show,
      episodes: json
    })
    })
  }

  displayShows = () => {
    if (this.state.filterByRating){
      return this.state.shows.filter((s)=> {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return this.state.shows
    }
  }

  renderNextPage = () => {
    Adapter.getShows(this.state.page).then(shows => {
      this.setState(prev => ({shows: prev.shows.concat(shows)}))
    })
  }

  nextPage = () => {
    this.setState(prev => ({page: prev.page + 1}), this.renderNextPage)
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} episodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList nextPage={this.nextPage} shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
