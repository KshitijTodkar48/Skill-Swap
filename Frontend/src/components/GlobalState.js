import { atom } from "recoil";

export const loginState = atom({
    key: 'loginState',
    default: {
        user: false,
        admin: false
    }
  });