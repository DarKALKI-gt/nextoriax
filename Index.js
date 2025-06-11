document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const authForm = document.getElementById("auth-form");
  const nameGroup = document.getElementById("name-group");
  const submitBtn = authForm.querySelector(".btn");

  let isLogin = true;

  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    formTitle.textContent = isLogin ? "Login" : "Sign Up";
    toggleLink.textContent = isLogin ? "Sign Up" : "Login";
    submitBtn.textContent = isLogin ? "Login" : "Sign Up";

    nameGroup.style.display = isLogin ? "none" : "block";
  });

  authForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    if (!isLogin && !name) {
      alert("Please enter your full name to sign up.");
      return;
    }

    window.location.href = "firstpage.html";
  });
});
