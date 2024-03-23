import { Component } from "../core/JStestCore";
import searchEmployees from "../store/storeData"

// 검색 결과 창. 여기에 결과들이 출력된다.
//원본: 검색 결과 창에 a 태그로 만들어진 component가 10개씩 나온다.
//a 태그로 만들어진 component는 따로 존재함.

export default class EmployeesList extends Component {
  constructor() {
    super()
    searchEmployees.subscribe('employees', () => {
      this.render()
    })
    searchEmployees.subscribe('loading', () => {
      this.render()
    })
    searchEmployees.subscribe('message', () => {
      this.render()
    })
  }
  render() {
    this.el.classList.add('movie-list')
    this.el.innerHTML = /*html*/ `
      ${searchEmployees.state.message
        ? `<div class="message">${searchEmployees.state.message}</div>`
        : '<div class="movies"></div>'}
      <!-- <div class="the-loader hide"></div> -->
    `

    const moviesEl = this.el.querySelector('.movies')
    moviesEl?.append(
      ...searchEmployees.state.movies.map(movie => new MovieItem({
        movie
      }).el)
    )

    const loaderEl = this.el.querySelector('.the-loader')
    searchEmployees.state.loading
      ? loaderEl.classList.remove('hide')
      : loaderEl.classList.add('hide')
      
  }

}
