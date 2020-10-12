import React from 'react';
import Search from '../Components/Search';
import Filter from '../Components/Filter';
import { Menu } from 'semantic-ui-react';
import ScrollToTop from '../Components/ScrollToTop';


const Nav = (props) => {
  return (
    <div class="ui top fixed menu">
      <Menu attached='top' inverted>
        <Menu.Item>
          <i className="material-icons md-48">tv</i>
        </Menu.Item>
        <Menu.Item>
          <h1>Tube Finder</h1>
        </Menu.Item>
        <Menu.Item>
          <ScrollToTop />
        </Menu.Item>
        <Menu.Item position="right">
          <Filter handleFilter={props.handleFilter}/>
        </Menu.Item>
        <Menu.Item position="right">
          <Search handleSearch={props.handleSearch} search={props.searchTerm}/>
        </Menu.Item>
      </Menu>
      
    </div>
  )
}

export default Nav;
