import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Homepage from "./ui/items/Homepage";
import weaponsOperations from "./state/ducks/weapons/operations";
import warframesOperations from "./state/ducks/warframes/operations";
import {connect} from "react-redux"
import React,{useEffect} from "react";
import About from "./ui/about/About";

function App({getWeapons, getWarframes}) {

  useEffect(()=> {
      getWeapons();
      getWarframes();
  },[getWeapons, getWarframes])
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={Homepage}/>
          <Route path={"/about"} component={About}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return{
      getWeapons: ()=>{dispatch(weaponsOperations.getWeapons())},
      getWarframes: ()=>{dispatch(warframesOperations.getWarframes())}
  }
}

export default connect(undefined,mapDispatchToProps)(App)

