import React, {Component} from 'react';
import {GenUtil} from '../../utility';
const translate = GenUtil.translate;

class Footer extends Component {
  render() {
    return(
      <footer className='footer'>
        <span className='footer__copyright'>{translate('companyName')}</span>
        <span className='footer__copyright'>{translate('companyAddress1')}</span>
        <span className='footer__copyright'>{translate('companyAddress2')}</span>
      </footer>
    );
  }
}

export default Footer;