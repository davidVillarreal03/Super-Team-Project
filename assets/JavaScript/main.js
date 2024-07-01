const historyBtnt = document.querySelector("#history");
const historyt = document.getElementById("searchTxt").value;

function saveHistoryToStorage(history) {
  const historyStorage = history.value;
  localStorage.setItem("history", JSON.stringify(historyStorage));
}

function UserHistory() {
  let read = JSON.parse(localStorage.getItem("history"));
  console.log(read);
}

// historyBtnt.addEventListener("click", UserHistory);

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
