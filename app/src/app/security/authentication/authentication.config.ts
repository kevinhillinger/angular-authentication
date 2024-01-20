import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class AuthenticationConfig {
    authority: string;
    clientId: string;
    redirectUri: string;
    scope = 'openid profile';
    responseType = 'code';
    postLogoutRedirectUri: string;
    automaticSilentRenew = true;
    silentRedirectUrl: string;
    // metadata: {
    //   issuer: `${Constants.stsAuthority}`,
    //   authorization_endpoint: `${Constants.stsAuthority}authorize?audience=projects-api`,
    //   jwks_uri: `${Constants.stsAuthority}.well-known/jwks.json`,
    //   token_endpoint: `${Constants.stsAuthority}oauth/token`,
    //   userinfo_endpoint: `${Constants.stsAuthority}userinfo`,
    //   end_session_endpoint: `${Constants.stsAuthority}v2/logout?client_id=${Constants.clientId}&returnTo=${encodeURI(Constants.clientRoot)}signout-callback`
    // }
}