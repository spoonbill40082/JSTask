import { Component } from "../core/JStestCore";
import { dbService } from "../store/storeData";

export default class Add extends Component {
  constructor() {
    super();
    this.tempData = null;
    this.addData
  }

  render() {
    this.el.classList.add('container', 'add');

    // 새로운 아이디 생성
    const newId = this.generateNewId();

    this.el.innerHTML = /*html*/ `
      <div class="employee-info add-title">Add Profile</div>
      <div class="employee-info add">
        <div class="photo" >
          <input type="text" placeholder="Photo" id="photoInput-add">
        </div>
        <div class="specs add">
          <div class="id add">
            <input type="text" value="${newId}" id="idInput-add" disabled>
          </div>
          <div class="name add">
            <input type="text" placeholder="Name" id="nameInput-add">
          </div>
          <div class="family add">
            <input type="text" placeholder="Family" id="familyInput-add">
          </div>
          <div class="planet add">
            <input type="text" placeholder="Planet" id="planetInput-add">&nbsp
            /&nbsp<input type="text" placeholder="Division" id="divisionInput-add">
          </div>
          <div class="overview add">
            <input type="text" placeholder="Overview" id="overviewInput-add">
          </div>
        </div>
      </div>
      <div class="btn-area">
        <div class="submit-and-reset-area">
          <button type="submit" class="reset" id="submitBtn-add">Submit</button>
          <button type="reset" id="resetBtn-add">Reset</button>
          <button id="cancelBtn">Cancel</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      // 입력된 내용을 임시 저장하는 함수
      const saveNewData = () => {
        this.tempData = {
          Photo: document.getElementById('photoInput-add').value,
          Name: document.getElementById('nameInput-add').value,
          Family: document.getElementById('familyInput-add').value,
          Planet: document.getElementById('planetInput-add').value,
          Division: document.getElementById('divisionInput-add').value,
          Overview: document.getElementById('overviewInput-add').value,
        };
      };

      // input 요소에 change 이벤트 추가하여 내용이 변경될 때마다 임시 데이터 저장
      const changeData = document.querySelectorAll('input[type="text"]');
      changeData.forEach(changeData => {
        changeData.addEventListener('change', saveNewData);
      });

      // Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
      document.getElementById('submitBtn-add').addEventListener('click', () => {
        if (confirm('이대로 추가하시겠습니까?')) {
          if (this.tempData) {
            this.addData(this.tempData);
            this.tempData = null;
            alert('추가 완료!');
            window.location.href = '#/';
            setTimeout(() => {
              window.location.reload();
            }, 1);
          }
        }
      });

      // 작성 내용 초기화(새로고침)
      document.getElementById('resetBtn-add').addEventListener('click', () => {
        // 각 input 요소의 값을 빈 문자열로 설정하여 초기화합니다.
        document.getElementById('photoInput-add').value = "";
        document.getElementById('idInput-add').value = "";
        document.getElementById('nameInput-add').value = "";
        document.getElementById('familyInput-add').value = "";
        document.getElementById('planetInput-add').value = "";
        document.getElementById('divisionInput-add').value = "";
        document.getElementById('overviewInput-add').value = "";
      });

      // 취소 버튼 클릭 시 메인 페이지로 이동
      document.getElementById('cancelBtn').addEventListener('click', () => {
        window.location.href = '#/';
      });
    }, 100);
  }

  // 새로운 아이디 미리 보기
  generateNewId() {
    const movies = dbService.getAll();
    const newId = `em${movies.length + 1}`;
    return newId;
  }

  addData(movie) {
    const movies = dbService.getAll();
    const movieItem = { ...movie, Id: `em${movies.length + 1}` };
    const newMovies = movies.concat(movieItem);
    dbService.persist(newMovies);
  }
}



