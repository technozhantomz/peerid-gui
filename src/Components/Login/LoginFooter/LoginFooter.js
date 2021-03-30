import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AuthUtil, GenUtil } from '../../../utility';
import {
  youtubeImgBlue,
  facebookImg,
  youtubeImg,
  peerplaysImg,
  facebookImgBlue,
  peerplaysImgBlue,
  discordImg,
  discordImgBlue
} from '../../../assets/images';
import ModalTypes from '../../../constants/ModalTypes';
import { ModalActions } from '../../../actions';
import '../../../assets/scss/style.scss';

const translate = GenUtil.translate;

class LoginFooter extends Component {
  state = {
    query: ''
  };

  componentDidMount() {
    if (this.props.location.search) {
      const qs = this.props.location.search.substr(this.props.location.search.lastIndexOf('?'));
      this.setState({
        query: qs
      });
    }
  }

  render() {
    return (
      <div className='login-footer'>
        <p className='login-footer-title'>{translate('login.orLoginWith')}</p>
        <div className='login-footer__icons' >
          <div className='login-facebook'>
            <img
              src={facebookImgBlue}
              alt='facebook'
              onMouseOut={(e) => (e.currentTarget.src = facebookImgBlue)}
              onMouseOver={(e) => (e.currentTarget.src = facebookImg)}
              onClick={() => AuthUtil.authVia('facebook', this.props.location.pathname, this.state.query)}
            />
          </div>
          <div className='login-youtube'>
            <img
              src={youtubeImgBlue}
              alt='youtube'
              onMouseOut={(e) => (e.currentTarget.src = youtubeImgBlue)}
              onMouseOver={(e) => (e.currentTarget.src = youtubeImg)}
              onClick={() => AuthUtil.authVia('google', this.props.location.pathname, this.state.query)}
            />
          </div>
          <div className='login-facebook'>
            <img
              src={discordImgBlue}
              alt='discord'
              onMouseOut={(e) => (e.currentTarget.src = discordImgBlue)}
              onMouseOver={(e) => (e.currentTarget.src = discordImg)}
              onClick={() => AuthUtil.authVia('discord', this.props.location.pathname, this.state.query)}
            />
          </div>
          <div className='login-peerplays'>
            <img
              src={peerplaysImgBlue}
              alt='peerplays'
              onMouseOut={(e) => (e.currentTarget.src = peerplaysImgBlue)}
              onMouseOver={(e) => (e.currentTarget.src = peerplaysImg)}
              onClick={() => {
                this.props.setModalType(ModalTypes.PEERPLAYS_LOGIN);
                if (!this.props.isModalOpen) {
                  this.props.toggleModal();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.getIn(['modal', 'isOpen'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setModalType: ModalActions.setModalType,
    toggleModal: ModalActions.toggleModal
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginFooter));

