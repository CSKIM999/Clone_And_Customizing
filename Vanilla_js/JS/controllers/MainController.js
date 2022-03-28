import TimerView from "../views/TimerView.js"
import ContentsView from "../views/ContentsView.js"
import RoutineView from "../views/RoutineView.js"
import MenuView from "../views/MenuView.js"
import SettingView from "../views/SettingView.js"
import DetailView from "../views/DetailView.js"

import RoutineModel from "../models/RoutineModel.js"


const tag = '[MainController]'
export default {
  init() {
    TimerView.setup(document.querySelector('.timer'))
    ContentsView.setup(document.querySelector('.contents'))
    .on('@start', e=> this.onStart(e.detail.keyword))
    .on('@remove', e=> this.onRemove(e.detail.keyword))
    .on('@adjust', e=> this.onAdjust(e.detail.keyword))
    RoutineView.setup(document.querySelector('#routines_contents'))
    .on('@start', e=> this.onStart(e.detail.keyword))
    .on('@remove', e=> this.onRemove(e.detail.keyword))
    .on('@adjust', e=> this.onAdjust(e.detail.keyword))
    .on('@add', e=>this.fetchSetting(e.detail))
    // RoutineView
    
    MenuView.setup(document.querySelector('.bottom_menu'))
    .on('@change' , e=> this.onChangeMenu(e.detail.menuName))
    
    SettingView.setup(document.querySelector('#setting'))
      .on('@cancel', e=>this.renderMenu())
      .on('@addWorkout', e=> this.fetchDetail(e.detail))
    
    //DetailView 는 오직 SettingView 에게만 던지면 됨
    DetailView.setup(document.querySelector('#detail'))

    this.selectedMenu = 'MAINPAGE'
    this.renderMenu()
  },

  renderMenu(){
    MenuView.setActiveMenu(this.selectedMenu)
    if (this.selectedMenu === 'MAINPAGE'){
      this.fetchContent()
    } else if (this.selectedMenu === 'ROUTINE'){
      this.fetchRoutine()
    } else {
      console.log('fetchCALENDER')
    }
  },

  onChangeMenu(menuName) {
    MenuView.show()
    this.selectedMenu = menuName
    this.renderMenu()
  },

  fetchContent(){
    RoutineModel.list().then(data => {
      RoutineView.hide()
      SettingView.hide()
      TimerView.show()
      ContentsView.show()
      ContentsView.render(data)
    })
  },

  fetchRoutine(){
    RoutineModel.list().then(data =>{
      ContentsView.hide()
      SettingView.hide()
      TimerView.hide()
      RoutineView.show()
      RoutineView.render(data)

    })
  },

  fetchSetting(data){
    TimerView.hide()
    MenuView.hide()
    RoutineView.hide()
    ContentsView.hide()
    SettingView.show()
    SettingView.render(data)
  },

  fetchDetail(data){
    SettingView.hide()
    DetailView.show()
    DetailView.render(data)
  },


  onAdjust(keyword){
    console.log(tag,'onAdjust()',keyword)
    this.fetchSetting(RoutineModel.data[keyword])
    // todo....
    // Routinemodel.data[keyword] 던져줄 것  {name:'R1',detail:{[asf]}}
  },
  onStart(keyword){
    console.log(tag,'onStart()',keyword)
  },
  onRemove(keyword){
    console.log(tag,'onRemove()',keyword)
  }
}