import Realm from "realm";
import 'dotenv/config'
import {appId, baseUrl} from './realm';

const app = new Realm.App({ id: process.env.REALM_API });
const credentials = Realm.Credentials.anonymous();




if (!appId) {
  throw 'Missing Realm App ID. Set appId in realm.json';
}
if (!baseUrl) {
  throw 'Missing Realm base URL. Set baseUrl in realm.json';
}

const appConfiguration = {
  id: appId,
  baseUrl,
};

export const realmApp = new Realm.App(appConfiguration);







const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };


  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };
try {
  const user = await app.logIn(credentials);
} catch(err) {
  console.error("Failed to log in", err);
}