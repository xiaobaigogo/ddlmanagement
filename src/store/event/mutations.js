import * as type from './mutations_type';
import { ddl_event } from '@/common/local';

export default {
  [type.ADDEVENT](state, payload) {
    // console.log('commit-addevent')
    state.count++;
    payload.id = state.count;
    state.event.unshift(payload);
    ddl_event.set(state);
  },

  [type.EDITEVENT](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      let item = state.event[i];
      if (payload.id == item.id) {
        console.log(payload);
        item = payload;
        // item = Object.assign({}, payload);
        // item.title = payload.title;
        // item.content = payload.content;
        // item.ddldate = payload.ddldate;
        // item.hour = payload.hour;
        // item.timestamp = payload.timestamp;
        // item.kind = payload.kind;
        break;
      }
    }
    // console.log(state);
    ddl_event.set(state);
  },

  [type.CLEAREVENT](state) {
    state.event = [];
    state.count = 0;
    ddl_event.remove();
  },

  [type.FULLSELECT](state) {
    for (let i = 0; i < state.event.length; i++) {
      if (state.event[i].kind == 1) {
        state.event[i].kind = 2;
      }
    }
    ddl_event.set(state);
  },

  [type.DELEVENT](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      if (payload == state.event[i].id) {
        state.event.splice(i, 1);
        break;
      }
    }
    ddl_event.set(state);
  },

  [type.EVEEXPIRED](state) {
    // 只有待完成的才会有已过期，已完成和已取消的不会算在过期DDL里面
    for (let i = 0; i < state.event.length; i++) {
      const element = state.event[i];
      if (element.kind == 1) {
        const now = +new Date();
        if (now > element.timestamp) {
          console.log(element, '已过期');
          element.kind = 3;
        }
      }
    }
    ddl_event.set(state);
  },

  [type.EVETODO](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      if (payload == state.event[i].id) {
        state.event[i].kind = 1;
        break;
      }
    }
    ddl_event.set(state);
  },

  [type.EVETODONE](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      if (payload == state.event[i].id) {
        state.event[i].kind = 2;
        break;
      }
    }
    ddl_event.set(state);
  },

  [type.EVETOCANCEL](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      if (payload == state.event[i].id) {
        state.event[i].kind = 4;
        break;
      }
    }
    ddl_event.set(state);
  },

  [type.EVETOEXPIRED](state, payload) {
    for (let i = 0; i < state.event.length; i++) {
      if (payload == state.event[i].id) {
        state.event[i].kind = 3;
        break;
      }
    }
    ddl_event.set(state);
  },
}