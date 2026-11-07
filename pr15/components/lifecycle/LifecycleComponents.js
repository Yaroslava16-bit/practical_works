import React, { Component } from 'react';
import './LifecycleComponents.css';

class Timer extends Component {
  state = { seconds: 0, isRunning: false };
  interval = null;

  componentDidMount() { console.log('Timer mounted'); }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
    console.log('Timer unmounted');
  }

  start = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.interval = setInterval(() => this.setState(prev => ({ seconds: prev.seconds + 1 })), 1000);
    }
  };
  stop = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  };
  reset = () => {
    this.stop();
    this.setState({ seconds: 0 });
  };

  render() {
    return (
      <div>
        <div className="timer">Секунд: {this.state.seconds}</div>
        <button onClick={this.start}>Старт</button>
        <button onClick={this.stop}>Стоп</button>
        <button onClick={this.reset}>Сброс</button>
      </div>
    );
  }
}

class WindowSizeTracker extends Component {
  state = { width: window.innerWidth, height: window.innerHeight };
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => this.setState({ width: window.innerWidth, height: window.innerHeight });
  render() {
    return <div>Размер окна: {this.state.width} x {this.state.height}</div>;
  }
}

class LifecycleComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Жизненный цикл компонентов</h2>
        <div className="component-demo">
          <h3>Задание 5: Методы жизненного цикла</h3>
          <div id="lifecycle-output" className="output">
            <Timer />
            <WindowSizeTracker />
          </div>
        </div>
      </section>
    );
  }
}
export default LifecycleComponents;
