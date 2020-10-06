import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {AppActions, ModalActions, NavigateActions} from '../../actions/';
import {ModalTypes} from '../../constants';
import LoginForm from '../Login/LoginForm';
import PeerplaysLogin from '../PeerplaysLogin';
import ForgotPassword from '../ForgotPassword';
import Register from '../Register';
import PeerplaysAuth from '../Modals/PeerplaysAuth';
import SubmitModal from '../Modals/SubmitModal';

import styles from './MUI.css';

class RootModal extends Component {

  handleClose = () => {
    this.props.setErrorText('');
    this.props.toggleModal();
    this.props.setModalData();
    this.setState({open: false});
  };

  openPasswordRecovery = () => {
    this.props.setErrorText('');
    this.props.setModalType(ModalTypes.FORGOT);
  };

  toggleModalAndRegister = () => {
    this.props.setErrorText('');
    this.props.toggleModal();
    this.props.navigateToSignUp();
  };

  render() {
    const {classes} = this.props;

    // Default modal content - a user should NEVER see this in production.
    let modalContent = null;
    let modalClass = classes.root;

    // Some modals have a pill element that must render outside and above the modal itself.
    let pillContent = null;

    // Specify your modals here
    switch (this.props.modalType) {
      case ModalTypes.LOGIN: {
        modalContent = <LoginForm recoverPassword={ this.openPasswordRecovery } goRegister={ this.toggleModalAndRegister } handleLogin={ this.props.login }
          errorText={ this.props.errorText } />;
        modalClass = 'modal-login';
        break;
      }

      case ModalTypes.SIGN_UP: {
        modalContent = <Register />;
        modalClass = 'modal-register';
        break;
      }

      case ModalTypes.FORGOT: {
        modalContent = <ForgotPassword goRegister={ this.toggleModalAndRegister } toggleModal={ this.props.toggleModal }/>;
        modalClass = 'modal-forgot';
        break;
      }

      case ModalTypes.PEERPLAYS_LOGIN: {
        modalContent = <PeerplaysLogin goRegister={ this.toggleModalAndRegister }/>;
        modalClass = 'modal-peerplays';
        break;
      }

      case ModalTypes.ERROR: {
        modalContent = <SubmitModal/>;
        modalClass = 'modal-error';
        break;
      }

      case ModalTypes.PEERPLAYS_AUTH: {
        modalContent = <PeerplaysAuth />;
        modalClass = 'modal-category';
        break;
      }

      default: {
        break;
      }
    }

    return (
      <>
        {/* <Dialog open={ this.state.open } onClose={ this.handleClose } aria-labelledby='form-dialog-title' classes={ {paper: classes.dialog-paper__root} }> */}
        <Dialog open={ this.props.isModalOpen } onClose={ this.handleClose } aria-labelledby='form-dialog-title' maxWidth={ 'md' } PaperProps={ {classes: {root: modalClass}} }>
          {pillContent}
          <DialogContent>
            {modalContent}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen']),
  modalType: state.getIn(['modal', 'type']),
  previousModal: state.getIn(['modal', 'previous']),
  errorText: state.getIn(['profiles', 'loginErrorText'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalType: ModalActions.setModalType,
    setModalData: ModalActions.setModalData,
    navigateToSignUp: NavigateActions.navigateToSignUp,
    login: AppActions.login,
    setErrorText: AppActions.setLoginError
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RootModal));
