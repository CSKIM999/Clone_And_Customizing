import View from "./View.js"

const tag = '[CalendarView]'
const CalendarView = Object.create(View)


CalendarView.template = {
  BasicTop: `<div id = 'calendar_header'>CALENDAR</div><div id = "calendarTop"><div class = 'calendarToggle' >
  <button class = "dateToggle"><</button><span id = "currentDate">DATE</span><button class = "dateToggle">></button>
  </div>
  <div id = "calendarBody"></div></div>`,
  BasicBottom: `<div id = 'calendarBottom'>
  <div class ='none' id='calendarDetailCover'>운동 정보가 없습니다</div>
  <div class='none' id = 'calendarDetail'></div></div>`
}

CalendarView.setup = function (el) {
  this.init(el)
  this.show()
  this.el.innerHTML = this.template.BasicTop + this.template.BasicBottom
  this.currentYear = new Date().getFullYear()
  this.currentMonth = new Date().getMonth()
  this.selectedDay = 0
  return this
}

CalendarView.renderTop = function (data = undefined) {
  this.histData = data
  const fromDay = new Date(this.currentYear, this.currentMonth, 0)
  const nowDay = new Date(this.currentYear, this.currentMonth + 1, 0)
  this.el.querySelector('#calendarBody').innerHTML = this.getCalendarHTML(fromDay, nowDay)
  this.el.querySelector('#calendarBody').className = `restart`
  this.el.querySelector('#currentDate').innerHTML = this.currentYear + "." + (this.currentMonth + 1)
  this.bindClickEvent()
  const ani__target = this.el.querySelector('#calendarTop')
  ani__target.style.animation = "slideInRight 0.3s ease-in-out"
  const ani__target_Body = this.el.querySelector('#calendarBody')
  ani__target_Body.style.animation = "slideInRight 0.4s ease-in-out"
  ani__target.classList.add('ani__run')

}

CalendarView.renderBottom = function (data = undefined) {
  this.el.querySelector('#calendarDetailCover').className = 'none'
  this.el.querySelector('#calendarDetail').className = 'detail'
  if (data == undefined) {
    this.el.querySelector('#calendarDetailCover').className = 'detail'
    this.el.querySelector('#calendarDetail').className = 'none'
    const blankTarget = this.histData.indexOf(this.selectedDay)
    delete this.histData[blankTarget]
    this.renderTop(this.histData)
  } else {
    this.el.querySelector('#calendarDetail').innerHTML = this.getCalendarBottomHTML(data)
  }
  this.bindClickEvent()
}

