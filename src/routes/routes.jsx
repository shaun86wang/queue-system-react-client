//import LinePage from "pages/line/LinePage.jsx";
import LoginPage from "pages/login/LoginPage.jsx";
import StationPage from "pages/station/StationPage.jsx";

const routes = [
  { path: "/", name: "StationPage", component: StationPage },
  { path: "/login", name: "LoginPage", component: LoginPage }
];

export default routes;