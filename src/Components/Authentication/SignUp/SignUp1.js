import React from 'react';
import {NavLink} from 'react-router-dom';

// import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import DEMO from "../../../store/constant";

// import { GenUtil} from '../../../utility';
// import {AuthService} from '../../../services';
// import {bindActionCreators} from 'redux';
// import { NavigateActions} from '../../../actions/index';
// import {connect} from 'react-redux';


// const translate = GenUtil.translate;

// import axios from 'axios';

// const api = axios.create({
//     baseURL: `http://localhost:3000/`
// })
 

class SignUp1 extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
// }

// changeHandler = e => {
//   this.setState({ [e.target.name]: e.target.value })
// }

// submitHandler = e => {
//   e.preventDefault()

//   api.post('/api/v1/auth/sign-up', this.state)
//       .then(res => {
//           // console.log(res)
//           // this.props.history.push('/dashboard/default')
//       })
//       .catch(error => {
//           console.log(error)
//       })
// }

// constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: '',
//       confirmPassword: '',
//       resultText: '',
//       errText: '',
//       registerDisabled: false,
//       isPasswordInputClicked: false,
//       isConfirmPasswordConfirmed: false,
//       isEmailInputClicked: false,
//       resetToDefault: false,
//       errors: {
//         email: '',
//         password: '',
//         confirmPassword: ''
//       }
//     };
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();

//     if (this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
//       this.setState({
//         errText: translate('register.responses.errorMissing')
//       });
//       return;
//     }

//     if (this.state.errors.email.success !== true|| this.state.errors.password.success !== true || this.state.errors.confirmPassword.success !== true) {
//       this.setState({
//         errText: ''
//       });
//       return;
//     }

//     const account = {
//       email: this.state.email,
//       password: this.state.password,
//       repeatPassword: this.state.password
//     };

//     this.setState({
//     //   registerDisabled: true
//     });

//     AuthService.register(account)
//       .then(() => {
//         this.setState({
//           errText: '',
//           resultText: translate('register.responses.confirmSent'),
//           registerDisabled: false,
//           resetToDefault: true,

//           // Clear Form Data
//           email: '',
//           password: '',
//           confirmPassword: '',
//           isPasswordInputClicked: false,
//           isConfirmPasswordConfirmed: false,
//           isEmailInputClicked: false
//         });
//       })
//       .catch((e) => {
//         console.error(e);
//         this.setState({
//           errText: e,
//           resultText: '',
//           registerDisabled: false
//         });
//       });
//   };

//   handleEmailChange = (email) => {
//     this.setState({
//       email: email,
//       isEmailInputClicked: true,
//     //   errors: {
//     //     ...this.state.errors,
//     //     email: ValidationUtil.seEmail(this.state.email)
//     //   }
//     }, () => this.validate('email'));
//   }

//   handlePasswordChange = (password) => {
//     this.setState({
//       password: password,
//       isPasswordInputClicked: true
//     }, () => this.validate('password'));
//   }

//   handleConfirmPasswordChange = (password) => {
//     this.setState({
//       confirmPassword: password,
//       isConfirmPasswordConfirmed: true
//     }, () => this.validate('confirmPassword'));
//   }

//   resetHandler = () => {
//     this.setState({resetToDefault: false});
//   }

//   validate = (type) => {
//     switch (type) {
//       case 'email':
//         this.setState({
//         //   errors: {
//         //     ...this.state.errors,
//         //     email: ValidationUtil.seEmail(this.state.email)
//         //   }
//         });
//         break;
//       case 'password':
//         this.setState({
//         //   errors: {
//         //     ...this.state.errors,
//         //     password: ValidationUtil.sePassword(this.state.password),
//         //     confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
//         //   }
//         });
//         break;
//       case 'confirmPassword':
//         this.setState({
//         //   errors: {
//         //     ...this.state.errors,
//         //     confirmPassword: ValidationUtil.seConfirmPassword(this.state.password, this.state.confirmPassword)
//         //   }
//         });
//         break;
//       default:
//     }
//   };
    
    render () {

    //   const { email, password, confirmPassword } = this.state
    // const {classes} = this.props;

        return(
            <Aux>
                <Breadcrumb/>
              <form>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input className="form-control" 
                                    placeholder="Email"
                                    name='email'
                                    type='email'
                                    // value={email}
                                    // onChange={this.changeHandler}
                                    // required


                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input className="form-control" 
                                    name='password'
                                    type='password'
                                    // value={password}
                                    // onChange={this.changeHandler}
                                    // placeholder="Password"
                                    // required
                                    
                                   />
                                </div>
                                <div className="input-group mb-4">
                                    <input className="form-control"
                                     name='confirmPassword'
                                     type='password'
                                    //  value={confirmPassword}
                                    //  onChange={this.changeHandler}
                                    //  placeholder="Confirm Password"
                                    //  required
                                    
                                    />
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        {/* <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/> */}
                                            {/* <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label> */}
                                    </div>
                                </div>
                                <button type='submit' className="btn btn-primary shadow-2 mb-4">Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
              </form>
            </Aux>
        );
    }
}

// const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['account', 'isLoggedIn'])});

// const mapDispatchToProps = (dispatch) => bindActionCreators(
//   {
//     // toggleModal: ModalActions.toggleModal,
//     // setModalType: ModalActions.setModalType,
//     navigateToLogin: NavigateActions.navigateToSignIn
//   },
//   dispatch
// );

export default SignUp1;
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(SignUp1);