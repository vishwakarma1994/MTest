import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            registered:false,
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
            const token = Axios.post("/signup", { email, password });
            token.then(result => {
                if (result.data) {
                  this.setState({
                      registered:true
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
        if(this.state.registered){
            return <Redirect to="/" />
        }
        return (
            <div style={{padding:"200px"}}>
                <div className="row">
                    <div className="col-md-4">
                    <h5>Register</h5>
                    <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Register</button>
                    {this.state.error}
                </form>


                    </div>
                </div>
            </div>

        )
    }
}

export default Register;