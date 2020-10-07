import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigateActions} from '../../actions';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import styles from './MUI.css';
import CustomInput from '../CustomInput';
import {InvalidIcon} from '../../assets/images';
import {ValidationUtil, GenUtil} from '../../utility';
import isValidDomain from 'is-valid-domain';
import csc from 'country-state-city';
import {InputLabel, Select, MenuItem} from '@material-ui/core';
import {ChainTypes} from 'peerplaysjs-lib';
import {AppService} from '../../services';

const translate = GenUtil.translate;

class CreateApp extends Component {
  state = {
    appName: '',
    description: '',
    organizationName: '',
    countrySelected: '',
    countryList: [],
    addressLine1: '',
    addressLine2: '',
    city: '',
    provinceSelected: '',
    provinceList: [],
    postalCode: '',
    contact: '',
    email: '',
    phone: '',
    domains: '',
    opertions: [],
    operationsSelected: [],
    resultText: (translate('forgotPassword.resultText.success')),
    resultStatus: '--success',
    btnDisable: true,
    isEmailClicked: false,
    validation: false,
    resetToDefault: false
  };

  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.navigateToSignIn();
    } else {
      if(this.state.countrySelected !== '') {
        const operations = Object.keys(ChainTypes.operations).map((op) => {
          return {
            name: op,
            id: ChainTypes.operations[op]
          };
        });
        this.setState({
          operations,
          countryList: csc.getAllCountries(),
          provinceList: csc.getStatesOfCountry(this.state.countrySelected)
        });
      } else {
        const operations = Object.keys(ChainTypes.operations).map((op) => {
          return {
            name: op,
            id: ChainTypes.operations[op]
          };
        });
        this.setState({
          operations,
          countryList: csc.getAllCountries()
        });
      }

      if(this.props.location.state) {
        const data = this.props.location.state;
        let countryId = csc.getAllCountries().find((c) => c.name === data.country).id;
        this.setState({
          provinceList: csc.getStatesOfCountry(countryId)
        });

        let provinceId = csc.getStatesOfCountry(countryId).find((p) => p.name === data.province).id;

        this.setState({
          appId: data.id,
          appName: data.appname,
          description: data.description,
          organizationName: data.organization_name,
          countrySelected: countryId,
          addressLine1: data.address_line1,
          addressLine2: data.address_line2,
          city: data.city,
          provinceSelected: provinceId,
          postalCode: data.postal_code,
          contact: data.contactname,
          email: data.email,
          phone: data.phone,
          domains: data.domains.join(),
          operationsSelected: data.operations,
          btnDisable: !this.validate()
        });
      }
    }
  }

  validate =() => {
    return this.state.appName && this.state.appName.length >= 3
      && this.state.description && this.state.description.length >= 10
      && this.state.organizationName && this.state.organizationName.length >= 3
      && this.state.countrySelected && this.state.addressLine1 && this.state.addressLine1.length >= 3
      && this.state.city && this.state.city.length >= 2
      && this.state.provinceSelected && this.state.contact && this.state.contact.length >= 2
      && this.state.email && ValidationUtil.seEmail(this.state.email).success
      && this.state.phone && this.validatePhone(this.state.phone)
      && this.state.domains && this.validateDomains(this.state.domains)
      && this.state.operationsSelected && this.state.operationsSelected.length > 0;
  }

  handleAppNameChange = (text) => {
    this.setState({
      appName: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleDescritionChange = (text) => {
    this.setState({
      description: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleOrganizationChange = (text) => {
    console.log(this.validate());
    this.setState({
      organizationName: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleAddressLine1Change = (text) => {
    this.setState({
      addressLine1: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };


  handleAddressLine2Change = (text) => {
    this.setState({
      addressLine2: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleCityChange = (text) => {
    this.setState({
      city: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handlePostalCodeChange = (text) => {
    this.setState({
      postalCode: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleContactChange = (text) => {
    this.setState({
      contact: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleEmailChange = (text) => {
    this.setState({
      email: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handlePhoneChange = (text) => {
    this.setState({
      phone: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  handleDomainChange = (text) => {
    this.setState({
      domains: text,
      btnDisable: !this.validate(),
      validation: this.validate()
    });
  };

  validatePhone = (phone) => {
    var regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

    return phone.match(regex);
  }

  validateDomains = (domains) => {
    var domainsSplit = domains.split(',');

    for(let i = 0; i < domainsSplit.length; i++ ) {
      if(!isValidDomain(domainsSplit[i].trim(), {subdomain: false, wildcard: false})) {
        return false;
      }
    }

    return true;
  }

  selectCountry = (e) => {
    this.setState({
      countrySelected: e.target.value,
      provinceSelected: '',
      provinceList: csc.getStatesOfCountry(e.target.value),
      btnDisable: !this.validate()
    });
  }

  selectRegion = (e) => {
    this.setState({
      provinceSelected: e.target.value,
      btnDisable: !this.validate()
    });
  }

  selectOperations = (e) => {
    let value;

    if(e.target.value.includes('')) {
      value = [];
    } else {
      value = e.target.value;
    }

    this.setState({
      operationsSelected: value,
      btnDisable: !this.validate()
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if(!this.validate()) {
      this.setState({
        btnDisable: true
      });
      return;
    }

    try{
      const app = {
        appname: this.state.appName,
        email: this.state.email,
        description: this.state.description,
        organization_name: this.state.organizationName,
        country: csc.getCountryById(this.state.countrySelected).name,
        province: csc.getStateById(this.state.provinceSelected).name,
        city: this.state.city,
        address_line1: this.state.addressLine1,
        contactname: this.state.contact,
        phone: this.state.phone,
        operations: [],
        domains: []
      };

      app.domains.push(...this.state.domains.split(','));
      app.operations.push(...this.state.operationsSelected);

      if(this.state.addressLine2 && this.state.addressLine2.length > 0) {
        app.address_line2 = this.state.addressLine2;
      }

      if(this.state.postalCode && this.state.postalCode.length > 0) {
        app.postal_code = this.state.postalCode;
      }

      if(this.state.appId) {
        app.id = this.state.appId;
      }

      await AppService.createApp(app);
      this.props.navigateToDashboard();
    } catch(err) {
      console.error(err);

      if(err.status === 400 && typeof err.data.error !== 'string') {
        let errText = '';
        Object.keys(err.data.error).map((key)=>{
          errText += `${key}: ${err.data.error[key]}\n`;
          return null;
        });
        this.setState({
          errorMessage: errText
        });
      } else {
        this.setState({
          errorMessage: err.data.error
        });
      }

      this.setState({loading: false});
    }
  }

  render() {
    const {classes} = this.props;
    const {countrySelected, provinceSelected, countryList, provinceList, operations, operationsSelected} = this.state;

    return (
      <>
        <div className='createapp'>
          <form className='login-form' onSubmit={ this.handleSubmit }>
            <span className='login-form__title'>{ this.props.location.state ? 'Edit App' : 'Create App' }</span>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='appName'
                placeholder='App Name'
                hasActiveGlow={ true }
                handleChange={ this.handleAppNameChange }
                maxLength={ 255 }
                value={ this.state.appName }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return this.state.appName.length >= 3;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 3 and 255 characters', success: this.state.appName && this.state.appName.length >= 3}
                  ];
                } }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='description'
                placeholder='Description'
                multiline
                hasActiveGlow={ true }
                handleChange={ this.handleDescritionChange }
                maxLength={ 1000 }
                value={ this.state.description }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return !!this.state.description && this.state.description.length >= 10;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 10 and 1000 characters', success: !!this.state.description && this.state.description.length >= 10}
                  ];
                } }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='organization'
                placeholder='Organization Name'
                hasActiveGlow={ true }
                handleChange={ this.handleOrganizationChange }
                maxLength={ 255 }
                value={ this.state.organizationName }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return !!this.state.organizationName && this.state.organizationName.length >= 3;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 3 and 255 characters', success: !!this.state.organizationName && this.state.organizationName.length >= 3}
                  ];
                } }
              />
            </FormControl>
            <FormControl variant='outlined' margin='normal'>
              <InputLabel classes={ {root: classes.selectlabel} } id='countrylabel'>Country</InputLabel>
              <Select
                labelId='countrylabel'
                id='country'
                classes={ {
                  root: classes.select,
                  icon: classes.selectIcon,
                  outlined: classes.selectOutline
                } }
                className='createapp__textfield'
                MenuProps={ {classes: {paper: classes.menuitem}} }
                value={ countrySelected }
                onChange={ this.selectCountry }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {countryList && countryList.map(({name, id}) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='addressLine1'
                placeholder='Address Line 1'
                hasActiveGlow={ true }
                handleChange={ this.handleAddressLine1Change }
                maxLength={ 255 }
                value={ this.state.addressLine1 }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return !!this.state.addressLine1 && this.state.addressLine1.length >= 3;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 3 and 255 characters', success: !!this.state.addressLine1 && this.state.addressLine1.length >= 3}
                  ];
                } }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal'>
              <CustomInput
                name='addressLine2'
                placeholder='Address Line 2'
                hasActiveGlow={ true }
                handleChange={ this.handleAddressLine2Change }
                maxLength={ 255 }
                value={ this.state.addressLine2 }
                iconRightActive={ InvalidIcon }
                isValid={ () => true }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='city'
                placeholder='City'
                hasActiveGlow={ true }
                handleChange={ this.handleCityChange }
                maxLength={ 50 }
                value={ this.state.city }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return !!this.state.city && this.state.city.length >= 2;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 2 and 50 characters', success: !!this.state.city && this.state.city.length >= 2}
                  ];
                } }
              />
            </FormControl>
            <FormControl variant='outlined' margin='normal'>
              <InputLabel classes={ {root: classes.selectlabel} } id='statelabel'>Province/State</InputLabel>
              <Select
                labelId='statelabel'
                id='state'
                classes={ {
                  root: classes.select,
                  outlined: classes.selectOutline,
                  icon: classes.selectIcon
                } }
                className='createapp__textfield'
                MenuProps={ {classes: {paper: classes.menuitem}} }
                value={ provinceSelected }
                onChange={ this.selectRegion }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {provinceList && provinceList.map(({name,id}) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className='login-form__input' margin='normal'>
              <CustomInput
                name='postalCode'
                placeholder='Postal/ZIP Code'
                hasActiveGlow={ true }
                handleChange={ this.handlePostalCodeChange }
                maxLength={ 10 }
                value={ this.state.postalCode }
                iconRightActive={ InvalidIcon }
                isValid={ () => true }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='contact'
                placeholder='Contact Person'
                handleChange={ this.handleContactChange }
                maxLength={ 50 }
                value={ this.state.contact }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return !!this.state.contact && this.state.contact.length >= 3;
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be between 3 and 50 characters', success: !!this.state.contact && this.state.contact.length >= 3}
                  ];
                } }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='email'
                placeholder='Email'
                handleChange={ this.handleEmailChange }
                maxLength={ 100 }
                value={ this.state.email }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  if (this.state.isEmailInputClicked) {
                    return ValidationUtil.seEmail(this.state.email).success;
                  } else {
                    return true;
                  }
                } }
                handleRightIconClick={ () => {
                  return ValidationUtil.seEmail(this.state.email).errors;
                } }
              />
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='phone'
                placeholder='Phone'
                handleChange={ this.handlePhoneChange }
                maxLength={ 15 }
                value={ this.state.phone }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return this.validatePhone(this.state.phone);
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be a valid phone number', success: this.validatePhone(this.state.phone)}
                  ];
                } }
              />
            </FormControl>
            <FormControl variant='outlined' margin='normal'>
              <InputLabel classes={ {root: classes.selectlabel} } id='operationslabel'>Operations</InputLabel>
              <Select
                labelId='operationslabel'
                id='operations'
                multiple
                classes={ {
                  root: classes.select,
                  outlined: classes.selectOutline,
                  icon: classes.selectIcon
                } }
                className='createapp__textfield'
                MenuProps={ {classes: {paper: classes.menuitem}} }
                value={ operationsSelected }
                onChange={ this.selectOperations }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {operations && operations.map(({name, id}) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className='login-form__input' margin='normal' required>
              <CustomInput
                name='domains'
                placeholder='Domains'
                multiline
                handleChange={ this.handleDomainChange }
                maxLength={ 255 }
                value={ this.state.domains }
                iconRightActive={ InvalidIcon }
                isValid={ () => {
                  return this.validateDomains(this.state.domains);
                } }
                handleRightIconClick={ () => {
                  return [
                    {errorString: 'Should be valid domains separated by commas', success: this.validateDomains(this.state.domains)}
                  ];
                } }
              />
            </FormControl>

            <span className='register__apiTxt--error'>{this.state.errorMessage}</span>
            <div className='login__btn-container'>
              <Button disabled={ this.state.btnDisable } classes={ {root: classes.button} } type='submit' onClick={ this.handleSubmit }>
                Create App
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    navigateToDashboard: NavigateActions.navigateToDashboard,
    navigateToSignIn: NavigateActions.navigateToSignIn
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateApp));
