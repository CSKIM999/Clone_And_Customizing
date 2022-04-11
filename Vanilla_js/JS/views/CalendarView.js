import View from "./View.js"

const tag = '[CalendarView]'
const CalendarView = Object.create(View)
const Year = new Date().getFullYear()
const Month = new Date().getMonth()

CalendarView.template = {
  Basic : `<div id = 'toggle' ></div><div id = "calendar"><ul>` //</ul></div>
}

CalendarView.setup = function(el) {
  this.init(el)
  this.show()

  return this
}

CalendarView.render = function(currentYear=Year,currentMonth=Month) {
  console.log(tag,"render()")
  // 이전 달의 마지막 일자
  const fromDay = new Date(currentYear,currentMonth,0)
  const nowDay = new Date(currentYear,currentMonth+1,0)
  this.el.innerHTML = this.getCalendarHTML(fromDay,nowDay)
}

CalendarView.getCalendarHTML = function(fromDay,nowDay) {
  console.log(tag,"getCalendarHTML()")
  const beforeDate = fromDay.getDate() //날짜
  const beforeDay = fromDay.getDay() //요일
  const afterDate = nowDay.getDate()
  const afterDay = nowDay.getDay()

  let returnHTML = '<li>'
  
  for (let i = beforeDate - beforeDay; i <= beforeDate ; i++) {
    returnHTML += '<div>' + i + '</div>'
    returnHTML += i === beforeDate?'</li>':''
  }
  return returnHTML
}



export default CalendarView