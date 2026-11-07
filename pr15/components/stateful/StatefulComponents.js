import React, { Component } from 'react';
import './StatefulComponents.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue || 0 };
  }
  render() {
    return (
      <div>
        <div className="counter">Счетчик: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>+1</button>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>-1</button>
      </div>
    );
  }
}

class LoginForm extends Component {
  state = { email: '', password: '', error: '' };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email.includes('@')) {
      this.setState({ error: 'Некорректный email' });
    } else {
      this.setState({ error: 'Успешный вход (имитация)' });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
        <div className="form-group">
          <input type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Пароль" onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
        <button type="submit">Войти</button>
        {this.state.error && <p className="error-text">{this.state.error}</p>}
      </form>
    );
  }
}

class TodoList extends Component {
  state = { todos: [], input: '' };
  addTodo = () => {
    if (this.state.input.trim()) {
      this.setState({
        todos: [...this.state.todos, { text: this.state.input, done: false }],
        input: ''
      });
    }
  };
  toggleTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].done = !newTodos[index].done;
    this.setState({ todos: newTodos });
  };
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>Todo List</h4>
        <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
        <button onClick={this.addTodo}>Добавить</button>
        <ul>
          {this.state.todos.map((todo, i) => (
            <li key={i} onClick={() => this.toggleTodo(i)} style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class StatefulComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Компоненты с состоянием</h2>
        <div className="component-demo">
          <h3>Задание 3: Классовые компоненты</h3>
          <div id="stateful-output-1" className="output">
            <Counter initialValue={0} />
            <LoginForm />
          </div>
        </div>
        <div className="component-demo">
          <h3>Задание 4: Обработка событий</h3>
          <div id="stateful-output-2" className="output">
            <TodoList />
          </div>
        </div>
      </section>
    );
  }
}
export default StatefulComponents;
