import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { initializeApp } from "firebase/app";

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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEfyUmXDhgGWibRUro2EBoX8-TtBKMYyA",
  authDomain: "web3auth-x-firebase-demo-e3332.firebaseapp.com",
  projectId: "web3auth-x-firebase-demo-e3332",
  storageBucket: "web3auth-x-firebase-demo-e3332.appspot.com",
  messagingSenderId: "108145034076",
  appId: "1:108145034076:web:3ff4c0088ec4c311b17799",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
