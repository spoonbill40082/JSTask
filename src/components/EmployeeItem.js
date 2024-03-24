import { Component } from "../core/JStestCore";

export default class EmployeeItem extends Component {
  constructor(payload) {
    super({
      props: payload.props,
    });
  }

  render() {
    const em = this.props;
    const savedData = JSON.parse(localStorage.getItem(em.id)) || {};
    const localStorageKeys = Object.keys(localStorage); // 로컬 스토리지의 모든 키를 가져옴

    if (em.id && !isEmpty(savedData) && savedData.Id !== "") {
      // "Id": ""이 아니고, 빈 데이터가 아닌 경우에만 렌더링
      this.el.classList.add("employee-single");
      this.el.innerHTML = /* html */ `
        <input type="checkbox" class="employee-checkbox">
        <ul>
          <li>
            <div class="photo" style="background-image: url('${
              em.photo
            }')" ></div>
          </li>
          <li>${savedData.Family || em.family}</li>
          <li>${savedData.Name || em.name}</li>
          <li>${savedData.Planet || em.planet}</li>
          <li>${savedData.Division || em.division}</li>
          <li class="see-and-edit">
            <div class="see-and-edit-btn">              
              <a href="#/data?id=${em.id}">Detail</a>
              <a href="#/data/edit?id=${em.id}">Edit</a>
            </div>
          </li>
        </ul>
      `;
    } else if (em.id && !localStorageKeys.includes(em.id)) {
      // 로컬 스토리지에 해당 키가 없는 경우에도 렌더링
      this.el.classList.add("employee-single");
      this.el.innerHTML = /* html */ `
        <input type="checkbox" class="employee-checkbox">
        <ul>
          <li>
            <div class="photo" style="background-image: url('${em.photo}')" ></div>
          </li>
          <li>${em.family}</li>
          <li>${em.name}</li>
          <li>${em.planet}</li>
          <li>${em.division}</li>
          <li class="see-and-edit">
            <div class="see-and-edit-btn">              
              <a href="#/data?id=${em.id}">Detail</a>
              <a href="#/data/edit?id=${em.id}">Edit</a>
            </div>
          </li>
        </ul>
      `;
    }

    // 디버깅용
    this.el.addEventListener("click", () => {
      console.log(em.name);
    });

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  }
}
