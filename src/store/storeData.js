import { Store } from "../core/JStestCore";
import employeeData from "./employeeData.json";


  /**
   * @desecription 데이터베이스에 데이터가 존재하지 않으면 최초 제이슨 파일로부터 데이터를 초기화한다.
   * @data employeeData.json
   */
  const initialize = () => {
    const db = localStorage.getItem("data");
    if (db) return;
    localStorage.setItem("data", JSON.stringify(employeeData));
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
  add: (movie) => {
    const movies = dbService.getAll();
    const movieItem = { ...movie, Id: `em${movies[movies.length + 1]}` }
    const newMovies = movies.concat(movieItem);
    dbService.persist(newMovies);
  },
  getById: (id) => {
    return dbService.getAll()
      .find(movie => movie.Id === id);
  },
  deleteById: (id) => {
    const list = dbService.getAll();
    const result = list.filter(movie => movie.Id !== id);
    localStorage.setItem("data", JSON.stringify(result));
    return result;
  },
  searchMovies: (keyword) => {
    const k = keyword.toLowerCase().trim();
    const list = dbService.getAll();
    const result = list.filter(movie => {
      const lowerMovieName = movie.Name.toLowerCase().trim();
      const lowerFamilyName = movie.Family.toLowerCase().trim();
      const lowerPlanetName = movie.Planet.toLowerCase().trim();
      const lowerDivisionName = movie.Division.toLowerCase().trim();

      return lowerMovieName.includes(k)
        || lowerFamilyName.includes(k)
        || lowerPlanetName.includes(k)
        || lowerDivisionName.includes(k);
    });
    localStorage.setItem("searchList", JSON.stringify(result));
    return result;
  },
  persist: (movies) => {
    localStorage.setItem('data', JSON.stringify(movies));
  },
  updateMovie: (movie) => {
    const movies = dbService.getAll();
    const index = movies.findIndex(movie => movie.Id === movie.Id);
    if (index == -1) throw Error("Can't find Movie Data");
    movies[index] = movie;
    dbService.persist(movies);
  },
};

const store = new Store({
  searchText: "",
  employees: dbService.getAll(),
  employee: {},
  loading: false,
  message: 'Search for the Movie Title',
  Name: "",
  Family: "",
  Planet: "",
  Division: "",
  Overview: ""
});

export default store;


export const searchEmployees = () => {
  store.state.loading = true;

  const callback = () => {
    if (!employeeData) {
      throw new Error('Employee data not found.');
    }
    initialize();
    const searchKeyword = store.state.searchText;
    const noSearch = searchKeyword.trim() === '';
    if (!noSearch) {
      return dbService.searchMovies(searchKeyword);
    }
    return dbService.getAll();
  };

  try {
    setTimeout(callback, 1000);
  } catch (error) {
    console.log('searchEmployees error:', error);
    store.state.message = 'Error';
  } finally {
    store.state.loading = false;
  }
};

// 사원 세부 정보 가져오는 함수
export const getEmployeeDetail = id => {
  return dbService.getById(id);
};