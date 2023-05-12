import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { initializeApp } from "firebase/app";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";

// const FIREBASE_CONFIG = {
//   apiKey: "AIzaSyB224lOyA2EwfEEKpfMcrcVX719mx6tcQE",
//   authDomain: "g4al-chain.firebaseapp.com",
//   projectId: "g4al-chain",
//   storageBucket: "g4al-chain.appspot.com",
//   messagingSenderId: "82478128277",
//   appId: "1:82478128277:web:81a4304e68c7b22cba4f9c",
//   measurementId: "G-TTD8PF21GN",
// };

// const signInWithGoogle = async (): Promise<UserCredential> => {
//   try {
//     const app = initializeApp(FIREBASE_CONFIG);
//     const auth = getAuth(app);
//     const googleProvider = new GoogleAuthProvider();
//     const res = await signInWithPopup(auth, googleProvider);
//     return res;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// const getGoogleToken = async () => {
//   const loginRes = await signInWithGoogle();
//   return await loginRes.user.getIdToken(true); // idToken
// };

const web3authLogin = async () => {
  const WEB3AUTH_CLIENT_ID =
    "BCUDbtKqHKHHp_juQ4fd-vekT41t2MBTANNjxcysVGfeJoBzW2RVaTNKqUaxMjF6t-daed_3NRVDgNqWhnw4dHk";

  const CHAIN_CONFIG = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x61",
    rpcTarget: "https://rpc.ankr.com/bsc_testnet_chapel",
    displayName: "Binance SmartChain Testnet",
    blockExplorer: "https://testnet.bscscan.com",
    ticker: "BNB",
    tickerName: "BNB",
  };
  const web3auth = new Web3AuthNoModal({
    clientId: WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: "testnet",
    chainConfig: CHAIN_CONFIG,
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      // clientId: "YOUR-WEB3AUTH-CLIENT-ID", // Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      uxMode: "redirect",
      loginConfig: {
        jwt: {
          name: "g4al-id", // any name
          verifier: "g4al-chain",
          typeOfLogin: "jwt",
          clientId: WEB3AUTH_CLIENT_ID,
        },
      },
    },
  });

  web3auth.configureAdapter(openloginAdapter);

  await web3auth.init();

  return web3auth;
};
const web3auth = web3authLogin();

const loginWeb3Auth = async () => {
  const gToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJXMjJnQkF0Wk9KT0J6eHhSUzlGNjZ0eGQxQTAzIiwiY2xhaW1zIjp7ImVtYWlsIjoiYWNvbGxzQGc0YWwuY29tIiwid2FsbGV0X2FkZHJlc3MiOm51bGx9LCJpc3MiOiJnZmFsLWlkLWFwaUBnNGFsLWNoYWluLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZ2ZhbC1pZC1hcGlAZzRhbC1jaGFpbi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiZXhwIjoxNjgzOTA3NzEwLCJpYXQiOjE2ODM5MDQxMTB9.E6A5hGuixnziePf5pvuUQTUm5CDsDyXDV1IJ3r9lLRYvIIPQi011y4HkY2ln1KozhJml2IvaMP-UA5tKU7uKSE7zTOMHWTw9FgC1p9QvEtTim2avwr2ctVXleMceJAMAc57-qG7Ku8WEkQV5_mZpNldcSHft-DBmb8603sBTZLvGfcZ3F9HLB1vAiub-MA4EzrGjNuw0iBIkkmNLfGBk5UuG_L0OhMGybBNAN1W_kelUxS6uahYDJa1XzBjK477J8mlYSCHKgvSvkGhlAQyo07fSz2J_ksR7wbmyB9BWK-m0JhfHgJUpYqcvwEr5oNUsWSXXuNvBUAAz6qjczzBVuw";

  const connect = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
    loginProvider: "jwt",
    extraLoginOptions: {
      id_token: gToken,
      verifierIdField: "g4al-chain", // same as your JWT Verifier ID
      domain: "https://YOUR-APPLICATION-DOMAIN" || "http://localhost:8080",
    },
  });

  console.log(connect);

  const user = await web3auth.getUserInfo();

  console.log("User info", user);

  await web3auth.logout();
};

loginWeb3Auth();
