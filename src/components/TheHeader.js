import { Component } from "../core/JStestCore";

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Main',
            href: '#/'
          },
          {
            name: 'Profile',
            href: '#/data?id=em1'
          },
          {
            name: 'About',
            href: '#/about'
          },
          {
            name: '+',
            href: '#/add'
          }
        ]
      }
    });
    window.addEventListener('popstate', () => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = /*html*/ `
      <a 
        href="#/" 
        class="logo">
        <span>D</span>
      </a>
      <nav>
        <ul>
          ${this.state.menus.map(menu => {
      const href = menu.href.split('?')[0];
      const hash = location.hash.split('?')[0];
      const isActive = href === hash;
      return /*html*/ `
              <li>
                <a 
                  class="${isActive ? 'active' : ''}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>
            `;
    }).join('')}
        </ul>
      </nav>
      <div class="header-right">
        <div id="darkOrSandy">Theme</div>
        <a href="#/about" class="user">
          D
        </a>
      </div>
    `;

    //__________테마 바꾸기__________//
    setTimeout(() => {
      document.getElementById("darkOrSandy").addEventListener("click", () => {
        const html = document.documentElement

        if (html.classList.contains("sand")) {
          html.classList.remove("sand")
          localStorage.setItem("sandTheme", "false")
        } else {
          html.classList.add("sand")
          localStorage.setItem("sandTheme", "true")
        }
      })

      const storedTheme = localStorage.getItem("sandTheme");

      if (storedTheme !== null) {
        if (storedTheme === "true") {
          document.documentElement.classList.add("sand");
        }
      } else if (window.matchMedia("(prefers-color-scheme: sand)").matches) {
        document.documentElement.classList.add("sand");
      }
    }, 100);



    this.el.querySelectorAll('.logo').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => location.reload(), 1);
      });
    });
  }
}
