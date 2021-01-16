export default function ({store,route,redirect}) {
  console.log("This is ",route.name);
  if (route.name === "index"){
    return redirect('/Home');
  }
  if (!store.state.auth.authenticated && route.name!="Home") {
    // return redirect('/login');
    return redirect('/Login');
  }
}
