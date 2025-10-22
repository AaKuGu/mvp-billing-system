// "use client";

// import { GreenButton } from "@/shared/components/Button";
// import Form from "@/shared/components/form/Form";
// import { Input } from "@/shared/components/form/Input";
// import Label from "@/shared/components/form/Label";
// import Header from "@/shared/components/ui/Header";
// import React, { useState } from "react";
// import { loginHandler } from "./funcs";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import useLoadingStore from "@/store/loading";

// const Login = () => {
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);

//   const router = useRouter();

//   const { loading, setLoading } = useLoadingStore();

//   return (
//     <div className={`w-full h-screen flex items-center justify-center`}>
//       <div className={`w-full md:w-[400px] flex flex-col`}>
//         <Header>Login</Header>
//         <Form
//           onSubmit={(e) => {
//             e.preventDefault();
//             if (!email) {
//               toast.error(`Email is required`);
//               return;
//             } else if (!password) {
//               toast.error("Password is required");
//               return;
//             }
//             setLoading(true);
//             loginHandler(email, password, router, setLoading);
//           }}
//           className={`flex flex-col `}
//         >
//           <div>
//             <Label>Email</Label>
//             <Input
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               placeholder="Enter Email"
//             />
//           </div>
//           <div>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               placeholder="Enter Password"
//             />
//           </div>
//           <GreenButton type="submit" loading={loading}>
//             {loading ? "Loading..." : "Login"}
//           </GreenButton>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import Logo from "@/re_usables/components/Logo";
import React from "react";
import RightSide from "./right-side/RightSide";

const LoginPage = () => {
  return (
    <div className={`w-full h-full flex justify-center `}>
      <div
        className={`w-full h-full flex items-center justify-center flex-col`}
      >
        <Logo style="text-8xl" />
        {/* <span>Your Business Partner</span> */}
      </div>
      <div className={`w-full h-full flex items-center justify-center`}>
        <RightSide />
      </div>
    </div>
  );
};

export default LoginPage;
