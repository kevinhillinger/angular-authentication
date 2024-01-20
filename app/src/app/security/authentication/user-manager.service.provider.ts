import { UserManager } from "oidc-client";
import { AuthenticationConfig } from "./authentication.config";

const userManagerFactory = (config: AuthenticationConfig) => {
    return new UserManager({
        authority: config.authority,
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        scope: config.scope,
        response_type: config.responseType,
        post_logout_redirect_uri: config.postLogoutRedirectUri,
        automaticSilentRenew: config.automaticSilentRenew,
        silent_redirect_uri: config.silentRedirectUrl
      });
};

export let userManagerProvider = { 
  provide: UserManager,
  useFactory: userManagerFactory,
  deps: [AuthenticationConfig]
};