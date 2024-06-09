import React, { Component } from "react";
//import logo from './logo.svg';
import './App.css';
import './index.css';
import ErrorBoundary from './Classes/ErrorBoundary';
import TopBar from './Components/NavBar/TopBar';
import Home from './Components/Home/Home';
import Feed from './Components/Feed/Feed';
import FormLogin from './Components/Login/FormLogin';
import AdminHome from './Components/Admin/AdminHome';
import Dashboard from './Components/Dashboard/Dashboard';
import OmbudsmanHome from './Components/Ombudsman/OmbudsmanHome';
import PostIssue from './Components/PostIssue/PostIssue';
import FormRegister from './Components/Register/FormRegister';
import ServiceProvider from './Components/Register/ServiceProvider';
import Profile from './Components/Profile/ProfilePage';
import EditIssue from "./Components/EditIssue/EditIssue";
import RatingPage from "./Components/RatingPage/RatingPage";
import SPFeed from './Components/Feed/SPFeed';
//import ModalAlert from "./Classes/Modals/ModalAlert";
// import Footer from './Components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "Home",
      signinStatus: false,
      isAdmin: false,
      isOmbudsman: false,
      isCustomer: false,
      completedIssues: false,
      email: "",
      user: null,
      storedData: null
    };
  }

  setView = viewName => {
    this.setState({ currentView: viewName });
    this.forceUpdate();
  };

  storeData = data => {
    this.setState({ storedData: data });
  };

  setUser = (data) => {
    this.setState({ user: data });
  }

  setSigninStatus = (boolValue, userEmail) => {
    if (boolValue === false) {
      this.setState({ isAdmin: false, isOmbudsman: false, isCustomer: false });
    }
    this.setState({ signinStatus: boolValue, email: userEmail });
  }
  setAdmin = (boolValue) => this.setState({ isAdmin: boolValue });
  setCompletedIssues = (boolValue) => this.setState({ completedIssues: boolValue });
  setOmbudsman = (boolValue) => this.setState({ isOmbudsman: boolValue });
  setCustomer = (boolValue) => this.setState({ isCustomer: boolValue });

  render() {
    let view;
    let currentView = this.state.currentView;
    switch (currentView) {
      case "Register": view = <FormRegister setView={this.setView} />; break;
      case "Profile": view = <Profile isAdmin={this.state.isAdmin} isCustomer={this.state.isCustomer} isOmbudsman={this.state.isOmbudsman} user={this.state.user} setView={this.setView} setSigninStatus={this.setSigninStatus} />; break;
      case "Login": view = <FormLogin setUser={this.setUser} setView={this.setView} setSigninStatus={this.setSigninStatus} setAdmin={this.setAdmin} setOmbudsman={this.setOmbudsman} setCustomer={this.setCustomer} />; break;
      case "Home": view = <Home setUser={this.setUser} setView={this.setView} signinStatus={this.state.signinStatus} setSigninStatus={this.setSigninStatus} setAdmin={this.setAdmin} setOmbudsman={this.setOmbudsman} setCustomer={this.setCustomer} />; break;
      case "Feed": view = <Feed user={this.state.user} setView={this.setView} email={this.state.email} storeData={this.storeData} />; break;
      case "PostIssue": view = <PostIssue user={this.state.user} email={this.state.email} setView={this.setView} />; break;
      case "AdminHome": view = <AdminHome setView={this.setView} email={this.state.email} />; break;
      case "Dashboard": view = <Dashboard />; break;
      case "SPFeed": view = <SPFeed />; break;
      case "OmbudsmanHome": view = <OmbudsmanHome email={this.state.email} setView={this.setView} completedIssues={this.state.completedIssues} />; break;
      case "ServiceProviderReg": view = <ServiceProvider setView={this.setView} />; break;
      case "EditIssue": view = (<EditIssue setView={this.setView} data={this.state.storedData} storedData={this.state.storedData} parent={this} />); break;
      case "SPFeed": view = <SPFeed email={this.state.email} user={this.state.user} />; break;
      case "RatingPage": view = <RatingPage setView={this.setView} storedData={this.state.storedData} email={this.state.email} />; break;
      default: window.alert("No Page To Load (case:default:App.js)");
    }

    return (
      <ErrorBoundary>
        <div className="App">
          <TopBar setView={this.setView} email={this.state.email} user={this.state.user} signinStatus={this.state.signinStatus} setSigninStatus={this.setSigninStatus} isAdmin={this.state.isAdmin} isOmbudsman={this.state.isOmbudsman} isCustomer={this.state.isCustomer} setCompletedIssues={this.setCompletedIssues} completedIssues={this.state.completedIssues} />
          {view}
          {/* <footer id="footer"><Footer /></footer> */}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
