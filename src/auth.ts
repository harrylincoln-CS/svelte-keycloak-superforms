import { SvelteKitAuth } from "@auth/sveltekit"
import Keycloak from "@auth/sveltekit/providers/Keycloak"
import { AUTH_KEYCLOAK_ISSUER,
    AUTH_KEYCLOAK_CLIENTID,
    AUTH_KEYCLOAK_CLIENT_SECRET,
    AUTH_NEXTAUTH_SECRET} from '$env/static/private';


const kcConfig = {
  issuer: AUTH_KEYCLOAK_ISSUER,
  clientId: AUTH_KEYCLOAK_CLIENTID,
  clientSecret: AUTH_KEYCLOAK_CLIENT_SECRET,
};
 
export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    secret: AUTH_NEXTAUTH_SECRET,
    providers: [Keycloak(kcConfig)],
    callbacks: {
      jwt({ user, token, account, profile }) {

        console.log('anything happening here?', { user, token, account, profile })

        if (user) {
          // User is available during sign-in
          token.id = user.id;
        }
        if (profile) {
          token.preferred_username = profile.preferred_username;
          token.given_name = profile.given_name;
          token.family_name = profile.family_name;
        }
        if (account) {
          token.idToken = account.id_token;
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
        }
  
        return token;
      },
      session({ session, token }) {
        session.user = { ...token };
        return session;
      },
    },
  });

  