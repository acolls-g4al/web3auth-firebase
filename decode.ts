const firebaseCustomToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJXMjJnQkF0Wk9KT0J6eHhSUzlGNjZ0eGQxQTAzIiwiY2xhaW1zIjp7ImVtYWlsIjoiYWNvbGxzQGc0YWwuY29tIiwid2FsbGV0X2FkZHJlc3MiOm51bGx9LCJpc3MiOiJnZmFsLWlkLWFwaUBnNGFsLWNoYWluLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZ2ZhbC1pZC1hcGlAZzRhbC1jaGFpbi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiZXhwIjoxNjg0MTY5NjAwLCJpYXQiOjE2ODQxNjYwMDB9.ju3PLgh_Y89UEDAwi8aZq-Voj-noZqsC__I8CkdDxktR2nyX6pHfeES8QcIN1533s5DQxvKbEPDRNt9dp3uyeq559u34jmsdtWi7HpzSjixWhSNjeH2V8DptHa5xO3JNmIfaYK-HS3TJGOI7RG46F7XT2VGbV1ZYQcdtJmmqO22ykvPK1d5N6THmtbyX7Dpq-dPiOPdl0PszVJSJ9u-o0upHsVLlyFQI0LtmJz_IhYGzNjvKEOxWRrauvcsXBednv6N1EzXqHK0EOI-YAsS-8zwi8gBD2KNhGGMBt8Q1e1vouQQeXY70UMtySXimg2c1Q360Uo7qi9RaQkh6izCZRQ";

const axios = require("axios");

async function convertCustomJwtToIdToken(customJwt) {
  try {
    const response = await axios.post(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken",
      {
        token: customJwt,
        returnSecureToken: true,
      }
    );
    console.log(response.data);
    return response.data.idToken;
  } catch (error) {
    // Handle error
    throw new Error("Failed to convert custom JWT to ID token");
  }
}

convertCustomJwtToIdToken(firebaseCustomToken);

import { getAuth, signInWithCustomToken } from "firebase/auth";

const auth = getAuth();
signInWithCustomToken(auth, firebaseCustomToken);
