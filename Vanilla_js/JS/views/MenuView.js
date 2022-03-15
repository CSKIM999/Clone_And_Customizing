import View from "./View.js";

const tag = '[MenuView]'

const MenuView = Object.create(View)

MenuView.setup = function(el) {
  console.log(tag,'setup()',el)
  this.init(el)
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e=> this.onClick(li.innerHTML))
  })

  return this
}

MenuView.setActiveMenu = function(menuName) {
  console.log(tag,'setActiveMenu',menuName)
  this.show()
  Array.from(this.el.querySelectorAll('li')).forEach(li =>{
    li.className = li.innerHTML === menuName ? "active" : "none"
  })
}

MenuView.onClick = function(menuName) {
  this.setActiveMenu(menuName)
  this.emit('@change', {menuName})
}


export default MenuView