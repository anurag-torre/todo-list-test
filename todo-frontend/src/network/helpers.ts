export default function isAuth() {
  return !!window.sessionStorage.getItem("token");
}
