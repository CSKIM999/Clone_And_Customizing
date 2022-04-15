export default {
  data: [
    {
      name: 'R1', detail: [
        { name: 'FLANK', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'EACH', item: [[5, 10], [10, 10], [15, 10], [15, 20]] } },
        { name: 'e2', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'SAME ALL', item: [[5, 10], [10, 10], [15, 10], [15, 20]] } },
        { name: 'e3', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'SAME ALL', item: [[5, 10], [10, 10], [15, 10], [15, 20]] } },
        { name: 'e4', routine: { selectedToggleTop: 'W,C', selectedToggleBottom: 'SAME ALL', item: [[5, 10], [10, 10], [15, 10], [15, 20]] } }]
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