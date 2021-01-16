export const state = () => ({
  user: null,
  pass: null,
  jwt: null,
  authenticated: false
})

export const mutations = {
  setUser(state,user) {
    state.user = user;
  },
  setPass(state,pass) {
    state.pass = pass; // Prolly not the best idea but idk how state works
  },
  setJwt(state,jwt) {
    state.jwt = jwt;
  },
  setAuth(state,authenticated){
    state.authenticated = authenticated;
  }
}
