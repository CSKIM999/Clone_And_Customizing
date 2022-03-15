import TimerView from "../views/TimerView.js"
import ContentsView from "../views/ContentsView.js"
import RoutineView from "../views/RoutineView.js"
import MenuView from "../views/MenuView.js"



const tag = '[MainController]'
export default {
  init() {
    console.log(tag,'init()')
    TimerView.setup(document.querySelector('.timer'))

    ContentsView.setup(document.querySelector('.contents'))
    
    // RoutineView

    MenuView.setup(document.querySelector('.bottom_menu'))
      .on('@change' , e=> this.onChangeMenu(e.detail.menuName))

    this.selectedMenu = 'MAINPAGE'
    this.renderView()
  },

  renderView(){
    console.log(tag,'renderView()',this.selectedMenu)
    MenuView.setActiveMenu(this.selectedMenu)
    if (this.selectedMenu === 'MAINPAGE'){
      console.log('fetchMAINPAGE')
    } else if (this.selectedMenu === 'ROUTINE'){
      console.log('fetchROUTINE')
    } else {
      console.log('fetchCALENDER')
    }
  },

  onChangeMenu(menuName) {
    console.log(tag,'onChangeMenu()',menuName)
    this.selectedMenu = menuName
    this.renderView()
  }

}