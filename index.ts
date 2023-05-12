import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { initializeApp } from "firebase-admin/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

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

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB224lOyA2EwfEEKpfMcrcVX719mx6tcQE",
  authDomain: "g4al-chain.firebaseapp.com",
  projectId: "g4al-chain",
  storageBucket: "g4al-chain.appspot.com",
  messagingSenderId: "82478128277",
  appId: "1:82478128277:web:81a4304e68c7b22cba4f9c",
  measurementId: "G-TTD8PF21GN",
};

const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const app = initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getGoogleToken = async () => {
  const loginRes = await signInWithGoogle();
  return await loginRes.user.getIdToken(true); // idToken
};

const web3authLogin = async () => {
  const web3auth = new Web3AuthNoModal({
    clientId: WEB3AUTH_CLIENT_ID,
    web3AuthNetwork: "testnet",
    chainConfig: CHAIN_CONFIG,
  });

  await web3auth.init();

  const gToken = await getGoogleToken();

  console.log(gToken);

  const connect = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
    loginProvider: "jwt",
    extraLoginOptions: {
      id_token: gToken,
      verifierIdField: "g4al-chain", // same as your JWT Verifier ID
      domain: "https://YOUR-APPLICATION-DOMAIN" || "http://localhost:3000",
    },
  });

  console.log(connect);

  const user = await web3auth.getUserInfo();

  console.log("User info", user);

  await web3auth.logout();
};

web3authLogin();
