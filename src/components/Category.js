import { Component } from "../core/JStestCore";

export default class Category extends Component {
  render() {
    this.el.classList.add('employee', 'category')
    this.el.innerHTML = /*html*/ `
      <input type="checkbox" id="all-employees">
        <ul>
          <li>
            <div class="photo">PHOTO</div>
          </li>
          <li>FAMILY</li>
          <li>NAME</li>
          <li>PLANET</li>
          <li>DIVISION</li>
          <li>&nbsp</li>
        </ul>      
    `
  }
}