import { firebaseAuthGoogle, googleProvider } from "./firebase";

export const LoginGoogle = async () => {
  // let user;
  const result = await firebaseAuthGoogle.signInWithPopup(googleProvider);

  const {
    user: {
      displayName: name,
      photoURL,
      email,
    },
    // credential: {
    //   accessToken,
    // },
    // additionalUserInfo: {
    //   isNewUser,
    // },
  } = result;

  // const idToken = await firebaseAuthGoogle.currentUser.getIdToken();

  return {
    name,
    photoURL,
    email,
  };
};

export const LogOutGoogle = () => firebaseAuthGoogle.signOut();
