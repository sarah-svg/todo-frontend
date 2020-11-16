import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        const user = await request
            .post('https://salty-island-45456.herokuapp.com/auth/signin')
            .send(this.state); 
        this.props.updateEmailAndToken(user.body.email, user.body.token)
        this.props.history.push('/todo');
    }

    render() {
        return (
            <div className="login">
                <label>Sign in with an existing account:</label>
                <form className='login' onSubmit = {this.handleSubmit}>
                    <div>
                        <label >Email:</label>
                        <input type='text' onChange={(e) => this.setState({ email: e.target.value })}></input>
                    </div>
                    <div>
                        <label id='password-label'>Password:</label>
                        <input type='password' onChange={(e) => this.setState({ password: e.target.value })}></input>
                    </div>
                    <button>Sign In</button>
                </form>
                <div>
                    <label>Don't have an account?</label>
                    <Link to="./signup">
                        <button>Sign Up</button>
                    </Link>
                    
                </div>
            </div>
        )
    }
}
