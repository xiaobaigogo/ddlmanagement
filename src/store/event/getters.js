export default {
  findEvent: (state) => (id) => {
    let res = state.event.find((item) => { return item.id == id });
    //console.log(res);
    return res;
  },
  findEventByKind: (state) => (kind) => {
    return state.event.filter((item) => { return item.kind == kind });
  },
  showEvents: (state) => (kind = 0, daterange = [], keyword = "") => {
    return state.event.filter((item) => {
      return kind == 0 ? item : item.kind == kind;
    }).filter((item) => {
      return daterange == null || daterange.length == 0 ? item : item.timestamp >= daterange[0] && item.timestamp <= daterange[1];
    }).filter((item) => {
      return keyword ? (item.title.indexOf(keyword) != -1 || (item.content && item.content.indexOf(keyword) != -1)) : item;
    })
  }
}