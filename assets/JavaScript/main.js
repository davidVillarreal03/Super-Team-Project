const hotBtn = document.querySelector("#hot");
const topBtn = document.querySelector("#top");
const newBtn = document.querySelector("#new");
const historyBtn = document.querySelector("#history");
const history = $("#search-engine");

function saveHistoryToStorage(history) {
  const historyStorage = history.val().trim();
  localStorage.setItem("history", JSON.stringify(historyStorage));
}

function history() {
  let read = JSON.parse(localStorage.getItem("history"));
  console.log(read);
}

historyBtn.addEventListener("click", history);
