import * as type from './mutations_type';

export default {
  addevent({ commit }, payload) {
    // console.log('addevent');
    return new Promise((resolve, reject) => {
      commit(type.ADDEVENT, payload);
      resolve();
    })
  },

  editevent({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(type.EDITEVENT, payload);
      resolve();
    })
    // commit(type.EDITEVENT, payload);
  },

  clearevent({ commit }) {
    commit(type.CLEAREVENT);
  },

  delevent({ commit }, payload) {
    commit(type.DELEVENT, payload.id);
  },

  fullselect({ commit }) {
    commit(type.FULLSELECT);
  },

  eveexpired({ commit }) {
    commit(type.EVEEXPIRED);
  },

  evetodone({ commit }, payload) {
    commit(type.EVETODONE, payload.id);
  },

  evetodo({ commit }, payload) {
    commit(type.EVETODO, payload.id);
  },

  evetocancel({ commit }, payload) {
    commit(type.EVETOCANCEL, payload.id);
  },

  evetoexpired({ commit }, payload) {
    commit(type.EVETOEXPIRED, payload.id);
  }
}