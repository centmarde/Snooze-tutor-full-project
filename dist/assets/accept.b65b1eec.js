import { s as supabase } from "./loader.ea51d4ef.js";
import "./mover.71caf343.js";
const parentIdFromStorage = localStorage.getItem("parentId");
getSet();
getPages();
function getSet() {
  if (parentIdFromStorage) {
    console.log(parentIdFromStorage);
  } else {
    console.log("parentId not found in localStorage");
  }
}
let currentIndex = 0;
let userSelections = [];
async function getPages() {
  try {
    const { data: dataset, error } = await supabase.from("set_pages").select("*").eq("set_id", parentIdFromStorage);
    if (error) {
      throw error;
    }
    if (dataset.length === 0) {
      document.getElementById("problem_body").innerHTML = "<p>No data available.</p>";
      return;
    }
    const currentData = dataset[currentIndex];
    document.getElementById(
      "problem_body"
    ).innerHTML = `<p data-id="${currentData.id}">${currentData.question}</p>`;
    document.getElementById("choiceA").innerHTML = currentData.choiceA;
    if (currentData.choiceB) {
      document.getElementById("choiceB").innerHTML = currentData.choiceB;
    }
    if (currentData.choiceC) {
      document.getElementById("choiceC").innerHTML = currentData.choiceC;
    }
    if (currentData.choiceD) {
      document.getElementById("choiceD").innerHTML = currentData.choiceD;
    }
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener("change", function() {
        const checkedRadio = document.querySelector(
          'input[type="radio"]:checked'
        );
        if (checkedRadio) {
          document.getElementById("final").disabled = false;
          const questionId = currentData.id;
          const selectedChoice = checkedRadio.value;
          userSelections[currentIndex] = { questionId, selectedChoice };
        }
      });
    });
    document.body.addEventListener("click", function(event) {
      if (event.target.id === "final") {
        lockInAnswer(dataset);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
function lockInAnswer(dataset) {
  const selectedChoice = document.querySelector('input[type="radio"]:checked');
  if (!selectedChoice) {
    alert("Please select a choice before proceeding.");
    return;
  }
  const confirmation = confirm("Lock in answer?");
  if (confirmation) {
    if (currentIndex < dataset.length - 1) {
      currentIndex++;
      const nextData = dataset[currentIndex];
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.checked = false;
      });
      document.getElementById(
        "problem_body"
      ).innerHTML = `<p data-id="${nextData.id}">${nextData.question}</p>`;
      document.getElementById("choiceA").innerHTML = nextData.choiceA;
      if (nextData.choiceB) {
        document.getElementById("choiceB").innerHTML = nextData.choiceB;
      } else {
        document.getElementById("choiceB").innerHTML = "";
      }
      if (nextData.choiceC) {
        document.getElementById("choiceC").innerHTML = nextData.choiceC;
      } else {
        document.getElementById("choiceC").innerHTML = "";
      }
      if (nextData.choiceD) {
        document.getElementById("choiceD").innerHTML = nextData.choiceD;
      } else {
        document.getElementById("choiceD").innerHTML = "";
      }
    } else {
      alert("End of dataset reached.");
      localStorage.setItem("userSelections", JSON.stringify(userSelections));
      $("#form_celebration").modal("show");
    }
  } else {
    alert("Process aborted.");
  }
  console.log(userSelections);
}
document.body.addEventListener("click", function(event) {
  if (event.target.id === "showBtn") {
    window.location.href = "/answer.html";
  }
});
document.body.addEventListener("click", function(event) {
  if (event.target.id === "exitBtn") {
    window.location.href = "/home.html";
  }
});
