// import React, { useState } from "react";

// export default function useCredentials(setLoginData) {
//   const [credentialData, setCredentialData] = useState({
//     id: "",
//     username: "",
//     password: "",
//     messages: [{ text: "" }],
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       return { ...prev, [name]: value };
//     });
//   }

//   function handleSubmit() {
//     const user = {
//       id: crypto.randomUUID(),
//       username: credentialData.username,
//       password: credentialData.password,
//     };

//     setCredentialData((prev) => [...prev, user]);
//     clearForm();
//   }

//   function clearForm() {
//     setCredentialData({
//       id: "",
//       username: "",
//       password: "",
//     });
//   }

//   return { credentialData, handleChange, handleSubmit, clearForm };
// }
