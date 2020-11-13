import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import Sorting from "./Algorithms/Sortings/sorting";
import Searching from "./Algorithms/Searching/searching";
import SortVisualize from "./Components/SortingComp";
import Sidebar from "./Components/sideBar";

/* const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Sorting</div>,
    main: () => <h2>Sorting</h2>,
  },
  {
    path: "/searching",
    sidebar: () => <div>Searching</div>,
    main: () => <h2>Searching</h2>,
  },
];*/

function App() {
  return (
     <Router>
       <ProSidebar>
  <SidebarHeader>
    Algorithms
  </SidebarHeader>
  <SidebarContent>
    <Menu iconShape="square">
    <MenuItem  >Sorting
     <Link to="/Sorting"></Link>
    </MenuItem>
    <SubMenu title="Components" >
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
  </SidebarContent>
  <SidebarFooter>
    Footer
  </SidebarFooter>
</ProSidebar>

 <Switch>
    <Route exact path="/" childern={<Searching />}></Route>
    <Route path="/Sorting" children={<Sorting />}></Route>
  </Switch>
</Router>
    
  );
}

export default App;
