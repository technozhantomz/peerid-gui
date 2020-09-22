import React, {Component} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, Button} from '@material-ui/core';
import {ModalActions, NavigateActions, AppActions} from '../../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GenUtil} from '../../../utility';
import {RouteConstants, ModalTypes} from '../../../constants';

const translate = GenUtil.translate;
/*
This modal handles both success and failure. By firing off a setModalType() action you can determine what is rendered.
(1) setModalType('SUBMIT') - a success modal will appear WITH automatic re-direct functionality, which is set by setModalData({redirect: ''})
(2) setModalType('OK') - ok modal type simply contains text, along with an ok button. Re-direct on 'ok' button click. NO AUTOMATIC REDIRECT
(3) setModalType('ERROR) - modal content changed to error modal
*/
class SubmitModal extends Component {
  state = {timerActive: false}

  componentDidMount() {
    // if the props have loaded in the didMount phase, set timer
    if (this.props.isSuccessModal || this.props.redirect) {
      this.setState({timerActive: true});
      setTimeout(()=> {
        this.setState({timerActive: false});
        this.handleClose();
      }, 15000);
    }
  }

  componentDidUpdate(prevProps) {
    const {isSuccessModal, setModalData, isModalOpen} = this.props;

    //if the props have loaded after the didMount phase, set timer
    if (((isSuccessModal && prevProps.isSuccessModal) || this.props.redirect) && !this.state.timerActive) {
      this.setState({timerActive: true});
      setTimeout(()=> {
        this.setState({timerActive: false});
        this.handleClose();
      }, 15000);
    } else if (!isModalOpen && prevProps.isModalOpen) { //if the user closes the modal by clicking outside of the modal
      setModalData('');
      this.handleRedirect(prevProps.redirect);
    }
  }

  handleClose = () => {
    const {isModalOpen, isSuccessModal, toggleModal, setModalData, headerText, logout} = this.props;

    //user closes the modal
    if (isModalOpen) {
      if (isSuccessModal) {
        this.handleRedirect();
      }

      if(headerText && headerText.includes('logged out')) {
        logout();
      }

      toggleModal(); // Call this first to ensure no odd render behaviour occurs within the modal before it closes.
      setModalData('');
    }

    if (!this.state.timerActive && isModalOpen) { //timer expired
      this.handleRedirect();
    }
  }

  // if user suplied redirect, then the modal will automatically redirect based on switch statement
  handleRedirect(url) {
    const redirect = this.props.redirect ? this.props.redirect : url;

    switch(redirect) {
      case RouteConstants.DASHBOARD:
        return this.props.navigateToDashboard();
      case '/profile/2':
        return this.props.navigateToCreateProfile('2');
      default:
        break;
    }
  }

  handleOkClicked = () => {
    this.handleRedirect();
    this.props.toggleModal();
    this.props.setModalData('');
  }

  render() {
    const {headerText, subText, modalType, isSubmitModal} = this.props;
    return (
      <div className='submit-modal__wrapper'>
        <div className='submit-modal'>
          <IconButton className='link-account__cross' aria-label='Close' onClick={ this.handleClose }>
            <CloseIcon />
          </IconButton>
          <div className='submit-modal-text'>
            <p className='submit-modal-text__header'>{headerText}</p>
            {/* sucess modal means we display redirect link */}
            <p className='submit-modal-text__subText'>
              {subText} {
                (isSubmitModal)
                  ? <span className='submit-modal-text__redirect' onClick={ () => this.handleClose() }> {translate('preferences.modal.clickHere')}</span>
                  : null
              }
            </p>
          </div>
          {/* 'OK' modal type === display ok button */}
          {modalType === 'OK' ?
            <Button className='submit-modal__ok' onClick={ this.handleOkClicked }>
              OK
            </Button>
            : null
          }
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleModal: ModalActions.toggleModal,
    setModalData: ModalActions.setModalData,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    navigateToCreateProfile: NavigateActions.navigateToCreateProfile,
    logout: AppActions.logout
  },
  dispatch
);

const mapStateToProps = (state) => {
  const modalType = state.getIn(['modal', 'type']);
  const isSubmitModal = modalType && modalType.toUpperCase() === ModalTypes.SUBMIT;

  return {
    headerText: state.getIn(['modal', 'data', 'headerText']),
    subText: state.getIn(['modal', 'data', 'subText']),
    isSubmitModal,
    modalType,
    redirect: state.getIn(['modal', 'data', 'redirect']),
    isModalOpen: state.getIn(['modal', 'isOpen'])
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitModal);
