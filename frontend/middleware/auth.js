export default
function ({store,redirect}) {
  if (!store.state.auth.authenticated) {
    // return redirect('/login');
    return redirect('/Home');
  }
}
