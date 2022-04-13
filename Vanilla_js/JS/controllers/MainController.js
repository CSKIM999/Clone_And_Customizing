import TimerView from "../views/TimerView.js"
import ContentsView from "../views/ContentsView.js"
import WorkoutView from "../views/WorkoutView.js"
import RoutineView from "../views/RoutineView.js"
import MenuView from "../views/MenuView.js"
import SettingView from "../views/SettingView.js"
import DetailView from "../views/DetailView.js"
import CalendarView from "../views/CalendarView.js"

import RoutineModel from "../models/RoutineModel.js"
import HistoryModel from "../models/HistoryModel.js"


const tag = '[MainController]'
export default {
  init() {
    TimerView.setup(document.querySelector('.timer'))
    ContentsView.setup(document.querySelector('.contents'))
      .on('@start', e => this.onStart(e.detail.keyword))
      .on('@remove', e => this.onRemove(e.detail.keyword))
      .on('@adjust', e => this.onAdjust(e.detail.keyword))
    WorkoutView.setup(document.querySelector('.workout'))

    RoutineView.setup(document.querySelector('#routines_contents'))
      .on('@start', e => this.onStart(e.detail.keyword))
      .on('@remove', e => this.onRemove(e.detail.keyword))
      .on('@adjust', e => this.onAdjust(e.detail.keyword))
      // .on('@add', e=>this.fetchSetting(e.detail))
      .on('@add', e => this.onAdd(e.detail))
    // RoutineView

    MenuView.setup(document.querySelector('.bottom_menu'))
      .on('@change', e => this.onChangeMenu(e.detail.menuName))

    SettingView.setup(document.querySelector('#setting'))
      .on('@cancel', e => this.renderMenu())
      // .on('@remove', e=>this.onRemove(e.detail))
      .on('@add', e => this.fetchDetail(e.detail))
      .on('@adjust', e => this.fetchDetail({}, e.detail.keyword, e.detail.index))
      .on('@save', e => this.getSave(e.detail))
    //DetailView 는 오직 SettingView 에게만 던지면 됨
    DetailView.setup(document.querySelector('#detail'))
      .on('@push', e => this.onPushDetail(e.detail))
      .on('@adjust', e => this.onAdjustDetail(e.detail))
      .on('@cancel', e => isNaN(this.handledDataAdj) ? this.fetchSetting(this.handledData) : this.fetchSetting(this.handledData, this.handledDataAdj))
    CalendarView.setup(document.querySelector('#calendar'))
      .on('@change', e => this.onChangeDate(e.detail))
      .on('@get', e => this.giveHistoryData(e.detail))
      .on('@remove', e => this.onRemoveHistory(e.detail))


    const d = new Date()
    this.today = { Year: d.getFullYear(), Month: ("00" + (d.getMonth() + 1)).slice(-2), day: ("00" + d.getDate()).slice(-2) }
    this.currentDay = { Year: d.getFullYear(), Month: (d.getMonth() + 1) }
    this.selectedMenu = 'MAINPAGE'
    this.renderMenu()
  },

  renderMenu() {
    this.handledData = {}
    this.handledDataAdj = NaN
    if (this.selectedMenu === 'MAINPAGE') {
    this.fetchContent()
    } else if (this.selectedMenu === 'ROUTINE') {
      this.fetchRoutine()
    } else {
      this.fetchCalendar()
    }
  },

  onChangeMenu(menuName) {
    MenuView.show()
    this.selectedMenu = menuName
    this.renderMenu()
  },

  fetchContent() {
    RoutineModel.list().then(data => {
      WorkoutView.hide()
      RoutineView.hide()
      CalendarView.hide()
      SettingView.hide()
      MenuView.show()
      TimerView.show()
      ContentsView.show()
      ContentsView.render(data)
    })
  },
  fetchWorkOut() {
    RoutineView.hide()
    CalendarView.hide()
    SettingView.hide()
    ContentsView.hide()
    MenuView.show()
    TimerView.show()
    WorkoutView.show()
    WorkoutView.render(this.workoutData)
  },
  fetchRoutine() {
    RoutineModel.list().then(data => {
      WorkoutView.hide()
      ContentsView.hide()
      CalendarView.hide()
      SettingView.hide()
      TimerView.hide()
      MenuView.show()
      RoutineView.show()
      RoutineView.render(data)
    })
  },

  fetchCalendar() {
    HistoryModel.list().then(data => {
      const DataForRender = this.getHistoryData(data) // [9,10,21,30] Array 형식 key값 반환
      WorkoutView.hide()
      ContentsView.hide()
      SettingView.hide()
      RoutineView.hide()
      TimerView.hide()
      MenuView.show()
      CalendarView.show()
      CalendarView.renderTop(DataForRender)
    })
  },

  fetchSetting(data, keyword = NaN, adj = NaN) {
    DetailView.hide()
    TimerView.hide()
    MenuView.hide()
    RoutineView.hide()
    ContentsView.hide()
    SettingView.show()
    if (isNaN(adj)) {
      SettingView.render(data, keyword)
    } else {
      SettingView.render(data, keyword, adj)
    }
  },

  fetchDetail(data, keyword = NaN, adj = NaN) {
    SettingView.hide()
    DetailView.show()
    if (isNaN(adj)) {
      keyword = data.keyword
      DetailView.render({}, { keyword })
    } else {
      const data = JSON.parse(JSON.stringify(this.handledData.detail[adj]))
      DetailView.render(data, keyword, adj)
    }
  },

  getSave(e) {
    if (isNaN(this.handledDataAdj)) {
      try {
        RoutineModel.add(e)
      } catch (error) {
        alert('이미 같은 이름의 ROUTINE 이 존재합니다')
        return this.fetchSetting(e)
      }
    } else {
      RoutineModel.update(this.handledDataAdj, e)
    }
    this.renderMenu()
  },

  onAdjust(keyword) {
    console.log(tag, 'onAdjust()', keyword)
    this.handledData = JSON.parse(JSON.stringify(RoutineModel.data[keyword]))
    this.handledDataAdj = keyword
    this.fetchSetting(this.handledData, keyword, keyword)
  },

  onStart(keyword) {
    console.log(tag, 'onStart()', keyword)
    debugger
    this.workoutData = JSON.parse(JSON.stringify(RoutineModel.data[keyword]))
    this.fetchWorkOut()
  },

  onRemove(keyword) {
    console.log(tag, 'onRemove()', keyword)
    if (confirm('해당 항목을 삭제하시겠습니까?') == true) {
      const key = keyword.keyword
      if (keyword.index === undefined) {
        RoutineModel.remove(key)
        this.renderMenu()
      } else {
        const index = keyword.index
        RoutineModel.remove(key, index)
        this.fetchSetting(this.handledData, key)
      }
    } else {
      return
    }
  },

  onAdd(keyword) {
    const index = RoutineModel.data.length
    this.handledData = { name: 'temp', detail: [] }
    this.handledDataAdj = NaN
    this.fetchSetting(this.handledData, index)
  },

  onPushDetail(e) {
    const index = e.keyword
    if (this.handledData.detail.some(item => item.name === e.data.name)) {
      return console.error('해당 이름의 Routine이 이미 존재합니다')
    } else {
      this.handledData.detail.push(e.data)
      this.fetchSetting(this.handledData, index.keyword)
    }
  },

  onAdjustDetail(e) {
    const index = e.keyword
    this.handledData.detail[e.adj] = e.data
    this.fetchSetting(this.handledData, index)
  },

  onChangeDate(e) {
    this.currentDay.Year = e.callYear
    this.currentDay.Month = e.callMonth
    this.fetchCalendar()
  },


  giveHistoryData(e) {
    HistoryModel.list().then(data => {
      const returnData = this.getHistoryData(data, e)
      CalendarView.renderBottom(returnData)
    })
  },

  getHistoryData(data, Bottom = false) {
    // for renderBottom
    if (Bottom) {
      const Year = Bottom.callYear
      const Month = Bottom.callMonth
      const Day = typeof (Bottom.e) === 'object' ? Bottom.e.textContent : Bottom.e
      if (data[Year] == undefined) {
        return undefined
      }
      return data[Year][Month] == undefined ? undefined :
        (data[Year][Month][Day] == undefined ? undefined : data[Year][Month][Day])
    }
    // for renderTop
    const Year = this.currentDay.Year
    const Month = +this.currentDay.Month
    if (data[Year] == undefined) {
      return undefined
    }
    return data[Year][Month] == undefined ? undefined : Object.keys(data[Year][Month]).map(x => +x)
  },

  onRemoveHistory(e) {
    const RYear = e.callYear
    const RMonth = e.callMonth
    const RDay = e.callDay
    const keyword = e.keyword
    HistoryModel.remove(RYear, RMonth, RDay, keyword)
    this.giveHistoryData({ callYear: RYear, callMonth: RMonth, e: RDay })
  },

  check(keyword) {
  }
}