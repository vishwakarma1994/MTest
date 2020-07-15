import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: ''
        }

        // Bind Events
        this.onChange = this.onChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

    }

    componentDidMount() {
        const inputs = document.querySelectorAll(".input");
        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

    }

    // onValue Change
    onChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    // on FormSubmit
    formSubmit(ev) {
        ev.preventDefault();
        const { email, password } = this.state;
        try {
            const token = Axios.post("/login", { email, password });
            token.then(result => {
                if (result.data) {
                    localStorage.setItem("token", result.data.token);
                    this.setState({
                        loggedIn: true
                    })
                }
            })

        } catch (err) {
            this.setState({
                error: err.message
            });
        }
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div style={{padding:"200px"}}>
                <div className="row">
                    <div className="col-md-4">
                    <h5>Login</h5>
                    <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Login</button>
                    {this.state.error}
                </form>


                    </div>
                </div>
              


                {/* <form onSubmit={this.formSubmit}>
                    <h2 className="title">Welcome</h2>
                    <div className="input-div one">

                        <div className="div">
                            <h5>Username</h5>
                            <input type="text" className="input" name="email" value={this.state.email} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="input-div pass">

                        <div className="div">
                            <h5>Password</h5>
                            <input type="password" className="input" name="password" value={this.state.password} onChange={this.onChange} />
                        </div>
                    </div>
                    <input type="submit" className="l_btn" value="Login" />
                    {this.state.error}
                </form> */}
            </div>

        )
    }
}

export default Login;