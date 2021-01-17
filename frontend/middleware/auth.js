export default function ({store,route,redirect}) {
  console.log("This is ",route.name);
  if (route.name === "index"){
    return redirect('/Home');
  }
  if (!store.state.auth.authenticated && route.name!="Home" && route.name!="Login") { // I should prolly check if the token is even valid
    console.log("Not authorized, go login")
    return redirect('/Login');
  }
}
