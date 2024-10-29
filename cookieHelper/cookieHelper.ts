class SessionCookieHelper {
  static setSessionCookie (businessUnit: string, cookie: string): void {
    window.sessionStorage.setItem(`sessionCookie_${businessUnit}`, cookie)
  }

  static getSessionCookie (businessUnit: string): string | null {
    return window.sessionStorage.getItem(`sessionCookie_${businessUnit}`)
  }

  static removeSessionCookie (businessUnit: string): void {
    window.sessionStorage.removeItem(`sessionCookie_${businessUnit}`)
  }
}

export default SessionCookieHelper

// calling it

    const setCookieHeader = response.headers.get('set-cookie')
    console.log(setCookieHeader)
    if (setCookieHeader) {
      SessionCookieHelper.setSessionCookie(search, setCookieHeader)
    }

// using it

const sessionCookie = SessionCookieHelper.getSessionCookie(search)

// within the request -> headers:
...(sessionCookie ? { Cookie: sessionCookie } : {})
