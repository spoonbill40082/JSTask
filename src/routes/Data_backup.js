import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeD";

export default class Movie extends Component {


  render() {
    this.el.classList.add('container', 'the-employee');

    this.el.innerHTML = /*html*/ `
      <div class="employee-info title">Profile</div>
      <div class="photo skeleton">
        <div class="in-skeleton"></div>   
      </div>
      <div class="specs skeleton"></div>
    `

    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id);

    setTimeout(() => {
      // 데이터가 제대로 반환되었는지 확인
      if (employeeData) {
        // 화면에 사원 정보를 출력합니다.
        this.el.innerHTML = /*html*/ `
        <div class="employee-info title">Profile</div>
        <div class="employee-info">
          <div class="photo" style="background-image: url(${employeeData.Photo})"></div>
          <div class="specs">
            <div class="name">${employeeData.Name}</div>
            <div class="family">${employeeData.Family}</div>
            <div class="planet">${employeeData.Planet} / ${employeeData.Division}</div>
            <div class="overview">${employeeData.Overview}</div>
          </div>
        </div>
      `;
      } else {
        console.log('Failed to fetch employee data.');
      }
    }, 1234);
  }
}