CalendarView.getCalendarHTML = function (fromDay, nowDay) {
  const beforeDate = fromDay.getDate()
  const beforeDay = fromDay.getDay()
  const afterDate = nowDay.getDate()
  const afterDay = nowDay.getDay()
  let returnHTML = `<ul><li class = "calendarColumn">`
  let count = 1

  for (let i = beforeDate - beforeDay; beforeDay < 6 ? i <= beforeDate : 0; i++ && count++) {
    returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "prevMonth">' + i + '</div>'
    count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  for (let i = 1; i <= afterDate; i++ && count++) {
    const histCheckpoint = this.histData ? (this.histData.indexOf(i) >= 0 ? "exist" : "nonexist") : "nonexist"
    const idCheck = this.selectedDay == i ? "selected" : ""
    returnHTML += '<div data-keyword = ' + (count - 1) + ' class = ' + histCheckpoint + ' id = ' + idCheck + '>' + i + '</div>'
    if (count===35 && i>=afterDate) {
      break
    }
    count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  for (let i = 1; i < 7 - afterDay; i++ && count++) {
    returnHTML += '<div data-keyword = ' + (count - 1) + ' class = "nextMonth">' + i + '</div>'
    // count % 7 == 0 ? returnHTML += '</li><li class = "calendarColumn">' : ''
  }
  return returnHTML + '</ul></div>'
}

CalendarView.getCalendarBottomHTML = function (data) {
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${index}" id = "routine_contents">
    <div id = "clickable">
    <div id = "routine_text">${item.name}
    <div id = "routine_count">${Object.keys(item.detail).length} Workouts</div></div>
    <div class ='none' id = 'routine_detail'>${this.spreadItem(item)}</div></div>
    <button id = "routine_btns" class="routine_remove">RM</button>`
    return html
  }, "<ul>") + '</ul>'
}

CalendarView.spreadItem = function (data = []) {
  return data.detail.reduce((html, item) => {
    html += `<li>${item.name}&nbsp;&nbsp;${item.routine.length}SET</li>`
    return html
  }, '<ul>') + '</ul>'
}

CalendarView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('.dateToggle')).forEach(button => {
    button.addEventListener('click', e => this.onClickBtn(e.target))
  })
  Array.from(this.el.querySelectorAll('.calendarColumn div')).forEach(div => {
    div.addEventListener('click', e => this.onClickDate(e.target))
  })
  Array.from(this.el.querySelectorAll('#calendarDetail .routine_remove')).forEach(button => {
    button.addEventListener('click', e => this.onRemoveHistory(button.parentElement))
  })
  Array.from(this.el.querySelectorAll('#clickable')).forEach(div => {
    div.addEventListener('click', e => this.onClick(div.parentElement))
  })
}

CalendarView.onClickDate = function (e) {
  event.stopImmediatePropagation()
  if (e.className === 'exist') {
    const callYear = this.currentYear
    const callMonth = this.currentMonth + 1
    this.emit('@get', { callYear, callMonth, e })
  } else {
    this.el.querySelector('#calendarDetailCover').className = 'detail'
    this.el.querySelector('#calendarDetail').className = 'none'
  }
  if ((e.dataset.keyword < 7 && e.textContent > 25)) {
    this.selectedDay = +e.textContent
    e.textContent = '<'
    this.onClickBtn(e)
  } else if (e.dataset.keyword > 30 && e.textContent < 7) {
    this.selectedDay = +e.textContent
    e.textContent = '>'
    this.onClickBtn(e)
  } else {
    this.selectedDay = +e.innerHTML
  }
  this.renderTop(this.histData)
}
CalendarView.onClickBtn = function (e) {
  event.stopImmediatePropagation()
  const ani__target_Body = this.el.querySelector('#calendarBody')
  ani__target_Body.style.animation = "none"
  setTimeout(()=> {
  this.selectedDay = 0
  this.el.querySelector('#calendarDetailCover').className = 'none'
  this.el.querySelector('#calendarDetail').className = 'none'
  if (e.textContent === '<') {
    this.currentMonth - 1 === -1 ? (this.currentMonth = 11, this.currentYear -= 1) : this.currentMonth -= 1
  } else {
    this.currentMonth + 1 === 12 ? (this.currentMonth = 0, this.currentYear += 1) : this.currentMonth += 1
  }
  const callYear = this.currentYear
  const callMonth = this.currentMonth + 1
  this.emit('@change', { callYear, callMonth })
  },0)
}

CalendarView.onClick = function (e) {
  Array.from(this.el.querySelectorAll('#calendarDetail #routine_detail')).forEach(div => {
    event.stopPropagation()
    div.parentElement.parentElement.dataset['keyword'] === e.dataset.keyword ? (div.className == 'none' ? div.className = 'detail' : div.className = 'none') : ''
  })
}
CalendarView.onRemoveHistory = function (e) {
  if (confirm('정말 해당 기록을 삭제하시겠습니까??') == true) {
    const callYear = this.currentYear
    const callMonth = this.currentMonth + 1
    const callDay = this.selectedDay
    const keyword = e.dataset.keyword
    this.emit('@remove', { callYear, callMonth, callDay, keyword })
  } else {
    return
  }
}

CalendarView.viewOut = function() {
  this.el.querySelectorAll('#calendarBottom div').forEach(div => div.className = 'none')
  const ani__target = this.el.querySelector('#calendarTop')
  // ani__target.classList.contains('ani__run') ? '' : console.error(tag);
  ani__target.style.animation = "slideOutRight 0.2s forwards"
}


export default CalendarView