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
          <textarea id="photoInput-add" placeholder="Photo url"></textarea>
          <textarea id="idInput-add" disabled>${newId}</textarea>
          <textarea id="nameInput-add" placeholder="Name"></textarea>
          <textarea id="familyInput-add" placeholder="Family"></textarea>
          <textarea id="planetInput-add" placeholder="Planet"></textarea>
          <textarea id="divisionInput-add" placeholder="Division"></textarea>
          <textarea id="overviewInput-add" placeholder="Overview"></textarea>
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

       // textarea 높이 자동 조절     
       function autoHeight(textarea) {
        textarea.style.height = 'auto'; // 기본 높이로 설정
        textarea.style.height = textarea.scrollHeight + 'px'; // scrollHeight로 내용의 높이를 계산하여 설정
      }

      // 모든 textarea 요소에 대해 자동 높이 조절 이벤트를 추가
      const textareas = document.querySelectorAll('#photoInput-add, #overviewInput-add');
      textareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
          autoHeight(textarea);
        });
      });

      // 초기화할 때 모든 textarea에 대해 높이를 조절
      textareas.forEach(textarea => {
        autoHeight(textarea);
      });


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
      const changeData = document.querySelectorAll('textarea');
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



