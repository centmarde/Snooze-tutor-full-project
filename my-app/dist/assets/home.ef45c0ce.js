import { d as doLogout, s as supabase, e as errorNotification, a as successNotification } from "./loader.ea51d4ef.js";
import "./mover.71caf343.js";
const itemsImageUrl = "https://plsyfklzwmasyypcuwei.supabase.co/storage/v1/object/public/profilePic/";
const userId = localStorage.getItem("user_id");
const form_item = document.getElementById("form_item");
const form_search = document.getElementById("form_search");
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
console.log("User ID:", userId);
getDatas();
getQuestions();
async function getDatas() {
  let { data: profiles, error } = await supabase.from("profiles").select("*").eq("id", userId);
  let container = "";
  profiles.forEach((user_info) => {
    container += `<h4 class="mt-2" data-id="${user_info.username}">Good Day! ${user_info.username}</h4>`;
  });
  document.getElementById("userContainer").innerHTML = container;
}
async function getterAllquestions() {
  let { data: questions, error } = await supabase.from("questions").select("count", { count: "exact" });
  const count = questions[0].count;
  let container = "";
  questions.forEach((data_s) => {
    container += `<p class="mt-2 text-center" data-id="${data_s.id}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-diamond me-2" viewBox="0 0 16 16">
    <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
  </svg>Total Questions: ${count}</p>`;
  });
  document.getElementById("topContainer").innerHTML = container;
  return count;
}
getterAllquestions();
async function getterUserQuestions() {
  let { data: questions, error } = await supabase.from("questions").select("count", { count: "exact" }).eq("user_id", userId);
  const count = questions[0].count;
  let container = "";
  questions.forEach((data_s) => {
    container += `<p class="mt-2" data-id="${data_s.id}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-diamond-fill me-2" viewBox="0 0 16 16">
    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927"/>
  </svg>Your Questions: ${count}</p>`;
  });
  document.getElementById("topContainer2").innerHTML = container;
  return count;
}
getterUserQuestions();
async function updateProgressBar() {
  const { data: questions, error } = await supabase.from("questions").select("count", { count: "exact" });
  if (error) {
    console.error("Error fetching questions:", error.message);
    return;
  }
  const totalCount = questions[0].count;
  const userQuestions = await supabase.from("questions").select("count", { count: "exact" }).eq("user_id", userId);
  if (userQuestions.error) {
    console.error("Error fetching user questions:", userQuestions.error.message);
    return;
  }
  const userQuestionCount = userQuestions.data[0].count;
  const percentage = userQuestionCount / totalCount * 100;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = percentage + "%";
  progressBar.style.backgroundColor = "#2b1055";
  progressBar.textContent = percentage.toFixed(2) + "%";
}
updateProgressBar().then(() => {
  console.log("Progress bar updated successfully.");
}).catch((error) => {
  console.error("Error:", error.message);
});
form_search.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form_search);
  getQuestions(formData.get("keyword"));
  document.getElementById("modal_close_search").click();
  form_search.reset();
};
form_item.onsubmit = async (e) => {
  e.preventDefault();
  document.querySelector("#form_item button[type='submit']").disabled = true;
  document.querySelector("#form_item button[type='submit']").innerHTML = `
                  <span>Loading...</span>`;
  const formData = new FormData(form_item);
  {
    const { data: questions, error } = await supabase.from("questions").insert([
      {
        title: formData.get("title"),
        question_text: formData.get("question"),
        answer_text: formData.get("answer"),
        user_id: userId
      }
    ]).select();
    if (error) {
      errorNotification("Something wrong happened. Cannot add question.", 15);
      console.log(error);
    } else {
      successNotification("question Successfully Added!", 15);
      getDatas();
      window.location.pathname = "/home.html";
    }
  }
  document.getElementById("modal_close").click();
  form_item.reset();
  document.querySelector("#form_item button[type='submit']").disabled = false;
  document.querySelector(
    "#form_item button[type='submit']"
  ).innerHTML = `Submit`;
};
async function getQuestions(keyword = "") {
  let { data: questions, error: questionError } = await supabase.from("questions").select("*,profiles(*)").or(
    "question_text.ilike.%" + keyword + "%, title.ilike.%" + keyword + "%"
  );
  let { data: comments, error: commentError } = await supabase.from("comments").select("*,profiles(*)");
  let questionComments = {};
  comments.forEach((comment) => {
    const questionId = comment.question_id;
    if (!questionComments[questionId]) {
      questionComments[questionId] = [];
    }
    questionComments[questionId].push(comment);
  });
  questions.sort(() => Math.random() - 0.5);
  let questionContainer = "";
  questions.forEach((data, index) => {
    const imagepath = data.profiles.image_path;
    const username = data.profiles.username;
    const likes = data.profiles.likes;
    let commentHtml = "";
    if (questionComments[data.id]) {
      questionComments[data.id].forEach((comment) => {
        const commentImagePath = comment.profiles.image_path;
        const commentUsername = comment.profiles.username;
        commentHtml += `
          <div class="col-2 my-1">
            <img
              src="${itemsImageUrl + commentImagePath}"
              class="block my-2 border border-dark border-2 rounded-circle d-flex align-items-center"
              width="40px"
              height="40px"
            />
          </div>
          <div class="col-10 my-1">
            <div class="card">
              <div class="card-body p-0">
                <b>${commentUsername}</b>
                <p>${comment.comment_text}</p>
              </div>
            </div>
          </div>`;
      });
    }
    function getRandomNumber(min, max, option) {
      if (option === 2) {
        const probabilities = [8, 7, 6, 5, 4, 3, 2, 1];
        const totalProbability = probabilities.reduce((acc, val) => acc + val, 0);
        const randomValue = Math.random() * totalProbability;
        let cumulative = 0;
        for (let i = 0; i < probabilities.length; ++i) {
          cumulative += probabilities[i];
          if (randomValue < cumulative) {
            return i + min;
          }
        }
      } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    const options = [
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35"
    ];
    const randomIndex1 = Math.floor(Math.random() * options.length);
    const randomIndex2 = getRandomNumber(1, 8, 2);
    const randomOption1 = options[randomIndex1];
    const randomOption2 = randomIndex2.toString();
    questionContainer += `
      <div class="col-lg-6 col-md-12 col-sm-12 justify-content-center mb-3">
        <div class="card hiddenAnimate2" data-id="${data.id}">
          <div class="card" style="background-color:#e3deeb;">
            <div class="card-body">
              <div class="row">
                <div class="col-4 col-md-12">
                  <img
                    src="${itemsImageUrl + imagepath}"
                    class="block my-2 border border-dark border-2 rounded-circle"
                    width="80px"
                    height="80px"
                  />
                </div>
                <div class="col-8 col-md-12">
                  <div>
                    <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path  d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                      </svg>
                      <b class="me-1">IGN:</b> ${username}</p>
                    <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                      </svg>
                      <b class="me-1">Likes:</b> ${likes}</p>
                  </div>
                </div>
              </div>
              <h2 class="card-title text-center">${data.title}</h2>
              <p class="card-text text-center">${data.question_text}</p>
              <div id="textContainer${index}" class="d-grid gap-2 d-none">
              <i>${data.answer_text}</i>
          </div>
          <div class="d-grid gap-2 mt-2" >
          <button type="button" id="showButton${index}" class="btn btn-dark"  style=" background-color:#2b1055;">Show Answer</button>
          </div>
              <div class="row">
                <div class="col d-flex mt-3">
                <i id="happy" class="mt-1 fa fa-smile-o fa-2x" aria-hidden="true"></i><p class="ms-2 mt-2">${randomOption1}</p>
                <i id="sad" class="mt-1 ms-4 fa fa-frown-o fa-2x" aria-hidden="true"></i><p class="ms-2 mt-2">${randomOption2}</p>
                </div>
                <div class="col d-flex justify-content-end align-items-center">
                  <button class="btn d-flex mt-3 justify-content-center" data-bs-toggle="modal" data-bs-target="#modal_heart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style="pointer-events: none;">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                    <p class="ms-2">${data.heart}</p>
                  </button>
                  <button class="btn" type="button" id="comment_btn" data-id="${data.id}" data-bs-toggle="modal" data-bs-target="#modal_comment">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16" style="pointer-events: none;">
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
                  </svg>
                </button>
                
                </div>
              </div>
              <div class="row">
                <div class="d-grid gap-2">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex row" id="commentWrapper${index}"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal for hearts -->
    
  <div class="modal fade" id="modal_heart" tabindex="-1">
   <div class="modal-dialog modal-dialog-centered">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title text-center">Like this Question?</h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <p>Submiting a heart helps \u{1F970}\u{1F970}\u{1F970}\u{1F970}
         </p>
       </div>
       <div class="modal-footer">
         <button type="button" id="modal_close_heart" class="btn" data-bs-dismiss="modal" style="background-color: #e00909; color: white;">No</button>
         <button type="submit" data-id ="${data.id}" id="btn_heart" class="btn" style="background-color: #2b1055; color: white;" >Submit 1Heart</button>
       </div>
     </div>
   </div>
 </div>

  <!-- end modal for hearts -->
      <!-- modal for Comments -->
    
      <div class="modal fade" id="modal_comment" tabindex="-1">
      <form id="form_comment">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title text-center">Add Comment:</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
           <div class="mb-3">
          <label for="input_comment" class="form-label">Input:</label>
          <textarea class="form-control" name="input_comment" id="input_comment" rows="3"></textarea>
        </div>
           </div>
           <div class="modal-footer">
             <button type="button" id="modal_close_heart" class="btn" data-bs-dismiss="modal" style="background-color: #e00909; color: white;">Cancel</button>
             <button type="button" data-id ="${data.id}" id="comment_add" class="btn" style="background-color: #2b1055; color: white;" >Save Comment</button>
           </div>
         </div>
       </div>
       </form>
     </div>
    
      <!-- end modal for Comments -->

     

      <!-- modal for edit comment-->
    
      <div class="modal fade" id="modal_comment_edit" tabindex="-1">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title text-center">Edit Question</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
           <div class="mb-3">
           <label for="input_comment" class="form-label">Input:</label>
           <textarea class="form-control" name="input_comment" id="input_comment_text" rows="3"></textarea>
         </div>
           </div>
           <div class="modal-footer">
             <button type="button" id="modal_close_comment" class="btn" data-bs-dismiss="modal" style="background-color: #e00909; color: white;">No</button>
             <button  type="button" id="btn_edit_comment" class="btn" style="background-color: #2b1055; color: white;" >Yes</button>
           </div>
         </div>
       </div>
     </div>
    
      <!-- end modal for edit comment -->
      `;
  });
  document.body.addEventListener("click", function(event) {
    if (event.target.id === "comment_btn") {
      const cardIndex = event.target.getAttribute("data-id");
      localStorage.setItem("card_index", cardIndex);
    }
  });
  document.body.addEventListener("click", function(event) {
    if (event.target.id === "comment_add") {
      localStorage.getItem("card_index");
      insertComment(event, document.getElementById("form_comment"));
    }
  });
  const insertComment = async (e, form) => {
    e.preventDefault();
    const cardIndex = localStorage.getItem("card_index");
    const formData = new FormData(form);
    try {
      const { data: comments2, error: commentError2 } = await supabase.from("comments").insert([
        {
          comment_text: formData.get("input_comment"),
          question_id: cardIndex,
          user_id: userId
        }
      ]);
      if (commentError2) {
        Toastify({
          text: "error occurred while deleting comment. Please try again.",
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
      } else {
        Toastify({
          text: "comment added successfully.",
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
        location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      Toastify({
        text: "unexpected error occurred. Please try again.",
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
  };
  document.getElementById("indexContainer").innerHTML = questionContainer;
  for (let i = 0; i < questions.length; i++) {
    var showButton = document.getElementById(`showButton${i}`);
    showButton.onclick = function() {
      var textContainer = document.getElementById(`textContainer${i}`);
      textContainer.classList.remove("d-none");
    };
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  questions.forEach((data, index) => {
    let commentWrapper = "";
    let showMoreLink = "";
    if (questionComments[data.id]) {
      const shuffledComments = shuffle(questionComments[data.id]);
      const firstComment = shuffledComments[0];
      const remainingComments = shuffledComments.slice(1);
      const { image_path, username, id: comment_id } = firstComment.profiles;
      const { id } = firstComment;
      localStorage.setItem("commentId", comment_id);
      const deleteButton = comment_id == userId ? `
      <button type="button" class="me-2 btn btn-outline-dark btn-sm edit-comment" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal_comment_edit">
        <i class="fa fa-trash" aria-hidden="true"></i>Edit
      </button>
      <button type="button" class="btn btn-outline-danger btn-sm delete-comment" data-id="${id}">
        <i class="me-2 fa fa-trash" aria-hidden="true"></i> Delete
      </button>` : "";
      commentWrapper += `
      <div class="col-2 my-1">
        <img
          src="${itemsImageUrl + image_path}"
          class="block my-2 border border-dark border-2 rounded-circle d-flex align-items-center"
          width="40px"
          height="40px"
        />
      </div>
      <div class="col-10 my-1">
            <div class="card">
              <div class="card-body p-0 ms-2">
                <b>${username}</b>
                <p>${firstComment.comment_text}</p>
                <div class="d-flex justify-content-end mb-1 me-1"> ${deleteButton} </div>
               
              </div>
            </div>
          </div>`;
      if (remainingComments.length > 0) {
        showMoreLink = `<div class="col-12 my-1">
        <a href="#" class="show-comments" data-index="${index}" style="color: #2b1055;">Show more comments</a>
      </div>`;
      }
    }
    document.getElementById(`commentWrapper${index}`).innerHTML = commentWrapper + showMoreLink;
  });
  document.querySelectorAll(".show-comments").forEach((anchor) => {
    anchor.addEventListener("click", function(event) {
      event.preventDefault();
      localStorage.getItem("commentId");
      const dataIndex = this.getAttribute("data-index");
      const remainingCommentWrapper = questionComments[questions[dataIndex].id].slice(1).map((comment) => {
        const { image_path, username, id: comment_id } = comment.profiles;
        const { id, comment_text } = comment;
        const deleteButton = comment_id == userId ? `
        <div class="d-flex justify-content-end me-1 mb-1">
        <button type="button" class="btn btn-outline-dark btn-sm edit-comment me-2" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal_comment_edit">
        <i class="fa fa-trash" aria-hidden="true"></i>Edit
      </button>
          <button type="button" class="btn btn-outline-danger btn-sm" data-id="${id}">
            <i class="me-2 fa fa-trash" aria-hidden="true"></i>
            Delete
          </button>
        </div>
        ` : "";
        return `
          <div class="col-2 my-1">
            <img
              data-id="${id}"
              src="${itemsImageUrl + image_path}"
              class="block my-2 border border-dark border-2 rounded-circle d-flex align-items-center"
              width="40px"
              height="40px"
            />
          </div>
          <div class="col-10 my-1">
            <div class="card">
              <div class="card-body p-0 ms-2">
                <b>${username}</b>
                <p>${comment_text}</p>
                ${deleteButton} 
              </div>
            </div>
          </div>`;
      }).join("");
      document.getElementById(`commentWrapper${dataIndex}`).insertAdjacentHTML("beforeend", remainingCommentWrapper);
      this.parentElement.removeChild(this);
    });
  });
}
document.body.addEventListener("click", function(event) {
  if (event.target.classList.contains("edit-comment")) {
    const edit_id = event.target.getAttribute("data-id");
    console.log(edit_id);
    editComment(edit_id);
  }
});
document.body.addEventListener("click", function(event) {
  if (event.target.classList.contains("btn-outline-danger")) {
    const data_id = event.target.getAttribute("data-id");
    console.log(data_id);
    deleteComment(data_id);
  }
});
async function deleteComment(commentId) {
  try {
    const confirmed = confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) {
        throw error;
      }
      Toastify({
        text: "Comment deleted successfully.",
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
      window.location.reload();
    } else {
      Toastify({
        text: "deletion aborted.",
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
  } catch (error) {
    Toastify({
      text: "something wrong happened. Cannot delete comment.",
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
    window.location.reload();
  }
}
const editComment = async (edit_id) => {
  let { data: comments, error } = await supabase.from("comments").select("*").eq("id", edit_id);
  if (error == null) {
    comments[0].id;
    document.getElementById("input_comment_text").value = comments[0].comment_text;
  } else {
    errorNotification("Something wrong happened. Cannot show item.", 15);
    console.log(error);
  }
};
form_modal.onsubmit = async (e) => {
  e.preventDefault();
  document.querySelector("#form_modal button").disabled = true;
  document.querySelector(
    "#form_modal button"
  ).innerHTML = `<span>Loading...</span>`;
  document.getElementById("modal_close").click();
  form_item.reset();
  document.querySelector("#form_item button[type='submit']").disabled = false;
  document.querySelector(
    "#form_modal button[type='submit']"
  ).innerHTML = `Submit`;
};
document.addEventListener("DOMContentLoaded", function() {
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  function showInView() {
    var elements = document.querySelectorAll(".hiddenAnimate2");
    elements.forEach(function(element) {
      if (isInViewport(element)) {
        element.classList.add("show2");
      }
    });
  }
  showInView();
  window.addEventListener("scroll", showInView);
});
function showHiddenElements() {
  const hiddenElements = document.querySelectorAll(".hiddenAnimate3");
  hiddenElements.forEach((element) => {
    setTimeout(() => {
      element.classList.add("show2");
    }, 1e3);
  });
}
document.addEventListener("DOMContentLoaded", showHiddenElements);
document.body.addEventListener("click", function(event) {
  if (event.target.id === "btn_heart") {
    submit_heart(event);
  }
});
const submit_heart = async (e) => {
  const consid = e.target.getAttribute("data-id");
  console.log("Data ID:", consid);
  console.log("Event target:", e.target);
  console.log("Event object:", e);
  const { data: questions, error } = await supabase.from("questions").select("heart").eq("id", consid).single();
  if (error) {
    errorNotification("Something wrong happened. Cannot add heart.", 15);
    console.log(error);
    return;
  }
  if (!questions) {
    errorNotification("Question not found.", 15);
    return;
  }
  const updatedHeartsCount = questions.heart + 1;
  const { updateError } = await supabase.from("questions").update({ heart: updatedHeartsCount }).eq("id", consid);
  if (updateError) {
    errorNotification("Error updating heart count.", 15);
    console.log(updateError);
    return;
  }
  successNotification("Heart Successfully Added!", 15);
  document.getElementById("modal_close_heart").click();
  window.location.reload();
};
window.onload = function() {
  setTimeout(function() {
    window.scrollTo(0, 260);
  }, 1900);
};
async function updateRankBar() {
  try {
    const { data: rankData, error: rankError } = await supabase.from("rank").select("percentage");
    if (rankError) {
      throw new Error("Error fetching rank data: " + rankError.message);
    }
    const percentage = rankData[0].percentage;
    const progressBar = document.querySelector(".progress-bar2");
    progressBar.style.width = percentage + "%";
    progressBar.style.backgroundColor = "#2b1055";
    progressBar.style.color = "white";
    progressBar.textContent = percentage.toFixed(2) + "%";
    progressBar.style.textAlign = "center";
    if (percentage >= 100) {
      const rankProgression = {
        "newbie": "junior",
        "junior": "Senior",
        "Senior": "juniorOfficer",
        "juniorOfficer": "SeniorOfficer",
        "SeniorOfficer": "Officer",
        "Officer": "Master"
      };
      const currentRank = await getCurrentRank();
      const nextRank = rankProgression[currentRank];
      await updateRank(nextRank);
      console.log(`Congratulations! You've ranked up to ${nextRank}.`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
updateRankBar();
updateRankBar();
async function updateRank(rank_name) {
  try {
    const userId2 = getCurrentUserId();
    const { data, error } = await supabase.from("rank").update({ rank: rank_name }).eq("id", userId2);
    if (error) {
      throw new Error("Error updating rank: " + error.message);
    }
    console.log("Rank updated successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}
$(document).ready(function() {
  $("#createS").click(function() {
    window.location.href = "./sets.html?showModal=true";
  });
});
document.getElementById("icon");
