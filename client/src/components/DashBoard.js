import React, { Component } from 'react';
import Axios from 'axios';

class DashBoard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
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
        return (
            <div style={{padding:"200px"}}>
                <div className="row">
                    <div className="col-md-4">
                    <h5>DashBoard  </h5>
                        <p>Welcome....!</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default DashBoard;