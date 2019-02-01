import LinePage from "pages/line/LinePage.jsx";
import LoginPage from "pages/login/LoginPage.jsx";


const routes = [
  { path: "/", name: "LinePage", component: LinePage },
  { path: "/login", name: "LoginPage", component: LoginPage }
];

export default routes;