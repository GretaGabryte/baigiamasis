import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = ({ onRegister, user }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setAge(user.age.toString());
    } else {
      setFullName("");
      setEmail("");
      setAge("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !age) {
      alert("Please fill in all fields.");
      return;
    }

    onRegister({
      fullName,
      email,
      age: parseInt(age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>{user ? "Update User" : "Register New User"}</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        min="1"
        max="120"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button type="submit" className="submit-btn">
        {user ? "Update" : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;
