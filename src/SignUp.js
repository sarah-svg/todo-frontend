import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        const user = await request
            .post('https://salty-island-45456.herokuapp.com/auth/signup')
            .send(this.state); 
        this.props.updateEmailAndToken(user.body.email, user.body.token)
        this.props.history.push('/todo');
    }

    render() {
        return (
            <div className= 'login'>
                <label>Sign up to create an account:</label>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label id='email-label'>Email:</label>
                        <input type='text' onChange={(e) => this.setState({ email: e.target.value })}></input>
                    </div>
                    <div className = 'row small-margin'>
                        <label id='password-label'>Password:</label>
                        <input type='password' onChange={(e) => this.setState({ password: e.target.value })}></input>
                    </div>
                    <button>Sign Up</button>
                </form>
                <div>
                    <label>Already have an account?</label>
                    <Link to="./signin">
                        <button>Sign In</button>
                    </Link>

                </div>

            </div>
        )
    }
}
