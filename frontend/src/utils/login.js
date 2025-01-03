export default async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store JWT Token

      console.log("Login Successful!");
    } else {
      console.error("Login Failed! Please check your credentials.");
    }
  } catch (error) {
    console.error("Login Failed! Please check your credentials.", error);
  }
};
