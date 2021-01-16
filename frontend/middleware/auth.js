export default function ({store,route,redirect}) {
  console.log("This is ",route.name);
  if (route.name === "index"){
    return redirect('/Home');
  }
  if (!store.state.auth.authenticated && route.name!="Home") { // I should prolly check if the token is even valid
    // return redirect('/login');
    return redirect('/Login');
  }
}
