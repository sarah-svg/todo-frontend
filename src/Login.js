import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
console.log(this.state);
        this.setState({ loading:true })
        const user = await request
            .post(' https://salty-island-45456.herokuapp.com/auth/signin')
            .send(this.state);   // send state because the keys are the same
        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        
        this.props.history.push('/todo');
    }
    render() {
        return (
            <div className="login">
                <h1 className="login-h1">Hi welcome to the login page enter the following:</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Email:
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    {
                        this.state.loading
                        ? 'all your todo is one place'
                        : <button> LOG IN </button>
                    }
                </form>
            </div>
        )
    }
}