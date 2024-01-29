
export class AuthAggregator {

  setToken(token: string) {
    window.localStorage.setItem('token', token)
  }

  getToken() {
    return window.localStorage.getItem('token')
  }

  setUsername(usermame: string) {
    window.localStorage.setItem('username', usermame)
  }

  getUsername() {
    return window.localStorage.getItem('username')
  }

  setRole(role: string) {
    window.localStorage.setItem('role', role)
  }

  getRole() {
    return window.localStorage.getItem('role')
  }

}
