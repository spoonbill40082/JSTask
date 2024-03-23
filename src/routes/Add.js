import { Component } from "../core/JStestCore";
// import { getEmployeeDetail } from "../store/storeData";
// import { writeNewData } from "../store/storeData";


// 새 데이터 추가
export default class Add extends Component {

  render() {
    this.el.classList.add('container', 'add');


      this.el.innerHTML = /*html*/ `
        <div class="employee-info edit-title">Edit Profile</div>
        <div class="employee-info edit">
          <div class="photo" placeholder = "이미지 url" id="addPhotoInput"></div>
          <div class="specs edit">
            <input type="text" placeholder = "이름" id="addNameInput">            
            <input type="text" placeholder = "패밀리" id="addFamilyInput">            
            <input type="text" placeholder = "행성" id="addPlanetInput"> / <input type="text" value="${employeeData.Division}" id="divisionInput">
            <input type="text" placeholder = "설명" id="addOverviewInput">
            </div>
          </div>
        </div>
        <div class="btn-area">
          <div class="add-area">
            <button class="add" id="addButton">Add</button>
          </div>
        </div>
      `;
        // 입력된 내용을 임시 저장하는 함수
        const saveNewData = () => {
          this.tempData = {
            Name: document.getElementById('nameInput').value,
            Family: document.getElementById('familyInput').value,
            Planet: document.getElementById('planetInput').value,
            Division: document.getElementById('divisionInput').value,
            Overview: document.getElementById('overviewInput').value,
          };
        };

        // input 요소에 change 이벤트 추가하여 내용이 변경될 때마다 임시 데이터 저장
        const changeData = document.querySelectorAll('input[type="text"]');
        changeData.forEach(changeData => {
          changeData.addEventListener('change', saveNewData);
        });

        // Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
        document.getElementById('submitBtn').addEventListener('click', () => {
          if (confirm('이대로 수정하시겠습니까?')) {
            if (this.tempData) {
              localStorage.setItem(employeeData.Id, JSON.stringify(this.tempData));
              this.tempData = null
            }
            alert('수정 완료!')
            window.location.reload();
          }

        });
  }
}

