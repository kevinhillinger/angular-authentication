# Angular Authentication Starter

Starter example of Angular application with an OIDC authentication. 

It implements the OAuth2 Authorization Code Flow with Proof Key for Code Exchange (PKCE)
that can often be challenging to those not familiar with pulling in OAuth2 protocol in a "real" project structure. 

This includes:

- Performing the required information for Auth Code Flow with PKCE
- With Angular, how to secure an access and id token without persisting it to local storage (creating an attack vector)
- Including the access token that's in memory automatically in every HTTP request, and if invalid, redirecting to an unauthorized area

## Features of the starter

### Authentication module
- Authentication HttpInterceptor that shows how to incorporate access token into HTTP requests being made to the backend
- An authentication service, showing how to handle the OAuth2 interactions and security context
- A user manager service provider for wiring up the OIDC client to the auth services

### Authorization

- Authorization based on a user profile role, demostrating RBAC
- User permissions example
- Claims / attributes
- Route protection
- Security context with simple RBAC

