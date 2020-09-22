import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink as Link} from 'react-router-dom';
import {List, ListItem} from '@material-ui/core';

class NavLink extends Component {
  render() {
    const {links} = this.props;

    const rendered = () => {
      return links.map((link) => {
        let linkContent = () => {
          if (link.href) {
            return (
              <Link
                key={ link.title }
                className='navlink-item'
                activeClassName='navlink-item--active'
                to={ link.href }
                exact
              >
                { link.title }
              </Link>
            );
          } else if (link.click) {
            return (
              <Link
                key={ link.title }
                className='navlink-item'
                activeClassName='navlink-item--active'
                to='#'
                onClick={ link.click }
              >
                { link.title }
              </Link>
            );
          }
        };

        return (
          <ListItem key={ link.title } disableGutters>
            {linkContent()}
          </ListItem>
        );
      });
    };

    return (
      <>
        <List disablePadding>
          {rendered()}
        </List>
      </>
    );
  }
}

export default connect()(NavLink);
