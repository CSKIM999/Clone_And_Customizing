export default {
  data: [
    {
      name: 'BACK WORKOUT', detail: [
        { name: 'Pull up', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'EACH', item: [[25, 10], [25, 10], [30, 10], [30, 10]] } },
        { name: 'Lat Pull Down', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'EACH', item: [[30, 10], [30, 10], [35, 10], [35, 10]] } },
        { name: 'Romanian Deadlift', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'EACH', item: [[50, 10], [60, 10], [70, 10], [80, 8]] } },
        { name: 'Seated Low', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'EACH', item: [[30, 10], [30, 10], [35, 10], [35, 10]] } }]
    },
  ],

  list() {
    return Promise.resolve(this.data)
  },

  add(saveData) {
    const name = saveData.name.trim()
    if (!name) return
    if (this.data.some(item => item.name === name)) {
      return error("해당 이름의 Routine이 이미 존재합니다");
    }
    this.data.push(saveData)
    return
  },

  update(keyword, updateData = {}) {
    this.data[keyword] = updateData
  },

  remove(keyword, index = NaN) {
    if (isNaN(index)) {
      this.data.splice(keyword, 1)
    } else {
      this.data[keyword].detail.splice(index, 1)
    }
  }
}