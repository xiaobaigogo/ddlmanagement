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


// 字符串转时间戳
export function strToTime(ddldate, hour) {
  const timestamp = +new Date(ddldate);
  // + hour * 1000 * 3600
  console.log(timestamp)
  return timestamp;
}

// 时间戳转字符串
export function timeToStr(time) {
  const date = new Date(time);
  const tmpMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const tmpDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const [year, month, day, hour] = [date.getFullYear(), tmpMonth, tmpDate, date.getHours()]
  return { days: year + "-" + month + "-" + day, hours: hour };
}

// 校验时间
export function checkTime(time) {
  const now = +new Date();
  return now < time;
}

// 校验事件
export function checkEvent(res) {
  for (let [key, val] of Object.entries(res)) {
    // console.log(key, val);
    switch (key) {
      case 'title':
        if (val == "" || val.trim() == "") {
          Toast('标题不能为空');
          return false;
        }
        break;
      case 'days':
        if (val == "" || val.trim() == "") {
          Toast('日期不能为空');
          return false;
        }
        break;
      default:
        break;
    }
  }

  // console.log(res.days, res.hours, strToTime(res.days, res.hours))
  if (!checkTime(strToTime(res.days, res.hours))) {
    Toast('设定的DDL时间不应当小于当前时间');
    return false;
  } else {
    return true;
  }
}

export function Toast(str) {
  console.log(str);
}

// local对象和show对象互换
export function exchange(obj) {
  const newObj = {};
  if (obj.hasOwnProperty('ddl')) { // 如果有ddl属性，说明是一个local对象，
    const { days, hours } = timeToStr(obj.ddl);
    console.log(days, hours);
    const { title, content, id } = obj;
    newObj['id'] = id;
    newObj['title'] = title;
    newObj['content'] = content;
    newObj['days'] = days;
    newObj['hours'] = hours;
  } else { // 如果没有ddl属性，说明是一个show对象
    console.log(obj);
    const ddl = strToTime(obj['days'], obj['hours']);
    newObj['ddl'] = ddl;
    newObj['title'] = obj.title;
    newObj['content'] = obj.content;
  }

  return newObj;
}