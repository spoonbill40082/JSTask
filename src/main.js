import App from "./App";
import router from "./routes";

const root = document.querySelector('#root')
root.append(new App().el)

router()









// // checkbox 체크에 대한 chatGPT의 답변
// 그렇다면 어떤 변동이 있든 간에 저 코드가 기능할 수 있게 하려면 어떻게 해야 하니?
// ChatGPT
// 만약 페이지의 구조나 요소들이 변경될 수 있는 상황이라면, 해당 코드를 실행하는 방법을 유연하게 만들어야 합니다. 이를 위해선 두 가지 주요 방법이 있습니다.

// 이벤트 위임 사용: 모든 체크박스에 이벤트를 개별적으로 연결하는 대신, 부모 요소에 이벤트를 연결하여 하위 요소들의 이벤트를 캡처하도록 합니다. 이렇게 하면 새로운 체크박스가 추가되거나 제거되더라도 부모 요소에 이벤트가 연결되어 있으므로 동적인 변경에 대응할 수 있습니다.

// 동적 이벤트 연결: 페이지의 요소가 변경될 때마다 이벤트를 다시 연결합니다. 예를 들어 페이지가 로드될 때마다 이벤트를 다시 연결하거나, 페이지 내용이 변경될 때마다 이벤트를 다시 연결하는 방식입니다.

// 여기서는 두 번째 방법을 사용하여 동적 이벤트 연결을 구현하는 방법을 보여드리겠습니다. 이를 위해 MutationObserver를 사용하여 페이지 내용의 변경을 감지하고, 변경이 감지될 때마다 이벤트를 다시 연결할 것입니다.




// document.addEventListener('DOMContentLoaded', function () {
//   const selectAll = document.getElementById('all-employees');
//   const checkboxes = document.querySelectorAll('input[class=employee-checkbox]');
//   // const checkboxEls = document.querySelectorAll('.employees');

//   // 모두 선택에 체크
//   selectAll.addEventListener('change', function () {
//     checkboxes.forEach(checkbox => {
//       checkbox.checked = selectAll.checked;
//       bgColorChange(checkbox);
//     });
//   });
//   // 개별 선택에 체크
//   checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', function () {
//       bgColorChange(checkbox);
//       selectAll.checked = [...checkboxes].every(c => c.checked);
//     });
//   });
//   //체크할 때 색상 변경. 개별 선택 함수 안에서 작동함.
//   function bgColorChange(checkbox) {
//     if (checkbox.checked) {
//       checkbox.parentNode.classList.add('checked');      
//     } else {
//       checkbox.parentNode.classList.remove('checked');      // employeeEl.classList.remove('checked');
//     }
//   }
// });
