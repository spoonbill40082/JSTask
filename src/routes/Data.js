import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeData";

export default class Data extends Component {


  render() {
    this.el.classList.add('container', 'the-employee');

    this.el.innerHTML = /*html*/ `
      <div class="employee-info title">Profile</div>
      <div class="photo skeleton">
        <div class="in-skeleton"></div>   
      </div>
      <div class="specs skeleton"></div>
    `

    const emData = getEmployeeDetail(history.state.id);
    const savedData = JSON.parse(localStorage.getItem(emData.Id)) || {};
    setTimeout(() => {

      if (emData) {

        this.el.innerHTML = /*html*/ `
        <div class="employee-info title">Profile</div>
        <div class="employee-info">
          <div class="photo" style="background-image: url(${savedData.Photo || emData.Photo})"></div>
          <div class="specs">
            <div class="name">${savedData.Name || emData.Name}</div>
            <div class="family">${savedData.Family || emData.Family}</div>
            <div class="planet">${savedData.Planet || emData.Planet} / ${savedData.Division || emData.Division}</div>
            <div class="overview">${savedData.Overview || emData.Overview}</div>
          </div>
        </div>
        <div class="edit-btn">          
            <a href="#/data/edit?id=${emData.Id}">Edit</a>
        </div>
      `;
      } else {
        console.log('불러오기 실패');
      }
    }, 1234);
  }
}

