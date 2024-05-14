import { s as supabase, a as successNotification, e as errorNotification } from "./loader.ea51d4ef.js";
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
          username: formData.get("username"),
          user_id
        }
      ]).select();
      if (error2 == null) {
        successNotification(
          "Register Successfully please verify your email.<a href = './login.html'>Click Here to Log-in!</a>",
          10
        );
        console.log(data2);
        console.log(error2);
      } else {
        Toastify({
          text: `Error: ${error2.message}`,
          duration: 3e3,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          className: "centered-toast",
          onClick: function() {
          }
        }).showToast();
      }
      form_register.reset();
      document.querySelector("#form_register button").disabled = false;
      document.querySelector("#form_register button").innerHTML = "Register";
    } else {
      Toastify({
        text: `Error: ${error.message}`,
        duration: 3e3,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        className: "centered-toast",
        onClick: function() {
        }
      }).showToast();
    }
  } else {
    errorNotification("Password not match", 10);
    document.querySelector("#form_register button").disabled = false;
    document.querySelector("#form_register button").innerHTML = "Register";
  }
};
document.getElementById("togglePassword1").addEventListener("click", function() {
  togglePasswordVisibility("floatingPass", "togglePassword1");
});
document.getElementById("togglePassword2").addEventListener("click", function() {
  togglePasswordVisibility("password_confirm", "togglePassword2");
});
function togglePasswordVisibility(inputId, iconId) {
  var passField = document.getElementById(inputId);
  var icon = document.getElementById(iconId);
  if (passField.type === "password") {
    passField.type = "text";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  } else {
    passField.type = "password";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  }
}
