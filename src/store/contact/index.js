const state = {
  showDialog: false,
}

const mutations = {
  closeDialog(state) {
    state.showDialog = false;
  },
  openDialog(state) {
    state.showDialog = true;
  }
}

export default {
  state,
  mutations,
}