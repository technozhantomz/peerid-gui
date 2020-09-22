import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';

class UserDetails extends Component {
  render() {
    const {username} = this.props;
    return (
      <>
        <div className='user-details'>
          <div className='user-details-content'>
            <div className='user-details-content__name'  >{ username }</div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.getIn(['profiles', 'currentAccount', 'username'])
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserDetails));
