import { Component } from "../core/JStestCore";
import movieStore, { searchMovies } from "../store/movie"

// 원본: 더 보기 버튼 영역. 버튼을 눌렀을 때 영역이 늘어나며 movieitem이 추가됨 //
// 원본: 더 볼 게 없으면 view more 버튼이 사라진다. //
// 수정본: infinity scroll. 데이터를 더 로드할 게 없으면 작동 정지//


export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: 'button'
    })
    movieStore.subscribe('pageMax', () => {
      const { page, pageMax } = movieStore.state
      pageMax > page 
      ? this.el.classList.remove('hide') 
      : this.el.classList.add('hide')
    })
  }
  render() {
    this.el.classList.add('btn', 'view-more', 'hide')
    this.el.textContent = 'VIEW MORE'

    this.el.addEventListener('click', async () => {
      this.el.classList.add('hide')
      await searchMovies(movieStore.state.page + 1)
    })
  }
}
