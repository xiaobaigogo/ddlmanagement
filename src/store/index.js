import { createStore } from 'vuex';
import event from "./event";
import contact from "./contact";

export default createStore({
  modules: {
    event,
    contact,
  }
})
