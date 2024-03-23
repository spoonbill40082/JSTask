import { Component } from "../core/JStestCore";
import { dbService, getEmployeeDetail } from "../store/storeData";

export default class DataEdit extends Component {
  constructor() {
    super();
    this.tempData = null;
  }

  render() {
    this.el.classList.add('container', 'the-employee');

    this.el.innerHTML = /*html*/ `
      <div class="employee-info edit-title">Edit Profile</div>
      <div class="edit-area skeleton"></div>        
    `;

    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id);
    console.log({ employeeData })

    setTimeout(() => {
      // 데이터가 제대로 반환되었는지 확인
      if (employeeData) {
        // 로컬 스토리지에서 데이터 불러오기
        const savedData = JSON.parse(localStorage.getItem(employeeData.Id)) || {};

        // 화면에 사원 정보를 출력합니다.
        this.el.innerHTML = /*html*/ `
          <div class="employee-info edit-title">Edit Profile</div>
          <div class="edit-area">

            <div class="write-area">    
              <div class="edit-subtitle">Edit</div>
              <div class="inputs">
                <textarea id="photoInput">${savedData.Photo || employeeData.Photo}</textarea>
                <textarea id="nameInput">${savedData.Name || employeeData.Name}</textarea>
                <textarea id="familyInput">${savedData.Family || employeeData.Family}</textarea>
                <textarea id="planetInput">${savedData.Planet || employeeData.Planet}</textarea>
                <textarea id="divisionInput">${savedData.Division || employeeData.Division}</textarea>
                <textarea id="overviewInput">${savedData.Overview || employeeData.Overview}</textarea>
              </div>
            </div>
          
            <div class="result-area">
              <div class="edit-subtitle">Result</div>
              <div class="results">
                <div class="specs">
                  <div class="photo" style="background-image: url(${employeeData.Photo})"></div>
                    <div class="specs-text">
                      <div class="name">${savedData.Name || employeeData.Name}</div>
                      <div class="family">${savedData.Family || employeeData.Family}</div>
                      <div class="planet">${savedData.Planet || employeeData.Planet}
                        &nbsp/&nbsp${savedData.Division || employeeData.Division}</div>
                    </div>
                </div>
                <div class="overview">${savedData.Overview || employeeData.Overview}</div>
              </div>
            </div>
            
          </div>
          <div class="btn-area">
            <div class="delete-area">
              <button class="delete" id="deleteBtn">Delete</button>
            </div>
            <div class="submit-and-reset-area">
              <button type="submit" class="reset" id="submitBtn">Submit</button>
              <button type="reset" id="resetBtn">Reset</button >
            </div>
          </div>
        `;



        // 입력된 내용을 임시 저장하는 함수
        const saveNewData = () => {
          this.tempData = {
            Id: employeeData.Id,
            Photo: employeeData.Photo,
            Name: document.getElementById('nameInput').value,
            Family: document.getElementById('familyInput').value,
            Planet: document.getElementById('planetInput').value,
            Division: document.getElementById('divisionInput').value,
            Overview: document.getElementById('overviewInput').value,
          };
        };

        // textarea 높이 자동 조절
        // textarea 요소의 높이를 자동으로 조절하는 함수
        function autoHeight(textarea) {
          textarea.style.height = 'auto'; // 기본 높이로 설정
          textarea.style.height = textarea.scrollHeight + 'px'; // scrollHeight로 내용의 높이를 계산하여 설정
        }

        // 모든 textarea 요소에 대해 자동 높이 조절 이벤트를 추가
        const textareas = document.querySelectorAll('#photoInput, #overviewInput');
        textareas.forEach(textarea => {
          textarea.addEventListener('input', () => {
            autoHeight(textarea);
          });
        });

        // 초기화할 때 모든 textarea에 대해 높이를 조절
        textareas.forEach(textarea => {
          autoHeight(textarea);
        });

        // input 요소에 change 이벤트 추가하여 내용이 변경될 때마다 임시 데이터 저장
        const changeData = document.querySelectorAll('input[type="text"], textarea');
        changeData.forEach(changeData => {
          changeData.addEventListener('change', saveNewData);
        });

        // Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
        document.getElementById('submitBtn').addEventListener('click', () => {
          if (confirm('이대로 수정하시겠습니까?')) {
            if (this.tempData) {
              dbService.updateMovie(this.tempData);
              this.tempData = null
            }
            alert('수정 완료!')
            window.location.reload();
          }

        });

        // 삭제 후 첫 페이지로
        document.getElementById('deleteBtn').addEventListener('click', () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            dbService.deleteById(employeeData.Id);
            alert('삭제되었습니다.');
            window.location.href = '#/';
            setTimeout(() => {
              window.location.reload()
            }, 1);
          }
        });


        // 페이지 새로고침(F5, 새로고침 클릭) 시 작성한 내용 초기화
        window.addEventListener('beforeunload', () => {
          this.tempData = null;
        });

        //작성 내용 초기화
        document.getElementById('resetBtn').addEventListener('click', () => {
          const savedData = JSON.parse(localStorage.getItem(employeeData.Id)) || {};

          document.getElementById('nameInput').value = savedData.Name || employeeData.Name;
          document.getElementById('familyInput').value = savedData.Family || employeeData.Family;
          document.getElementById('planetInput').value = savedData.Planet || employeeData.Planet;
          document.getElementById('divisionInput').value = savedData.Division || employeeData.Division;
          document.getElementById('overviewInput').value = savedData.Overview || employeeData.Overview;
        });

      } else {
        console.log('뭔가 문제가 있어...');
      }
    }, 1234);
  }
}
