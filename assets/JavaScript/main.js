const searchEngineToken =
  "e934cda8f6237c759907bcb8e9cc46807ad714b154fc2b897c91d074de54c347";
window.onkeyup = keyup;
var inputTextValue;
function keyup(e) {
  inputTextValue = e.target.value;
  if (e.keyCode == 13) {
    var replaced = inputTextValue.split(" ").join("+");
    window.location = `https://serpapi.com/search.html?q=${replaced}&location=San+Antonio,+Texas,+United+States&hl=en&gl=us&google_domain=google.com&api_key=${searchEngineToken}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalPopup");
  var span = document.getElementsByClassName("close")[0];
  var mainContent = document.querySelector(".main-content");

  modal.style.display = "block";
  mainContent.classList.add("blur-background");

  span.onclick = function () {
    modal.style.display = "none";
    mainContent.classList.remove("blur-background");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      mainContent.classList.remove("blur-background");
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  readHistory();
});

const searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  saveHistory();
});

function saveHistory() {
  const history = searchTxt.value;
  localStorage.setItem("history", JSON.stringify(history));
}

function readHistory() {
  let read = localStorage.getItem("history");
  if (read) {
    const history = JSON.parse(read);
    console.log(history);
    document.getElementById("output").innerText = history;
    searchTxt.value = history;
  } else {
    console.log("No history found.");
  }
}
