import { Constants } from "./constants";


export const appSettings = {
    authenticationConfig: {
        authority: Constants.stsAuthority,
        clientId: Constants.clientId,
        redirectUri: `${Constants.clientRoot}signin-callback`,
        scope: 'openid profile projects-api',
        responseType: 'code',
        postLogoutRedirectUri: `${Constants.clientRoot}signout-callback`,
        automaticSilentRenew: true,
        silentRedirectUrl: `${Constants.clientRoot}assets/silent-callback.html`
      }
}