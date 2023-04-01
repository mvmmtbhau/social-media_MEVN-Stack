import { createStore, createLogger } from "vuex";
import auth from "./modules/auth";
import modal from "./modules/modal";
import post from "./modules/post";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    auth,
    modal,
    post,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : "" ,
});

// Nếu muốn xem cái gì thay đổi thì thêm createLogger() vào vào plugins