import { Component } from "../core/JStestCore";
import employeeStore, {
  dbService,
  getEmployeeDetail,
} from "../store/storeData";

export default class DataEdit extends Component {
  constructor() {
    super();
    this.tempData = null;

    employeeStore.subscribe("employee", () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add("container", "the-employee");

    this.el.innerHTML = /*html*/ `
      <div class="employee-info edit-title">Edit Profile</div>
      <div class="edit-area skeleton"></div>        
    `;

    const hash = window.location.hash;
    const queryParams = new URLSearchParams(hash.split("?")[1]);
    const id = queryParams.get("id");
    //employeeStore에 데이터 세팅이 안됐을 때
    if (Object.keys(employeeStore.state.employee).length === 0) {
      dbService.setEmployeeById(id);
      console.log(employeeStore.state.employee);
    }
    const employeeData = employeeStore.state.employee;
    console.log(employeeStore.state.employee, employeeData);

    setTimeout(() => {
      // 데이터가 제대로 반환되었는지 확인
      if (employeeData) {
        // 로컬 스토리지에서 데이터 불러오기
        const savedData =
          JSON.parse(localStorage.getItem(employeeData.Id)) || {};

        // 화면에 사원 정보를 출력합니다.
        this.el.innerHTML = /*html*/ `
          <div class="employee-info edit-title">Edit Profile</div>
          <div class="edit-area">
            <div class="write-area">    
              <div class="edit-subtitle">Edit</div>
              <div class="inputs">
                <textarea id="idInput" disabled>${employeeData.Id}</textarea>
                <textarea id="photoInput">${
                  savedData.Photo || employeeData.Photo
                }</textarea>
                <textarea id="nameInput">${
                  savedData.Name || employeeData.Name
                }</textarea>
                <textarea id="familyInput">${
                  savedData.Family || employeeData.Family
                }</textarea>
                <textarea id="planetInput">${
                  savedData.Planet || employeeData.Planet
                }</textarea>
                <textarea id="divisionInput">${
                  savedData.Division || employeeData.Division
                }</textarea>
                <textarea id="overviewInput">${
                  savedData.Overview || employeeData.Overview
                }</textarea>
              </div>
            </div>
          
            <div class="result-area">
              <div class="edit-subtitle">Result</div>
              <div class="results">
                <div class="specs">
                  <div class="photo" style="background-image: url(${
                    employeeData.Photo
                  })"></div>
                    <div class="specs-text">
                      <div class="name">${
                        savedData.Name || employeeData.Name
                      }</div>
                      <div class="family">${
                        savedData.Family || employeeData.Family
                      }</div>
                      <div class="planet">${
                        savedData.Planet || employeeData.Planet
                      }
                        &nbsp/&nbsp${
                          savedData.Division || employeeData.Division
                        }</div>
                    </div>
                </div>
                <div class="overview">${
                  savedData.Overview || employeeData.Overview
                }</div>
              </div>
            </div>
            
          </div>
          <div class="btn-area">
            <div class="delete-area">
              <button class="delete" id="deleteBtn">Delete</button>
            </div>
            <div class="submit-and-reset-area">
              <button type="reset" id="resetBtn">Reset</button >
              <button type="submit" id="submitBtn">Submit</button>
            </div>
          </div>
        `;

        const saveNewData = () => {
          this.tempData = {
            Id: employeeData.Id,
            Photo: document.getElementById("photoInput").value,
            Name: document.getElementById("nameInput").value,
            Family: document.getElementById("familyInput").value,
            Planet: document.getElementById("planetInput").value,
            Division: document.getElementById("divisionInput").value,
            Overview: document.getElementById("overviewInput").value,
          };
        };

        document.getElementById("submitBtn").addEventListener("click", () => {
          if (confirm("이대로 수정하시겠습니까?")) {
            saveNewData();
            console.log("this.tempData", this.tempData);
            if (this.tempData) {
              dbService.updateEmployee(this.tempData);
              this.tempData = null;
            }
            alert("수정 완료!");
          }
        });

        // 삭제 후 첫 페이지로
        document.getElementById("deleteBtn").addEventListener("click", () => {
          if (confirm("정말로 삭제하시겠습니까?")) {
            dbService.deleteById(employeeData.Id);
            alert("삭제되었습니다.");
            window.location.href = "#/";
            setTimeout(() => {
              window.location.reload();
            }, 1);
          }
        });

        // 페이지 새로고침(F5, 새로고침 클릭) 시 작성한 내용 초기화
        window.addEventListener("beforeunload", () => {
          this.tempData = null;
        });

        //작성 내용 초기화
        document.getElementById("resetBtn").addEventListener("click", () => {
          const savedData =
            JSON.parse(localStorage.getItem(employeeData.Id)) || {};

          document.getElementById("photoInput").value =
            savedData.Photo || employeeData.Photo;
          document.getElementById("nameInput").value =
            savedData.Name || employeeData.Name;
          document.getElementById("familyInput").value =
            savedData.Family || employeeData.Family;
          document.getElementById("planetInput").value =
            savedData.Planet || employeeData.Planet;
          document.getElementById("divisionInput").value =
            savedData.Division || employeeData.Division;
          document.getElementById("overviewInput").value =
            savedData.Overview || employeeData.Overview;
        });

        // textarea 높이 자동 조절
        function autoHeight(textarea) {
          textarea.style.height = "auto"; // 기본 높이로 설정
          textarea.style.height = textarea.scrollHeight + "px"; // scrollHeight로 내용의 높이를 계산하여 설정
        }

        // 모든 textarea 요소에 대해 자동 높이 조절 이벤트를 추가
        const textareas = document.querySelectorAll(
          "#photoInput, #overviewInput"
        );
        textareas.forEach((textarea) => {
          textarea.addEventListener("input", () => {
            autoHeight(textarea);
          });
        });

        // 초기화할 때 모든 textarea에 대해 높이를 조절
        textareas.forEach((textarea) => {
          autoHeight(textarea);
        });
      } else {
        console.log("뭔가 문제가 있어...");
      }
    }, 1234);
  }
}
