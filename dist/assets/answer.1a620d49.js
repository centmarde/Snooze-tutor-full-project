import { s as supabase } from "./loader.ea51d4ef.js";
import "./mover.71caf343.js";
$(document).ready(function() {
  $("#form_count").modal("show");
});
const parentIdFromStorage = localStorage.getItem("parentId");
const userSelections = JSON.parse(localStorage.getItem("userSelections"));
getSet();
function getSet() {
  if (parentIdFromStorage) {
    console.log(parentIdFromStorage);
  } else {
    console.log("parentId not found in localStorage");
  }
}
getUserAnswer();
function getUserAnswer() {
  if (userSelections) {
    console.log(userSelections);
  } else {
    console.log("userSelections not found in localStorage");
  }
}
getKey().then(countResult);
async function getKey() {
  try {
    let { data: set_pages, error } = await supabase.from("set_pages").select("*").eq("set_id", parentIdFromStorage);
    if (error) {
      throw error;
    }
    let answerCont = "";
    set_pages.forEach((data, index) => {
      var _a;
      const userAnswer = (((_a = userSelections[index]) == null ? void 0 : _a.selectedChoice) || "").toUpperCase();
      const correctAnswer = data.answer.toUpperCase();
      let cardClass = "";
      console.log("User Answer:", userAnswer);
      console.log("Correct Answer:", correctAnswer);
      if (userAnswer === correctAnswer) {
        cardClass = "border border-success border-4";
      } else {
        cardClass = "border border-danger border-4";
      }
      answerCont += `<div  class="card ${cardClass}">
          <div id="paper" class="card-body" data-id ="${data.id}">
            <form>
              <fieldset disabled>
                <div class="card-text">${data.question}</div>
                <div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      value="A"
                      ${userAnswer === "A" ? "checked" : ""} // Check if user selected this option
                    />
                    <label class="form-check-label" for="choiceA">
                      A. <span>${data.choiceA}</span>
                    </label>
                  </div>
                  <!-- Repeat for other options -->
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      value="B"
                      ${userAnswer === "B" ? "checked" : ""} // Check if user selected this option
                    />
                    <label class="form-check-label" for="choiceA">
                      B. <span>${data.choiceB}</span>
                    </label>
                  </div>
                  <!-- Repeat for other options -->
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      value="C"
                      ${userAnswer === "C" ? "checked" : ""} // Check if user selected this option
                    />
                    <label class="form-check-label" for="choiceA">
                      C. <span>${data.choiceC}</span>
                    </label>
                  </div>
                  <!-- Repeat for other options -->
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      value="D"
                      ${userAnswer === "D" ? "checked" : ""} // Check if user selected this option
                    />
                    <label class="form-check-label" for="choiceA">
                      D. <span>${data.choiceD}</span>
                    </label>
                  </div>
                  <!-- Repeat for other options -->
                </div>
              </fieldset>
            </form>
            <div class="d-grid gap-2">
              <button type="button" class="btn btn-outline-dark fs-1 d-flex" disabled>
                Correct Answer:
                <p class="ms-3">${data.answer.toUpperCase()}</p>
              </button>
              <button type="button" class="btn btn-outline-dark fs-1 d-flex text-center" disabled>
                Your Answer:
                <p id="final-answer" class="ms-3" >${userAnswer ? userAnswer.toUpperCase() : "-"}</p>
              </button>
            </div>
          </div>
        </div><br>`;
    });
    document.getElementById("problem_choices").innerHTML = answerCont;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
document.body.addEventListener("click", function(event) {
  if (event.target.id === "show") {
    window.location.href = "./sets.html";
  }
});
async function countResult() {
  try {
    let { data: set_pages, error } = await supabase.from("set_pages").select("*").eq("set_id", parentIdFromStorage);
    if (error) {
      throw error;
    }
    let totalScore = 0;
    set_pages.forEach((data, index) => {
      var _a;
      const userAnswer = (((_a = userSelections[index]) == null ? void 0 : _a.selectedChoice) || "").toUpperCase();
      const correctAnswer = data.answer.toUpperCase();
      if (userAnswer === correctAnswer) {
        totalScore++;
      }
    });
    const percentage = totalScore / set_pages.length * 100;
    let rank = "";
    if (percentage >= 10 && percentage < 20) {
      const randomNum = Math.random();
      if (randomNum < 0.33) {
        rank = "Worm \u{1F41B}";
      } else if (randomNum < 0.66) {
        rank = "Bee \u{1F41D}";
      } else {
        rank = "Ant \u{1F41C}";
      }
    } else if (percentage >= 20 && percentage < 30) {
      const randomNum = Math.random();
      if (randomNum < 0.33) {
        rank = "Rabbit \u{1F430}";
      } else if (randomNum < 0.66) {
        rank = "Bird \u{1F426}";
      } else {
        rank = "Mice \u{1F401}";
      }
    } else if (percentage >= 30 && percentage < 40) {
      const randomNum = Math.random();
      if (randomNum < 0.33) {
        rank = "Chicken \u{1F414}";
      } else if (randomNum < 0.66) {
        rank = "Peacock \u{1F99A}";
      } else {
        rank = "Flamingo \u{1F9A9}";
      }
    } else if (percentage >= 40 && percentage < 50) {
      const randomNum = Math.random();
      if (randomNum < 0.33) {
        rank = "Cat \u{1F431}";
      } else if (randomNum < 0.66) {
        rank = "Lama \u{1F999}";
      } else {
        rank = "cow \u{1F403}";
      }
    } else if (percentage >= 50 && percentage < 60) {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "Horse \u{1F434}";
      } else if (randomNum < 0.4) {
        rank = "Unicorn \u{1F984}";
      } else if (randomNum < 0.6) {
        rank = "Gorilla \u{1F98D}";
      } else if (randomNum < 0.8) {
        rank = "Camel \u{1F42A}";
      } else {
        rank = "Sloth \u{1F9A5}";
      }
    } else if (percentage >= 60 && percentage < 70) {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "dog \u{1F436}";
      } else if (randomNum < 0.4) {
        rank = "Penguin \u{1F427}";
      } else if (randomNum < 0.6) {
        rank = "Chimp \u{1F9A7}";
      } else if (randomNum < 0.8) {
        rank = "Scorpion \u{1F982}";
      } else {
        rank = "giraffe \u{1F992}";
      }
    } else if (percentage >= 70 && percentage < 80) {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "Fox \u{1F98A}";
      } else if (randomNum < 0.4) {
        rank = "Jaguar \u{1F406}";
      } else if (randomNum < 0.6) {
        rank = "Wolf \u{1F43A}";
      } else if (randomNum < 0.8) {
        rank = "Parrot \u{1F99C}";
      } else {
        rank = "Crocodile \u{1F40A}";
      }
    } else if (percentage >= 80 && percentage < 90) {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "Tiger \u{1F98A}";
      } else if (randomNum < 0.4) {
        rank = "Octupos \u{1F406}";
      } else if (randomNum < 0.6) {
        rank = "Elepant \u{1F418}";
      } else if (randomNum < 0.8) {
        rank = "Typical Women \u{1F646}\u{1F3FC}\u200D\u2640\uFE0F";
      } else {
        rank = "Programmer \u{1F468}\u{1F3FC}\u200D\u{1F4BB}";
      }
    } else if (percentage >= 90 && percentage <= 99) {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "Eagle \u{1F985}";
      } else if (randomNum < 0.4) {
        rank = "Lion, King of the Jungle \u{1F406}";
      } else if (randomNum < 0.6) {
        rank = "Apex Predator\u{1F988}";
      } else if (randomNum < 0.8) {
        rank = "Detective \u{1F575}\uFE0F";
      } else {
        rank = "Emperor \u{1F451}";
      }
    } else if (percentage === 100) {
      const randomNum = Math.random();
      if (randomNum < 0.33) {
        rank = "Dragon \u{1F432}";
      } else if (randomNum < 0.66) {
        rank = "Einstein \u{1F9E0}\u269B";
      } else {
        rank = "Ai \u{1F916}";
      }
    } else {
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        rank = "Banana \u{1F34C}";
      } else if (randomNum < 0.4) {
        rank = "Eggplant \u{1F346}";
      } else if (randomNum < 0.6) {
        rank = "T-rex \u{1F996}";
      } else if (randomNum < 0.8) {
        rank = "Snowman \u26C4\uFE0F";
      } else {
        rank = "Rose \u{1F940}";
      }
    }
    document.getElementById("result").innerText = `Total Score: ${totalScore} out of ${set_pages.length}`;
    document.getElementById("rankQuestion").innerText = `You have the brain of a ${rank}`;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
const delayButton = document.getElementById("delay");
function showButtonWithFade() {
  delayButton.style.display = "block";
}
delayButton.style.display = "none";
const delayInMilliseconds = 3e3;
setTimeout(showButtonWithFade, delayInMilliseconds);
