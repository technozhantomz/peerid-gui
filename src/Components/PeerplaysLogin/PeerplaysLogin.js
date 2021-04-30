import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GenUtil } from '../../utility';
import { ModalActions } from '../../actions';
import peerplaysImg2X from '../../assets/images/menuicon.png';

import PeerplaysLoginForm from './PeerplaysLoginForm/PeerplaysLoginForm';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

const translate = GenUtil.translate;

/**
 * TODO:
 * - realtime account lookup implementation similar to peerplays-core-gui account login username field.
 * - error messages in html markup reflecting status of account auth or above ^
 * - depending on use-case, proper redux state, actions, & reducers tweaking.
 * - see other TODO blocks within this .jsx file.
 */
class PeerplaysLogin extends Component {
  render() {
    return (
      <>
        <Aux>
          <Breadcrumb />
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <img src={peerplaysImg2X} alt={'peerplaysIcon'} />
                </div>
                <h3 className="mb-4">{translate('peerplays.login')}</h3>
                <PeerplaysLoginForm goRegister={this.props.goRegister} />
              </div>
            </div>
          </div>
        </Aux>
      </>
    );
  }
}

PeerplaysLogin.propTypes = {
  goRegister: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ isLoggedIn: state.getIn(['account', 'isLoggedIn']) });

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeerplaysLogin);
