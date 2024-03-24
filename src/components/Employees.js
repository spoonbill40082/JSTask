import { Component } from "../core/JStestCore";
import EmployeeItem from "../components/EmployeeItem";
import employeeData, { dbService } from "../store/storeData";

export default class Employees extends Component {
  constructor() {
    super();

    // employees, loading, message 값이 변경될 때마다 render 함수 호출
    employeeData.subscribe("employees", () => {
      this.render();
    });
    employeeData.subscribe("loading", () => {
      this.render();
    });
    employeeData.subscribe("message", () => {
      this.render();
    });
  }

  render() {
    dbService.clearEmployee();
    this.el.classList.add("employee-list");
    this.el.innerHTML = /* html */ `
      <article></article>
    `;
    const divEl = this.el.querySelector("article");
    if (employeeData.state.loading) {
      divEl.innerHTML = `
        <div class="the-loader"></div>
      `;
      return;
    }

    const noSearch = employeeData.state.searchText.trim() === "";
    if (noSearch) {
      divEl.append(
        ...employeeData.state.employees.map(
          (data) =>
            new EmployeeItem({
              props: {
                photo: data.Photo,
                id: data.Id,
                family: data.Family,
                name: data.Name,
                planet: data.Planet,
                division: data.Division,
                overview: data.Overview,
              },
            }).el
        )
      );
      return;
    }

    const searchList = dbService.searchMovies(employeeData.state.searchText);
    divEl.append(
      ...searchList.map(
        (data) =>
          new EmployeeItem({
            props: {
              photo: data.Photo,
              id: data.Id,
              family: data.Family,
              name: data.Name,
              planet: data.Planet,
              division: data.Division,
              overview: data.Overview,
            },
          }).el
      )
    );
  }
}
