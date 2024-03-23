import { Component } from "../core/JStestCore";
import Employees, { searchEmployees } from "../store/storeData"


// 검색창. input 태그에 검색어를 작성한다.
// addEventListener click과 keydown 기능을 사용해 검색 기능이 동작하게 만든다.


export default class Search extends Component {

  render() {
    // 브라우저에 보일 요소
    this.el.classList.add('search')
    this.el.innerHTML = /*html*/ `
      <input 
        id="searchInput"
        value="${Employees.state.searchText}"
        placeholder="Search by employee Id, Name, Family, Planet, or Division..."
      />
      <button class="btn btn-primary" id="searchButton">
        SEARCH
      </button>   
    `

    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      Employees.state.searchText = inputEl.value
    })
    inputEl.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        searchEmployees()
      }
    })

    const btnEl = this.el.querySelector('.btn')
    btnEl.addEventListener('click', () => {
      searchEmployees()
    })
  }
}