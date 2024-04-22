import { s as supabase, a as successNotification, e as errorNotification } from "./loader.266516c8.js";
const form_register = document.getElementById("form_register");
form_register.onsubmit = async (e) => {
  var _a;
  e.preventDefault();
  document.querySelector("#form_register button").disabled = true;
  document.querySelector(
    "#form_register button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                      </div>
                      <span>Loading...</span>`;
  const formData = new FormData(form_register);
  formData.get("password");
  formData.get("password_confirm");
  if (formData.get("password") == formData.get("password_confirm")) {
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password")
    });
    let user_id = (_a = data == null ? void 0 : data.user) == null ? void 0 : _a.id;
    if (user_id != null) {
      const { data: data2, error: error2 } = await supabase.from("profiles").insert([
        {
          password: formData.get("password"),
          username: formData.get("username"),
          id: user_id,
          email: formData.get("email")
        }
      ]).select();
      if (error2 == null) {
        successNotification("Register Successfully please verify your email.<a href = './login.html'>Click Here to Log-in!</a>", 10);
        console.log(data2);
        console.log(error2);
      } else {
        alert(`Error: ${error2.message}`, 10);
      }
      form_register.reset();
      document.querySelector("#form_register button").disabled = false;
      document.querySelector("#form_register button").innerHTML = "Register";
    } else {
      alert(`Error: ${error.message}`, 10);
    }
  } else {
    errorNotification("Password not match", 10);
    document.querySelector("#form_register button").disabled = false;
    document.querySelector("#form_register button").innerHTML = "Register";
  }
};
