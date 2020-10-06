import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import UserDetails from './UserDetails';
import NavLink from '../NavLink';
import {GenUtil} from '../../utility';

const trans = GenUtil.translate;

class RightMenu extends Component {
  state = {
    links: [
      {title: trans('rightMenu.links.account'), href: '/account'},
      {title: trans('rightMenu.links.developer'), href: '/dashboard'}
    ]
  };

  render() {
    return (
      <div className={ classNames('right-menu', {'right-menu__open': this.props.open}) }>
        <UserDetails />
        <NavLink links={ this.state.links } className='right-menu-links'/>
      </div>
    );
  }
}

export default connect()(RightMenu);
