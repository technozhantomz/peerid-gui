import React, {Component} from 'react';
// import {AuthService} from '../../services';
import {NavigateActions, ModalActions} from '../../actions';
// import {ProfileService} from '../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StorageUtil, GenUtil} from '../../utility';
import {ModalTypes} from '../../constants';

const translate = GenUtil.translate;
// http://localhost:8082/error?twitch-auth-error=this%20account%20is%20already%20connected%20to%20another%20profile
class ErrorCallback extends Component {
  componentDidMount() {
    this.handleErrorCallback();
  }

  handleErrorCallback = () => {
    const path = this.props.history.location;
    const err = path ? path.search: '';
    const lastAccessedPage = StorageUtil.get('se-page');
    const errType = err.substring(
      err.lastIndexOf('?') + 1,
      err.lastIndexOf('=')
    );
    let errString = err.substring(
      err.lastIndexOf('=') + 1,
      err.length
    ).replace(/%20/g,' ');

    errString = errString.charAt(0).toUpperCase() + errString.slice(1);

    switch(errType) {
      case 'google-auth-error':
      case 'discord-auth-error':
      case 'facebook-auth-error':
        this.props.navigate(lastAccessedPage);
        this.handleError(errString);
        break;
      default:
        this.props.navigate('/dashboard');
        break;
    }
  }

  handleError(errString) {
    this.props.setModalData({headerText: translate('error'), subText: errString});
    this.props.setModalType(ModalTypes.ERROR);
    this.props.toggleModal();
  }

  render() {
    return (
      <>
        <div className='error-callback-page'>
          <div className='error-callback-page__content'></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({location: state.getIn(['router', 'location', 'pathname'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setModalData: ModalActions.setModalData,
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorCallback);