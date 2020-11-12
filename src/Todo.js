import React, { Component } from 'react'
import request from 'superagent';

export default class todos extends Component {
    state = {
        todos: [],
        todosName: '',
        done: '',
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchtodos()
    }

    fetchtodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.get(' https://salty-island-45456.herokuapp.com/api/todo')
            .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { done, todosName } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            name: todosName,
            done: done,
        };

        await this.setState({ loading: true });

        await request.post('https://salty-island-45456.herokuapp.com/api/todo')
            .send(newTodo)
            .set('Authorization', token);

        await this.fetchtodos();
    }

    handleTodoClick = async (someId) => {
        const { token } = this.props;

    
        await request.put(`https://salty-island-45456.herokuapp.com/api/todos/${someId}`)
            .set('Authorization', token);

        await this.fetchtodos();
    }
    handleDoneChange = (e) => {
        this.setState({ cool: e.target.value });
    }
    render() {
        const {
            todosName,
          
            loading,
            todos,
        } = this.state;

        return (
            <div className="todo">
                Welcome to todos!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a todo:
                        <input
                            value={todosName}
                            onChange={(e) => this.setState({ todosName: e.target.value })}
                        />
                    </label>
                    <label >
                        {/* done:
                        <input
                            // defaultValue={this.state.todo.done}
                            onChange={(e) => this.setState({ done: e.target.value })}
                        /> */}
	                            <select onChange={(e) => this.setState({ done: e.target.value })} >

                                <option value="true" style={{textDecoration: this.setState ? 'line-through' : 'none'}}>true</option>
                                <option value="false">false</option>
                                </select>
                    </label>
                    <button>
                        Add todo
                        </button>
                </form>
                {
                    loading
                        ? 'LOADING!!!!!'
                        : todos.map(todo => <div key={`${todo.name}${todo.id}${Math.random()}`} style={{
                            textDecoration: todo.done ? 'line-through' : 'none'
                        }
                        }>
                            name: {todo.name}
                            {
                                todo.done ? '' : <button className="hidden"
                            
                                    onClick={() => this.handleTodoClick(todo.id)}>
                                    
                            </button>
                            }
                        </div>)
                }
            </div>
        )
    }
}