
import * as Realm from "realm-web";
import {REALM_APPID, REALM_BASEURL } from '@env'
import React, { useEffect, useState } from "react";
// import {appId, baseUrl} from './realm';

// const app = new Realm.App({ id: process.env.REALM_API });
// const credentials = Realm.Credentials.anonymous();



if (!REALM_APPID) {
  throw 'Missing Realm App ID. Set appId in env file';
}
if (!REALM_BASEURL) {
  throw 'Missing Realm base URL. Set baseUrl in env file';
}

// const appConfiguration = {
//   id: REALM_APPID,
//   REALM_BASEURL,
// };
useEffect(async() => {
    const app = new Realm.App({ id: REALM_APPID})
    try {
        const user = await app.logIn(credentials);
      } catch(err) {
        console.error("Failed to log in", err);
      }
}, [])

  
//export const realmApp = new Realm.App({ id: REALM_APPID});







// const signIn = async (email, password) => {
//     const creds = Realm.Credentials.emailPassword(email, password);
//     const newUser = await app.logIn(creds);
//     setUser(newUser);
//   };


//   const signUp = async (email, password) => {
//     await app.emailPasswordAuth.registerUser({ email, password });
//   };

//   const signOut = () => {
//     if (user == null) {
//       console.warn("Not logged in, can't log out!");
//       return;
//     }
//     user.logOut();
//     setUser(null);
//   };
