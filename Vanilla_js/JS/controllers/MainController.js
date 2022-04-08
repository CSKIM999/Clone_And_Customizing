import TimerView from "../views/TimerView.js"
import ContentsView from "../views/ContentsView.js"
import RoutineView from "../views/RoutineView.js"
import MenuView from "../views/MenuView.js"
import SettingView from "../views/SettingView.js"
import DetailView from "../views/DetailView.js"

import RoutineModel from "../models/RoutineModel.js"

const d = new Date()
const today = d.getFullYear()+""+("00"+(d.getMonth()+1)).slice(-2)+""+("00"+d.getDate()).slice(-2)
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
      // .on('@remove', e=>this.onRemove(e.detail))
      .on('@addWorkout', e=> this.fetchDetail(e.detail))
      .on('@adjWorkout', e=> this.fetchDetail({},e.detail.keyword,e.detail.index))
      .on('@save', e=>this.getSave(e.detail))
    //DetailView 는 오직 SettingView 에게만 던지면 됨
    DetailView.setup(document.querySelector('#detail'))
      .on('@push', e=> this.onPushDetail(e.detail))
      .on('@adjust', e=>this.onAdjustDetail(e.detail))
      .on('@cancel', e=>isNaN(this.handledDataAdj)?this.fetchSetting(this.handledData):this.fetchSetting(this.handledData,this.handledDataAdj))
    console.log(today)
    this.selectedMenu = 'MAINPAGE'
    this.renderMenu()
  },

renderMenu(){
  this.handledData = {}
  this.handledDataAdj = NaN
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

  fetchSetting(data,keyword=NaN,adj=NaN){
    DetailView.hide()
    TimerView.hide()
    MenuView.hide()
    RoutineView.hide()
    ContentsView.hide()
    SettingView.show()
    if (isNaN(adj)) {
      SettingView.render(data,keyword)
    } else {
      SettingView.render(data,keyword,adj)
    }
  },

  fetchDetail(data,keyword=NaN,adj=NaN){
    SettingView.hide()
    DetailView.show()
    if (isNaN(adj)) {
      keyword = data.keyword
      DetailView.render({},{keyword})
    } else{
      const data = JSON.parse(JSON.stringify(this.handledData.detail[adj]))
      DetailView.render(data,keyword,adj)
    }
  },

  getSave(e){
    if (isNaN(this.handledDataAdj)) {
      try{
        RoutineModel.add(e)
      } catch (error) {
        alert('이미 같은 이름의 ROUTINE 이 존재합니다')
        return this.fetchSetting(e)
      }
    } else {
      RoutineModel.update(this.handledDataAdj,e)
    }
    this.renderMenu()
  },

  // 본래 Object.assign 을 사용하다가 View 에서의 Model 수정문제로 인해 Deepcopy 를 사용하게 됨.
  // 데이터의 크기가 크지 않기때문에 굳이 lodash 대신 비교적 비효율적 JSON parse 를 통한 Deepcopy 를 사용함
  onAdjust(keyword){
    console.log(tag,'onAdjust()',keyword)
    this.handledData = JSON.parse(JSON.stringify(RoutineModel.data[keyword]))
    this.handledDataAdj = keyword
    this.fetchSetting(this.handledData,keyword,keyword)
  },

  onStart(keyword){
    console.log(tag,'onStart()',keyword)
  },

  onRemove(keyword){
    console.log(tag,'onRemove()',keyword)
    if (confirm('해당 항목을 삭제하시겠습니까?') == true) {
      const key = keyword.keyword
      if (keyword.index === undefined) {
        RoutineModel.remove(key)
        this.renderMenu()
      } else{
        const index = keyword.index
        RoutineModel.remove(key,index)
        this.fetchSetting(this.handledData,key)
      }
    } else {
      return
    }
    },

  onAdd(keyword){
    const index = RoutineModel.data.length
    this.handledData = {name:'temp',detail:[]}
    this.handledDataAdj = NaN
    this.fetchSetting(this.handledData,index)
  },

  onPushDetail(e) {
    const index = e.keyword
    if(this.handledData.detail.some(item=>item.name === e.data.name)) {
      return console.error('해당 이름의 Routine이 이미 존재합니다')
    } else {
      this.handledData.detail.push(e.data)
      this.fetchSetting(this.handledData,index.keyword)
    }
  },

  onAdjustDetail(e) {
    const index = e.keyword
    this.handledData.detail[e.adj] = e.data
    this.fetchSetting(this.handledData,index)
  },


  check(keyword) {
    debugger
  }
}