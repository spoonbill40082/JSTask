import { Store } from "../core/JStestCore";
import sampleEmployeeData from "./employeeData.json";
import dayjs from "dayjs";
/**
 * @desecription 데이터베이스에 데이터가 존재하지 않으면 최초 제이슨 파일로부터 데이터를 초기화한다.
 * @data sampleEmployeeData.json
 */
const initialize = () => {
  const dataInLocalstorage = localStorage.getItem("data");

  if (dataInLocalstorage) return;

  const allEmployeeData = sampleEmployeeData;
  allEmployeeData.sort((a, b) => {
    const dateA = dayjs(a.CreateDate, "YYYY-MM-DD HH:mm:ss");
    const dateB = dayjs(b.CreateDate, "YYYY-MM-DD HH:mm:ss");

    return dateB.diff(dateA);
  });

  localStorage.setItem("data", JSON.stringify(allEmployeeData));
};

/**
 * @description 로컬스토리지 데이터를 제어하는 유틸리티
 */
export const dbService = {
  getAll: () => {
    initialize();
    const rawDb = localStorage.getItem("data");
    if (!rawDb) throw Error("db data is not exists");
    return JSON.parse(rawDb);
  },
  addData: (newEmployee) => {
    console.log(newEmployee);
    const newEmployeeList = store.state.employees.concat(newEmployee);
    store.state.employees = newEmployeeList;
    dbService.persist(newEmployeeList);
  },
  getById: (id) => {
    return dbService.getAll().find((movie) => movie.Id === id);
  },
  deleteById: (id) => {
    const list = dbService.getAll();
    const result = list.filter((movie) => movie.Id !== id);
    localStorage.setItem("data", JSON.stringify(result));
    return result;
  },
  searchMovies: (keyword) => {
    const k = keyword.toLowerCase().trim();
    const list = dbService.getAll();
    const result = list.filter((movie) => {
      const lowerMovieName = movie.Name.toLowerCase().trim();
      const lowerFamilyName = movie.Family.toLowerCase().trim();
      const lowerPlanetName = movie.Planet.toLowerCase().trim();
      const lowerDivisionName = movie.Division.toLowerCase().trim();

      return (
        lowerMovieName.includes(k) ||
        lowerFamilyName.includes(k) ||
        lowerPlanetName.includes(k) ||
        lowerDivisionName.includes(k)
      );
    });
    localStorage.setItem("searchList", JSON.stringify(result));
    return result;
  },
  persist: (movies) => {
    localStorage.setItem("data", JSON.stringify(movies));
  },
  updateEmployee: (selectedEmployee) => {
    if (store.state.employee.Id !== selectedEmployee.Id)
      throw Error("Employee Id is not matched.");
    store.state.employee = selectedEmployee;
    const _employeeData = store.state.employees;
    const index = _employeeData.findIndex(
      (employee) => employee.Id === selectedEmployee.Id
    );
    _employeeData[index] = selectedEmployee;
    dbService.persist(_employeeData);
  },
  setEmployeeById: (employeeId) => {
    store.state.employee = dbService.getById(employeeId);

    console.log("Family", store.state.employee.Family);
  },
  clearEmployee: () => (store.state.employee = {}),
  addEmployee: (employee) => {
    const newEmployeeList = store.state.employees.concat(employee);
    dbService.persist(newEmployeeList);
  },
};

const store = new Store({
  searchText: "",
  employees: dbService.getAll(),
  employee: {},
  loading: false,
  message: "Search for the Movie Title",
  Name: "",
  Family: "",
  Planet: "",
  Division: "",
  Overview: "",
});

export default store;

export const searchEmployees = () => {
  store.state.loading = true;

  const callback = async () => {
    try {
      // if (!sampleEmployeeData) {
      //   throw new Error("Employee data not found.");
      // }
      initialize();
      const searchKeyword = store.state.searchText;
      const noSearch = searchKeyword.trim() === "";
      let searchResult;
      if (!noSearch) {
        searchResult = await dbService.searchMovies(searchKeyword);
      } else {
        searchResult = await dbService.getAll();
      }

      // 검색 결과를 employeeData에 설정
      store.state.employees = searchResult;

      // 로딩 상태 변경
      store.state.loading = false;
    } catch (error) {
      console.log("searchEmployees error:", error);
      store.state.message = "Error";
      store.state.loading = false;
    }
  };

  setTimeout(callback, 1000);
};

// 사원 세부 정보 가져오는 함수
export const getEmployeeDetail = (id) => {
  return dbService.getById(id);
};
