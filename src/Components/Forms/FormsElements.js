import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import supportedEmailDomains from '../../assets/locales/SupportedEmailDomains.txt';
import { EOL } from 'os';
import isValidDomain from 'is-valid-domain';
import csc from 'country-state-city';
import { ChainTypes } from 'peerplaysjs-lib';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../actions';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppService } from '../../services';
import { ValidationUtil } from '../../utility';
import { toast } from 'react-toastify';

toast.configure()
class FormsElements extends React.Component {

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
    operations: [],
    operationsSelected: [],
    btnDisable: true,
    resetToDefault: false,
    // validations Errors
    appErr: '',
    descriptionErr: '',
    organizationErr: '',
    addLine1Err: '',
    addLine2Err: '',
    cityErr: '',
    contactErr: '',
    emailErr: '',
    domainErr: '',
    phoneErr: '',
    disableBtn: true
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    } else {
      if (this.state.countrySelected !== '') {
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

      if (this.props.location.state) {
        const data = this.props.location.state;
        let countryId = csc.getAllCountries().find((c) => c.name === data.country).id;
        this.setState({
          provinceList: csc.getStatesOfCountry(countryId)
        });

        let provinceId = csc.getStatesOfCountry(countryId).find((p) => p.name === data.province).id;
        console.log(data);

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
  // Form validations
  validateForm = () => {
    return this.state.appName && this.state.appName.length >= 3 && this.state.appName.length <= 255 && !this.validateSpecialChar(this.state.appName)
      && this.state.description && this.state.description.length >= 5 && this.state.description.length <= 1000
      && this.state.organizationName && this.state.organizationName.length >= 2 && this.state.organizationName.length <= 255 && !this.validateSpecialChar(this.state.organizationName)
      && this.state.countrySelected && this.state.addressLine1 && this.state.addressLine1.length >= 5 && this.state.addressLine1.length <= 255 && this.state.disableBtn
      && this.state.city && this.state.city.length >= 2 && this.state.city.length <= 100
      && this.state.provinceSelected && this.state.contact && this.state.contact.length >= 2 && this.state.contact.length <= 255 && !this.validateNumbersInContact(this.state.contact)
      && this.state.email && ValidationUtil.seEmail(this.state.email).success
      && this.state.phone && this.validatePhone(this.state.phone)
      && this.state.domains && this.validateDomains(this.state.domains)
      && this.state.operationsSelected && this.state.operationsSelected.length > 0;
  }

  validatePhone = (phone) => {
    var regex = new RegExp(/^[\]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/);

    return phone.match(regex);
  }

  validateNumbersInContact = (contact) => {
    var contactregex = /[0-9]/g

    return contact.match(contactregex);
  }

  validateSpecialChar = (field) => {
    const specialCharRegex = /[().@$!%^*#&/:;<=>+?_{},'"|~`]/g;

    return field.match(specialCharRegex);
  }

  emailDomain(email) {
    const regex = /\.([^.]+?)$/;
    const lineBreak = EOL;
    const acceptedDomains = supportedEmailDomains.split(lineBreak);
    const extractedDomain = regex.exec(email);
    return extractedDomain === null ? false : acceptedDomains.includes(extractedDomain[1].toUpperCase());
  }

  validateDomains = (domains) => {
    var domainsSplit = domains.split(',');

    for (let i = 0; i < domainsSplit.length; i++) {
      if (!isValidDomain(domainsSplit[i].trim(), { subdomain: false, wildcard: false })) {
        return false;
      }
    }
    return true;
  }

  // Change state handle
  handleAppNameChange = (e) => {
    this.setState({
      appName: e.target.value,
    }, () => this.validate('appName'));
  };

  handleDescritionChange = (e) => {
    this.setState({
      description: e.target.value,
    }, () => this.validate('description'));
  };

  handleOrganizationChange = (e) => {
    this.setState({
      organizationName: e.target.value,
    }, () => this.validate('organizationName'));
  };

  handleAddressLine1Change = (e) => {
    this.setState({
      addressLine1: e.target.value,
    }, () => this.validate('addressLine1'));
  };

  handleAddressLine2Change = (e) => {
    this.setState({
      addressLine2: e.target.value,
    }, () => this.validate('addressLine2'));
  };

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    }, () => this.validate('city'));
  };

  handlePostalCodeChange = (e) => {
    this.setState({
      postalCode: e.target.value,
    });
  };

  handleContactChange = (e) => {
    this.setState({
      contact: e.target.value,
    }, () => this.validate('contact'));
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    }, () => this.validate('email'));
  };

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    }, () => this.validate('phone'));
  };

  handleDomainChange = (e) => {
    this.setState({
      domains: e.target.value,
    }, () => this.validate('domains'));
  };


  selectCountry = (e) => {
    this.setState({
      countrySelected: e.target.value,
      provinceSelected: '',
      provinceList: csc.getStatesOfCountry(e.target.value),
    });
  }

  selectRegion = (e) => {
    this.setState({
      provinceSelected: e.target.value,
    });
  }

  selectOperations = (e) => {
    let value;

    if (e.target.value.includes('')) {
      value = [];
    } else {
      value = e.target.value;
    }

    this.setState({
      operationsSelected: value,
    });
  }

  // Toast alert for create app 
  appSuccessAlert() {
    if (this.props.location.state) {
      toast.success('App Edited Successfully!')
    } else {
      toast.success('App Created Successfully!')
    }
  }

  appErrorAlert() {
    if (this.props.location.state) {
      toast.error('Application not edited!')
    } else {
      toast.error('App not created!')
    }
  }

  // Trigger on onClick of Submit btn
  handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      if (this.state.addressLine2 && this.state.addressLine2.length > 0) {
        app.address_line2 = this.state.addressLine2;
      }

      if (this.state.postalCode && this.state.postalCode.length > 0) {
        app.postal_code = this.state.postalCode;
      }

      if (this.state.appId) {
        app.id = this.state.appId;
      }

      await AppService.createApp(app);
      // this.props.navigateToDashboard();
      this.props.history.push('/dashboard');
      this.appSuccessAlert();

    } catch (err) {
      console.error(err);
      this.appErrorAlert();

      if (err.status === 400 && typeof err.data.error !== 'string') {
        // let errText = '';
        // Object.keys(err.data.error).map((key) => {
        //   errText += `${key}: ${err.data.error[key]}\n`;
        //   return null;
        // });
        this.setState({
          errorappname: err.data.error.appname,
          erroraddress_line1: err.data.error.address_line1,
          errorcity: err.data.error.city,
          errorcontactname: err.data.error.contactname,
          errorcountry: err.data.error.contactname,
          errordescription: err.data.error.description,
          errordomains: err.data.error.domains,
          erroremail: err.data.error.email,
          errororganization_name: err.data.error.organization_name,
          errorphone: err.data.error.phone,
          errorprovince: err.data.error.province,
          erroroperations: err.data.error.operations
        });
      } else {
        this.setState({
          errorMessage: err.data.error
        });
      }

      this.setState({ loading: false });
    }
  }

  // Validating the form fields
  validate = (type) => {
    switch (type) {
      case 'appName':
        if ((this.state.appName.length >= 3 && this.state.appName.length <= 255) && !(this.validateSpecialChar(this.state.appName))) {
          this.setState({
            appErr: '',
          })
        } else {
          this.setState({
            appErr: '* Should be between 3 and 255 characters & special characters are not allowed.',
          })
        }
        break;
      case 'description':
        if (this.state.description.length >= 5 && this.state.description.length <= 1000) {
          this.setState({
            descriptionErr: '',
          })
        } else {
          this.setState({
            descriptionErr: '* Should be between 5 and 1000 characters',
          })
        }
        break;
      case 'organizationName':
        if (this.state.organizationName.length >= 2 && this.state.organizationName.length <= 255 && !(this.validateSpecialChar(this.state.organizationName))) {
          this.setState({
            organizationErr: '',
          })
        } else {
          this.setState({
            organizationErr: '* Should be between 2 and 255 characters & special characters are not allowed.',
          })
        }
        break;
      case 'addressLine1':
        if (this.state.addressLine1.length >= 5 && this.state.addressLine1.length <= 255) {
          this.setState({
            addLine1Err: '',
          })
        } else {
          this.setState({
            addLine1Err: '* Should be between 5 and 255 characters',
          })
        }
        break;
      case 'addressLine2':
        if (this.state.addressLine2.length >= 5 && this.state.addressLine2.length <= 255) {
          this.setState({
            addLine2Err: '',
            disableBtn: true
          })
        } else {
          this.setState({
            addLine2Err: '* Should be between 5 and 255 characters',
            disableBtn: false 
          })
        }
        if (this.state.addressLine2 === ''){
          this.setState({
            addLine2Err: '',
            disableBtn: true
          })
        }
        break;
      case 'city':
        if (this.state.city.length >= 2 && this.state.city.length <= 100) {
          this.setState({
            cityErr: '',
          })
        } else {
          this.setState({
            cityErr: '* Should be between 2 and 100 characters',
          })
        }
        break;
      case 'contact':
        var contactregex = /[0-9]/g

        if (this.state.contact.length >= 2 && this.state.contact.length <= 255 && !contactregex.test(this.state.contact)) {
          this.setState({
            contactErr: '',
          })
        } else {
          this.setState({
            contactErr: '* Should be between 2 and 255 characters & numbers not allowed.',
          })
        }
        break;
      case 'email':
        const email = this.state.email;

        if (ValidationUtil.seEmail(email).success) {
          this.setState({
            emailErr: '',
          })
        } else {
          this.setState({
            emailErr: '* Invalid email address',
          })
        }
        break;
      case 'phone':
        var phoneregex = new RegExp(/^[\]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/);

        if (phoneregex.test(this.state.phone)) {
          this.setState({
            phoneErr: '',
          })
        } else {
          this.setState({
            phoneErr: '* Should be a valid phone number',
          })
        }
        break;
      case 'domains':
        if (this.validateDomains(this.state.domains)) {
          this.setState({
            domainsErr: '',
          })
        } else {
          this.setState({
            domainsErr: '* Should be valid domains separated by commas',
          })
        }
        break;
      default:
    }
  };
  render() {
    const { countrySelected, provinceSelected, countryList, provinceList, operations, operationsSelected } = this.state;

    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">{this.props.location.state ? 'Edit App' : 'Create App'}</Card.Title>
              </Card.Header>
              <Card.Body>
                <form onSubmit={this.handleSubmit}>
                  <h5>App Info</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>App Name</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter app name"
                          name='appName'
                          onChange={this.handleAppNameChange}
                          value={this.state.appName}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.appErr}</h6>
                      <h6 style={{ color: "red" }} className='register__apiTxt--error'>{this.state.errorappname}</h6>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control type="text"
                          placeholder="Organization Name"
                          name='organizationName'
                          onChange={this.handleOrganizationChange}
                          value={this.state.organizationName}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.organizationErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.errororganization_name}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="5"
                          placeholder="Description"
                          name='description'
                          onChange={this.handleDescritionChange}
                          value={this.state.description}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.descriptionErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.errordescription}</h6>
                    </Col>
                  </Row>
                  <h5 className="mt-5">Address Info</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select"
                          placeholder="Enter Country"
                          value={countrySelected}
                          onChange={this.selectCountry}
                        >
                          <option value=''>None</option>
                          {countryList && countryList.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
                        </Form.Control>
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.errorcountry}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text"
                          placeholder="Address Line 1"
                          name='addressLine1'
                          onChange={this.handleAddressLine1Change}
                          value={this.state.addressLine1}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.addLine1Err}</h6>
                      <h6 style={{ color: "red" }} >{this.state.erroraddress_line1}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text"
                          placeholder="Address Line 2"
                          name='addressLine2'
                          value={this.state.addressLine2}
                          onChange={this.handleAddressLine2Change}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.addLine2Err}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter City"
                          name='city'
                          onChange={this.handleCityChange}
                          value={this.state.city}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.cityErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.errorcity}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select"
                          placeholder="Enter state"
                          value={provinceSelected}
                          onChange={this.selectRegion}
                        >
                          <option>None</option>
                          {provinceList && provinceList.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
                        </Form.Control>
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.errorprovince}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter Postal/Zip code"
                          name='postalCode'
                          onChange={this.handlePostalCodeChange}
                          value={this.state.postalCode}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="mt-5">Conctact Details</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter contact person"
                          name='contact'
                          onChange={this.handleContactChange}
                          value={this.state.contact}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.contactErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.errorcontactname}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter email"
                          name='email'
                          onChange={this.handleEmailChange}
                          value={this.state.email}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.emailErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.domainErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.erroremail}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text"
                          placeholder="Enter Phone"
                          name='phone'
                          onChange={this.handlePhoneChange}
                          value={this.state.phone}
                        />
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.phoneErr}</h6>
                      <h6 style={{ color: "red" }} >{this.state.errorphone}</h6>
                    </Col>
                  </Row>
                  <h5 className="mt-5">Others</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Form.Group variant='outlined' margin='normal'>
                        <InputLabel id='operationslabel'>Operations</InputLabel>
                        <Select
                          labelId='operationslabel'
                          id='operations'
                          multiple
                          value={operationsSelected}
                          onChange={this.selectOperations}
                          style={{maxWidth:350}}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          {operations && operations.map(({ name, id }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                        </Select>
                      </Form.Group>
                      <h6 style={{ color: "red" }} >{this.state.erroroperations}</h6>
                    </Col>
                    <Col md={6}>
                      <Form.Group >
                        <Form.Label>Domains</Form.Label>
                        <Form.Control as="textarea" rows="3"
                          placeholder="Domains"
                          name='domains'
                          onChange={this.handleDomainChange}
                          value={this.state.domains}
                        />
                        <h6 style={{ color: "red" }} >{this.state.domainsErr}</h6>
                        <h6 style={{ color: "red" }} >{this.state.errordomains}</h6>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md={6} xl={4} >
                    <Button variant="primary" disabled={!this.validateForm()} type='submit'>
                      {this.props.location.state ? 'Edit App' : 'Create App'}
                    </Button>
                  </Col>
                  <span style={{ color: "red" }}>{this.state.errorMessage}</span>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
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
)(FormsElements);