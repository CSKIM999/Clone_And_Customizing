import View from "./View.js";

const tag = '[MenuView]'

const MenuView = Object.create(View)

MenuView.setup = function (el) {
  this.init(el)
  this.bindClick()
  return this
}

MenuView.bindClick = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onClick(li.innerHTML))
  })
}


MenuView.setActiveMenu = function (menuName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.innerHTML === menuName ? li.className = "active" : li.className = ""
  })
}

MenuView.onClick = function (menuName) {
  this.setActiveMenu(menuName)
  this.emit('@change', { menuName })
}


export default MenuView