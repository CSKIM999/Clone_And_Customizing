import TimerView from "../views/TimerView.js"
import ContentsView from "../views/ContentsView.js"
import RoutineView from "../views/RoutineView.js"
import MenuView from "../views/MenuView.js"

import RoutineModel from "../models/RoutineModel.js"


const tag = '[MainController]'
export default {
  init() {
    console.log(tag,'init()')
    TimerView.setup(document.querySelector('.timer'))

    ContentsView.setup(document.querySelector('.contents'))
      .on('@start', e=> this.onStart(e.detail.keyword))
      .on('@remove', e=> this.onRemove(e.detail.keyword))
      .on('@adjust', e=> this.onAdjust(e.detail.keyword))
    RoutineView.setup(document.querySelector('#routines_contents'))
      .on('@start', e=> this.onStart(e.detail.keyword))
      .on('@remove', e=> this.onRemove(e.detail.keyword))
      .on('@adjust', e=> this.onAdjust(e.detail.keyword))
    // RoutineView

    MenuView.setup(document.querySelector('.bottom_menu'))
      .on('@change' , e=> this.onChangeMenu(e.detail.menuName))

    this.selectedMenu = 'MAINPAGE'
    this.renderView()
  },

  renderView(){
    // console.log(tag,'renderView()',this.selectedMenu)
    MenuView.setActiveMenu(this.selectedMenu)
    if (this.selectedMenu === 'MAINPAGE'){
      console.log('fetchContent')
      this.fetchContent()
    } else if (this.selectedMenu === 'ROUTINE'){
      console.log('fetchROUTINE')
      this.fetchRoutine()
    } else {
      console.log('fetchCALENDER')
    }
  },

  onChangeMenu(menuName) {
    this.selectedMenu = menuName
    this.renderView()
  },

  fetchContent(){
    RoutineModel.list().then(data => {
      RoutineView.hide()
      TimerView.show()
      ContentsView.show()
      ContentsView.render(data)
    })
  },

  fetchRoutine(){
    RoutineModel.list().then(data =>{
      ContentsView.hide()
      TimerView.hide()
      RoutineView.show()
      RoutineView.render(data)

    })
  },

  onAdjust(keyword){
    console.log(tag,'onAdjust()',keyword)
  },
  onStart(keyword){
    console.log(tag,'onStart()',keyword)
  },
  onRemove(keyword){
    console.log(tag,'onRemove()',keyword)
  }
}