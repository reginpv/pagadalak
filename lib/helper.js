import Cookies from "js-cookie"

export function isLoggedIn() {

  let user = Cookies.get('_paga') ? JSON.parse(Cookies.get('_paga')) : {}

  if(user?.name) {
    return true
  }

  return false

}