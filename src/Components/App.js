import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';

class App extends Component {
	state = {
		shows: [],
		searchTerm: '',
		selectedShow: '',
		episodes: [],
		filterByRating: ''
	};

	componentDidMount = () => {
		Adapter.getShows().then((tvshows) => {
			this.setState({ shows: tvshows });
		});
	};

	componentDidUpdate = () => {
		window.scrollTo(0, 0);
	};

	handleSearch = (e) => {
		this.setState({ searchTerm: e.target.value.toLowerCase() });
	}

	handleFilter = (e) => {
        // if(e.target.value === "No Filter"){
        //     this.setState({ filterByRating: '' })
        // } else {
        //     this.setState({ filterByRating: e.target.value })
        // }
		e.target.value === 'No Filter'
			? this.setState({ filterByRating: '' })
			: this.setState({ filterByRating: e.target.value });
	};

	selectShow = (show) => {
        Adapter.getShowEpisodes(show.id)
        .then((theseEpisodes) => {
			this.setState({
				selectedShow: show,
				episodes: theseEpisodes
			});
		});
	};

	displayShows = () => {
		if (this.state.filterByRating) {
			return this.state.shows.filter((s) => {
				return s.rating.average >= this.state.filterByRating;
			});
		} else {
			return this.state.shows;
		}
	};

	render() {
		return (
			<div>
				<Nav
					handleFilter={this.handleFilter}
					handleSearch={this.handleSearch}
					searchTerm={this.state.searchTerm}
				/>
				<Grid celled>
					<Grid.Column width={5}>
						{!!this.state.selectedShow ? (
							<SelectedShowContainer
								selectedShow={this.state.selectedShow}
								allEpisodes={this.state.episodes}
							/>
						) : (
							<div />
						)}
					</Grid.Column>
					<Grid.Column width={11}>
						<TVShowList
							shows={this.displayShows()}
							selectShow={this.selectShow}
                            searchTerm={this.state.searchTerm}
                            filterRating={this.state.filterByRating}
						/>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default App;
