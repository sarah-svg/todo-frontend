import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class ToDo extends Component {

    state = {
        toDoList: []
    }

    componentDidMount = async () => {
        const response = await request
            .get(' https://salty-island-45456.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const newToDo = {
            todo: this.state.todo,
            completed: false //fix in API
        }

        await request
            .post(' https://salty-island-45456.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
            .send(newToDo); 
        const response = await request
            .get(' https://salty-island-45456.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body})
    }

    handleCheckClick = async (id) => {
        await request
        .put(`https://salty-island-45456.herokuapp.com/api/todo/${id}`)
        .set('Authorization', this.props.token)
        
        const response = await request
        .get(' https://salty-island-45456.herokuapp.com/api/todo')
        .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body})
    }


    render() {
        return (
            <div className = 'todo'>
                <Link to="./">
                    <button onClick = {this.props.logout}>Log Out</button>
                </Link>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label>To Do:</label>
                        <input type='text' onChange={(e) => this.setState({ todo: e.target.value })}></input>
                    </div>
                    <button>Create</button>
                </form>
                <div>
                    {this.state.toDoList.map((todo, i) => 
                    <div>
                        {todo.completed ? <input key={`${todo.todo}-${Math.ceil(Math.random()*10000)}`} readOnly={true} type='radio' checked/> : <input key={`${todo.todo}-${Math.ceil(Math.random()*10000)}`} onChange={() => this.handleCheckClick(todo.id)} type='checkbox'/>}
                        <div key={`div-${todo.todo}-${i}`}>{todo.todo}</div>
                    </div>)}
                </div>
                
            </div>
        )
    }
}
