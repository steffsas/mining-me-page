import * as jwt_decode from "jwt-decode";

class TokenHelper {
  constructor(token) {
    this.token = token;
  }

  checkValidity() {
    let decoded = jwt_decode(this.token);
    const now = Date.now().valueOf() / 1000;
    if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
      throw new Error(`Token expired: ${JSON.stringify(decoded)}`);
    }
    if (typeof decoded.nbf !== "undefined" && decoded.nbf > now) {
      throw new Error(`Token not yet valid: ${JSON.stringify(decoded)}`);
    }
    return true;
  }
}

export { TokenHelper };
