// import "./App.css";
// import logo from "./logo.svg";
// import { Counter } from "./store/features/Counter";

import React, { Component } from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter></Counter>
//       </header>
//     </div>
//   );
// }

// export default App;
class ReactEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.onReactClick = this.onReactClick.bind(this);
    this.onReactChildClick = this.onReactChildClick.bind(this);
  }
  componentDidMount() {
    //获取当前真实DOM元素
    const thisDOM = document.querySelector(".fa");
    thisDOM.addEventListener("click", this.onDOMClick, false);
    //获取子元素并绑定事件
    const thisDOMChild = thisDOM.querySelector(".child");
    thisDOMChild.addEventListener("click", this.onDOMChildClick, false);
  }
  onDOMClick(e) {
    console.log("父组件原生事件绑定事件触发");
  }
  onDOMChildClick(e) {
    e.stopPropagation();
    console.log("子元素原生事件绑定事件触发");
  }
  //
  onReactClick(e) {
    console.log("父组件React合成事件绑定事件触发");
  }

  onReactChildClick(e) {
    // e.stopPropagation();
    console.log("子元素React合成事件绑定事件触发");
  }
  render() {
    return (
      <div className="fa" onClick={this.onReactClick}>
        父元素单击事件触发
        <button className="child" onClick={this.onReactChildClick}>
          子元素单击事件触发
        </button>
      </div>
    );
  }
}
export default ReactEvent;
