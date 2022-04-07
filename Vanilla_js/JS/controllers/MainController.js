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
    // .on('@add', e=>this.fetchSetting(e.detail))
    .on('@add', e=>this.onAdd(e.detail))
    // RoutineView
    
    MenuView.setup(document.querySelector('.bottom_menu'))
    .on('@change' , e=> this.onChangeMenu(e.detail.menuName))
    
    SettingView.setup(document.querySelector('#setting'))
      .on('@cancel', e=>this.renderMenu())
      .on('@remove', e=>this.onRemove(e.detail))
      .on('@addWorkout', e=> this.fetchDetail(e.detail))
      .on('@adjWorkout', e=> this.fetchDetail({},e.detail.keyword,e.detail.index))
    
    //DetailView 는 오직 SettingView 에게만 던지면 됨
    DetailView.setup(document.querySelector('#detail'))
      .on('@push', e=> this.onPushDetail(e.detail))
      .on('@adjust', e=>this.onAdjustDetail(e.detail))
    
    this.selectedMenu = 'MAINPAGE'
    this.renderMenu()
},

renderMenu(){
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
      MenuView.show()
      RoutineView.hide()
      SettingView.hide()
      TimerView.show()
      ContentsView.show()
      ContentsView.render(data)
    })
  },

  fetchRoutine(){
    RoutineModel.list().then(data =>{
      MenuView.show()
      ContentsView.hide()
      SettingView.hide()
      TimerView.hide()
      RoutineView.show()
      RoutineView.render(data)

    })
  },

  fetchSetting(data,keyword=NaN){
    DetailView.hide()
    TimerView.hide()
    MenuView.hide()
    RoutineView.hide()
    ContentsView.hide()
    SettingView.show()
    SettingView.render(data,keyword)
  },

  fetchDetail(data,keyword=NaN,adj=NaN){
    SettingView.hide()
    DetailView.show()
    if (isNaN(adj)) {
      keyword = data.keyword
      DetailView.render({},{keyword})
    } else{
      const data = Object.assign({},RoutineModel.data[keyword].detail[adj])
      DetailView.render(data,keyword,adj)
    }
  },


  onAdjust(keyword){
    console.log(tag,'onAdjust()',keyword)
    this.fetchSetting(RoutineModel.data[keyword],keyword)
    // todo....
    // Routinemodel.data[keyword] 던져줄 것  {name:'R1',detail:{[asf]}}
  },
  onStart(keyword){
    console.log(tag,'onStart()',keyword)
  },
  onRemove(keyword){
    console.log(tag,'onRemove()',keyword)
    const key = keyword.keyword
    if (keyword.index === undefined) {
      RoutineModel.remove(key)
      this.renderMenu()
    } else{
      const index = keyword.index
      RoutineModel.remove(key,index)
      this.fetchSetting(RoutineModel.data[key],key)
    }
    debugger
    },

  onAdd(keyword){
    const index = RoutineModel.data.length
    RoutineModel.add('temp',[])
    this.fetchSetting(RoutineModel.data[index],index)
  },

  onPushDetail(e) {
    const index = e.keyword
    RoutineModel.clip(index.keyword,e.data)
    this.fetchSetting(RoutineModel.data[index.keyword],index.keyword)
  },

  onAdjustDetail(e) {
    const index = e.keyword
    RoutineModel.update(e.keyword,e.adj,e.data)
    this.fetchSetting(RoutineModel.data[index],index)
  },


  check(keyword) {
    debugger
  }
}