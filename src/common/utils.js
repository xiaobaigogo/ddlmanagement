// 将事件类型从数字转为文字
export function getKindofEvent(item) {
  switch (item) {
    case 1:
      return '待完成'
      break;
    case 2:
      return '已完成'
      break;
    case 3:
      return '已过期'
      break;
    case 4:
      return '已取消'
      break;
    default:
      break;
  }
}
// 将时间戳转为'yyyy-mm-dd h'格式
export function getTime(timestamp) {
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day) + "  " + (hour < 10 ? '0' + hour : hour) + "时";
}