import { Component } from "./core/JStestCore";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";


export default class App extends Component {
  render() {
    const theFooter = new TheFooter().el
    const theHeader = new TheHeader().el
    const routerView = document.createElement('router-view')

    this.el.append(
      theHeader,
      routerView,
      theFooter
    )
  }
}

