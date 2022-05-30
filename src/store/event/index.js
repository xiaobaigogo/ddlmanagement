import { ddl_event } from '@/common/local';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = ddl_event.get() || { event: [], count: 0 };

export default {
  state,
  mutations,
  actions,
  getters
}