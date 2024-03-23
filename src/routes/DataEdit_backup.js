import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeD";

export default class Movie extends Component {
  render() {
    this.el.classList.add('container', 'the-employee');

    this.el.innerHTML = /*html*/ `
      <div class="employee-info edit-title">Edit Profile</div>
      <div class="photo skeleton">
        <div class="in-skeleton"></div>   
      </div>
      <div class="specs skeleton"></div>
    `;

    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id);

    setTimeout(() => {
      // 데이터가 제대로 반환되었는지 확인
      if (employeeData) {
        // 화면에 사원 정보를 출력합니다.
        this.el.innerHTML = /*html*/ `
          <div class="employee-info edit-title">Edit Profile</div>
          <div class="employee-info edit">
            <div class="photo" style="background-image: url(${employeeData.Photo})"></div>
            <div class="specs edit">
              <div class="name edit">${employeeData.Name}
                <input type="text" value="${employeeData.Name}" id="nameInput">
              </div>
              <div class="family edit">${employeeData.Family}
                <input type="text" value="${employeeData.Family}" id="familyInput">
              </div>
              <div class="planet edit">${employeeData.Planet} / ${employeeData.Division}
                <input type="text" value="${employeeData.Planet}" id="planetInput"> / <input type="text" value="${employeeData.Division}" id="divisionInput">
              </div>
              <div class="overview edit">${employeeData.Overview}
                <input type="text" value="${employeeData.Overview}" id="overviewInput">
              </div>
            </div>
          </div>
          <div class="btn-area">
            <div class="delete-area">
              <button class="delete">Delete</button>
            </div>
            <div class="submit-and-reset-area">
              <button type="submit" class="reset" id="submitBtn">Submit</button>
              <button type="reset" id="resetBtn">Reset</button >
            </div>
          </div>
        `;

        // 입력된 내용을 로컬 스토리지에 저장하는 함수
        const saveToLocalStorage = () => {
          localStorage.setItem('employeeData', JSON.stringify({
            Name: document.getElementById('nameInput').value,
            Family: document.getElementById('familyInput').value,
            Planet: document.getElementById('planetInput').value,
            Division: document.getElementById('divisionInput').value,
            Overview: document.getElementById('overviewInput').value,
          }));
        };

        // input 요소에 change 이벤트 추가하여 내용이 변경될 때마다 로컬 스토리지에 저장
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
          input.addEventListener('change', saveToLocalStorage);
        });

        // Submit 버튼 클릭 시 로컬 스토리지에 저장
        document.getElementById('submitBtn').addEventListener('click', saveToLocalStorage);
      } else {
        console.log('Failed to fetch employee data.');
      }
    }, 1234);
  }
}
