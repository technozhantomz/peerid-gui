import React, {Component} from 'react';
import {connect} from 'react-redux';
import windowSize from 'react-window-size';

import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";

class NavLeft extends Component {

    render() {

        // let navItemClass = ['nav-item'];
        // if (this.props.windowWidth <= 575) {
        //     navItemClass = [...navItemClass, 'd-none'];
        // }

        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><NavSearch/></li>
                </ul>
            </Aux>
        );
    }
}

export default connect()(windowSize(NavLeft));

