import { Component } from "../core/JStestCore";

export default class Headline extends Component {
  render() {
    this.el.classList.add('headline')
    this.el.innerHTML = /* html */ `
    <ul>
      <li class="title">DUNE</li>
      <ul class="subtitle">
        <li>SURVIVED</li>
        <li>AND DEAD</li>
      </ul>
    </ul>
    <p>
      You’re afraid. What do you see that you fear?<br>
      Holy war. Spreading across the universe like unquenchable fire.<br>
      A warrior religion that waves the Atreides banner. Fanatical legions worshipping at the shrine of my father’s skull. <br>
      A crusade. In my name. My name. That’s the future.<br>
      It’s coming.
    </p>
    `
  }
}