import React, { useState } from "react";

import { Link, useNavigate as useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();

  const [user, userSet] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cPassword: "",
  });

  // Function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password
  const isValidPassword = (password) => {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passRegex.test(password);
  }

  


  // on change
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    userSet({ ...user, [name]: value });

    console.log("handleInput clicked");
    console.log(user);
  };


  // on click 
  const submit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cPassword } = user;
    
  
    if(!user.name || !user.email || !user.phone || !user.work || !user.password || !user.cPassword) {
      window.alert("Please fill the registration form.");
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      window.alert("Please enter a valid E-mail Address.");
      return;
    }
    else if (!/^[6-9]\d{9}$/.test(phone)) {
      window.alert("Please enter a valid Mobile number.");
      return;
    }
    else if (!isValidPassword(password)) {
      window.alert("Please enter a valid Password.");
      return;
    }
    else if (user.password !== user.cPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const res = await fetch("https://user-registraion-food-recipe.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cPassword,
      }),
    });


    const data = await res.json();

    console.log(data)
    if(data.error){
      window.alert(data.error);
      return;
    }

    if (data.Status === 422 || !data) {
      window.alert("invalid Registration");
      console.log("invalid Registration");
    } else {
      console.log("Registration successful ");

      //  we used navigate instate of history.push
      history("/signin");
    }
  };

  return (
    <>
      <div className=" w-full h-screen">
        <div className=" bg-gray-500 fixed top-0 left-0 w-full h-screen"></div>
        <div className=" fixed w-full px-4 py-0 z-50">
          <div className="max-w-[450px] h-[630px] mx-auto bg-gray-300 border-2 rounded-lg">
            <div className="max-w-[320px] mx-auto py-6">
              {/* <h1 className="text-3xl font-bold">Sign Up</h1> */}
              <form className="w-full flex flex-col py-4" method="POST">
                <input
                  className="p-3 my-2  text-black rounded"
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  placeholder="your name"
                  onChange={handleInput}
                />

                <input
                  placeholder="email"
                  className="p-3 my-2  text-black rounded"
                  type="email"
                  value={user.email}
                  onChange={handleInput}
                  name="email"
                />
                {user.email && !isValidEmail(user.email) && (
                  <p className="text-red-500">Please enter a valid E-mail Address.</p>
                )}

                <input
                  placeholder="phone"
                  className="p-3 my-2 text-black rounded"
                  type="text"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={user.phone}
                  onChange={handleInput}
                  name="phone"
                  inputMode="numeric"
                />
                {user.phone.length > 0 && !/^[6-9]\d{9}$/.test(user.phone) && (
                  <p className="text-red-500">Please enter a valid Mobile number.</p>
                )}

                <input
                  className="p-3 my-2  text-black rounded"
                  type="work"
                  value={user.work}
                  onChange={handleInput}
                  placeholder="profession"
                  name="work"
                />

                <input
                  className="p-3 my-2  text-black rounded"
                  type="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="password"
                  name="password"
                />
                {user.password && !isValidPassword(user.password) && (
                  <p className="text-red-500">Please enter a strong password.</p>
                )}

                <input
                  className="p-3 my-2  text-black rounded"
                  type="cPassword"
                  value={user.cPassword}
                  onChange={handleInput}
                  placeholder="retype password"
                  name="cPassword"
                />
                {user.cPassword && user.password !== user.cPassword && (
                  <p className="text-red-500">Passwords do not match.</p>
                )}

                {/* submit function */}
                <button
                  className="bg-purple-600 py-3 my-6 rounded font-bold"
                  type="submit"
                  // function to submit the data in backend
                  onClick={submit}
                >
                  {" "}
                  signup{" "}
                </button>
              </form>
              <p>
                <span className="text-gray-600">Already have an account?</span>{" "}
                <Link to="/signin">SignIn</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
