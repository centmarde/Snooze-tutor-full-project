import { d as doLogout, s as supabase, e as errorNotification } from "./loader.ea51d4ef.js";
import "./mover.71caf343.js";
document.body.addEventListener("click", function(event) {
  if (event.target.id === "btn_logout") {
    document.querySelector("#btn_logout").disabled = true;
    document.querySelector("#btn_logout").innerHTML = `<div class="spinner-border spinner-border-sm me-2" role="status"></div><span>Loading...</span>`;
    doLogout().then(() => {
      document.querySelector("#btn_logout").disabled = false;
      document.querySelector("#btn_logout").innerHTML = "Log-Out";
    }).catch((error) => {
      console.error("Logout failed:", error);
      document.querySelector("#btn_logout").disabled = false;
      document.querySelector("#btn_logout").innerHTML = "Log-Out";
    });
  }
});
$(document).ready(function() {
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  if (getUrlParameter("showModal") === "true") {
    $("#form_modal").modal("show");
  }
});
const form_search = document.getElementById("form_search");
const userId = localStorage.getItem("user_id");
const form_set_creation = document.getElementById("form_set_creation");
const form_set_making = document.getElementById("form_set_making");
getSet();
form_search.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form_search);
  getSet(formData.get("keyword"));
  document.getElementById("modal_close_search").click();
  form_search.reset();
};
async function getSet(keyword = "") {
  try {
    let { data: dataset, error } = await supabase.from("set").select("*,profiles(*)").or(
      "category.ilike.%" + keyword + "%, details.ilike.%" + keyword + "%, title.ilike.%" + keyword + "%"
    );
    let box = "";
    for (const data of dataset) {
      const username = data.profiles.username;
      const modalId = `id_${data.id}`;
      let { data: pageCounter, error: pageError } = await supabase.from("set_pages").select("count", { count: "exact" }).eq("set_id", data.id);
      const pageCount = pageCounter ? pageCounter[0].count : 0;
      box += `<div class=" col-lg-6 col-sm-12 px-2">
      <div class="card  text-dark mb-5" data-bs-toggle="modal"
              data-bs-target="#${modalId}" data-id="${modalId}">
              <div class="card">
              <div class="d-flex justify-content-center" id="imageCont_${data.id}">
              </div>
              <div class="card-img-overlay row">
                <h5 id="set_title" class="card-title text-center">${data.title}</h5>
                <i class="text-center">by: ${username}</i> <br> <i class="card-text text-center mt-4">Pages in Total: ${pageCount}</i>
                <br>
                <h5 class="card-text mt-4 text-center">${data.details}</h5>
                <p class="card-text mt-3 text-center">Created: ${data.created_at}</p>
              </div>
            </div>
  
            <div
            class="modal fade"
            id="${modalId}"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    id ="close_button"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="container">
                  <h2 class="text-center">Accept Questioner Set?</h2>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button
                    id="modal_close_search"
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button id="set_accept" type="submit" class="btn"  style="background-color: #1c0522; color: aliceblue">Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div></div>`;
    }
    document.getElementById("index").innerHTML = box;
    console.log("DOM updated successfully.");
  } catch (error) {
    console.error("Error:", error.message);
  }
  try {
    let { data: dataset2, error } = await supabase.from("set").select("*,profiles(*)");
    dataset2.forEach((data) => {
      const imageContainer = document.getElementById(`imageCont_${data.id}`);
      if (imageContainer) {
        let image;
        switch (data.category) {
          case "Math":
            image = `<img src="https://i.ibb.co/QprStd4/Math.jpg" width="100%" height="340vh">`;
            break;
          case "Programming":
            image = `<img src="https://i.ibb.co/fnQtrXz/different-school-subjects-vector-illustrations-set.jpg" width="100%" height="340vh">`;
            break;
          case "Science":
            image = `<img src="https://i.ibb.co/0Qy30rz/Science.jpg" width="100%" height="340vh">`;
            break;
          case "English":
            image = `<img src="https://i.ibb.co/jZFP0B0/English.jpg" width="100%" height="340vh">`;
            break;
          default:
            image = `<img src="https://i.ibb.co/3R6nVY0/Other.jpg" width="100%" height="340vh">`;
            break;
        }
        imageContainer.innerHTML = image;
      } else {
        console.error(`Image container not found for ID: imageCont_${data.id}`);
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}
document.body.addEventListener("click", function(event) {
  if (event.target.id === "set_accept") {
    const parentId = parseInt(
      event.target.closest(".card").getAttribute("data-id").split("_")[1],
      10
    );
    if (!isNaN(parentId)) {
      console.log(parentId);
      localStorage.setItem("parentId", parentId);
      window.location.href = "/accept.html";
    } else {
      console.log("parentId could not be converted to an integer.");
    }
  }
});
document.body.addEventListener("click", function(event) {
  if (event.target.id === "closer") {
    window.location.reload();
  }
});
let setIdPromise = new Promise((resolve, reject) => {
  form_set_creation.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(form_set_creation);
      const title = formData.get("title");
      const category = formData.get("category");
      const details = formData.get("details");
      const { data, error } = await supabase.from("set").insert([
        {
          title,
          category,
          details,
          user_id: userId
        }
      ]).select();
      if (error) {
        throw error.message;
      } else {
        Toastify({
          text: `set ${title} created successfully!`,
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
        const setId = data[0].id;
        $("#modal_set_making").modal("show");
        document.getElementById("btn-close").click();
        form_set_creation.reset();
        resolve(setId);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  };
});
setIdPromise.then((setId) => {
  console.log("setId outside function:", setId);
}).catch((error) => {
  console.error("Error occurred:", error);
});
const finnishButton = document.getElementById("finnishButton");
const newPage = document.getElementById("newPage");
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const setId = await setIdPromise;
    const formData = new FormData(form_set_making);
    const question = formData.get("question");
    const choiceA = formData.get("choiceA");
    const choiceB = formData.get("choiceB");
    const choiceC = formData.get("choiceC");
    const choiceD = formData.get("choiceD");
    const answer = formData.get("answer");
    const { data, error } = await supabase.from("set_pages").insert([
      {
        question,
        choiceA,
        choiceB,
        choiceC,
        choiceD,
        answer,
        set_id: setId
      }
    ]).select();
    if (error) {
      throw error.message;
    }
    form_set_making.reset();
    while (!finnishButton.clicked) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    }
  } catch (error) {
    errorNotification("Something wrong happened. Cannot add Question.", 15);
    console.error(error);
  }
};
user();
async function user() {
  let { data: profiles, error } = await supabase.from("profiles").select("*").eq("id", userId);
  let container = "";
  profiles.forEach((user_info) => {
    container += `<h4 class="mt-2" data-id="${user_info.username}">Good Day! ${user_info.username}</h4>`;
  });
  document.getElementById("userContainer").innerHTML = container;
}
form_set_making.onsubmit = handleSubmit;
newPage.addEventListener("click", () => {
  $("#form_celebration").modal("show");
  document.getElementById("btn_close2").click();
});
document.getElementById("finnishButton").addEventListener("click", function() {
  let counter = document.getElementById("counter");
  let currentValue = parseInt(counter.textContent);
  currentValue++;
  counter.textContent = currentValue;
});
function hideSpinner() {
  var container = document.getElementById("spin");
  container.style.display = "none";
}
window.addEventListener("load", function() {
  setTimeout(function() {
    hideSpinner();
  }, 2e3);
});
