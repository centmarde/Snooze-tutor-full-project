import { s as supabase, a as successNotification, e as errorNotification } from "./loader.266516c8.js";
const form_login = document.getElementById("form_login");
const forgot_pass = document.getElementById("forgot_pass");
form_login.onsubmit = async (e) => {
  e.preventDefault();
  document.querySelector("#form_login button").disabled = true;
  document.querySelector("#form_login button").innerHTML = `<div class="spinner-border me-2" role="status"></div><span>Loading...</span>`;
  const formData = new FormData(form_login);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password")
  });
  let session = data.session;
  let user = data.user;
  console.log(user);
  if (session != null) {
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);
    let { data: profiles, error: error2 } = await supabase.from("profiles").select("*");
    localStorage.setItem("user_id", profiles[0].id);
    console.log(profiles[0].id);
    if (session != null) {
      profiles[0].Role;
      user.id;
      window.location.pathname = "/home.html";
      successNotification("Login Successfully", 10);
    }
  } else {
    errorNotification("Error Please Try again or check your password", 10);
    console.log(error);
  }
  form_login.reset();
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = "Log-in";
};
forgot_pass.onsubmit = async (e) => {
  e.preventDefault();
  document.querySelector("#forgot_pass button:nth-child(2)").disabled = true;
  document.querySelector("#forgot_pass button:nth-child(2)").innerHTML = `<span>Loading...</span>`;
  const email = forgot_pass.querySelector("#forgot_email").value;
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error === null) {
      successNotification("Password reset email sent successfully", 5);
      console.log(data);
    } else {
      errorNotification(`Error: ${error.message}`, 10);
      console.error(error);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
  document.getElementById("modal_close").click();
  forgot_pass.reset();
  document.querySelector("#forgot_pass button[type='submit']").disabled = false;
  document.querySelector("#forgot_pass button[type='submit']").innerHTML = `Loading..`;
};
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
document.addEventListener("DOMContentLoaded", function() {
  var lavender = document.getElementById("lavender");
  setInterval(function() {
    lavender.style.transform = "rotate(" + randomize(-5, 5) + "deg)";
    lavender.style.left = randomize(-5, 5) + "px";
  }, 3e3);
});
