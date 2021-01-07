import React from 'react';
import { NavLink } from 'react-router-dom';

// import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/`
})
 

class SignUp1 extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: ""
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()

        api.post('/api/v1/auth/sign-in', this.state)
            .then(res => {
                console.log(res)
                this.props.history.push('/dashboard/default')
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {

        const { login, password } = this.state

        
        return (
            <Aux>
                <Breadcrumb />
                <form onSubmit={this.submitHandler}>
                    <div className="auth-wrapper">
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
                                        <i className="feather icon-unlock auth-icon" />
                                    </div>
                                    <h3 className="mb-4">Login</h3>

                                    <div className="input-group mb-3">
                                        <input name="login" className="form-control" placeholder="Email"
                                            value={login}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input name='password' className="form-control" placeholder="password"
                                            value={password}
                                            onChange={this.changeHandler}
                                            type="password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary shadow-2 mb-4">Login</button>
                                    <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                    <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                                    {/* <LoginFooter></LoginFooter> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Aux>
        );
    }
}

export default SignUp1;