const hotBtn = document.querySelector("#hot");
const topBtn = document.querySelector("#top");
const newBtn = document.querySelector("#new");
const historyBtn = document.querySelector("#history");
const history = $('#search-engine');

function saveHistoryToStorage(history) {
  const historyStorage = history.val().trim();
  localStorage.setItem('history', JSON.stringify(historyStorage));
}

function history() {
  let read = JSON.parse(localStorage.getItem('history'));
  console.log(read);
}

const accessToken =
"eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE5NDQ1MzU5LjYzNjUzMywiaWF0IjoxNzE5MzU4OTU5LjYzNjUzMywianRpIjoiRnQ4U3hGU2x5ajZhVmtKWHdXcjQ4Z0FPVjZJN3FBIiwiY2lkIjoiMl9XVEZHcmtHWEhzZnpVdW9yam5QZyIsImxpZCI6InQyX3R0dW5hcG1pOCIsImFpZCI6InQyX3R0dW5hcG1pOCIsImxjYSI6MTcwNzQ3MTQ2MjM5Miwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.ZJ3wCka2czjsW1ISB7bUQo-c9K08qyN53MLYWCOD4WFmCsKEzVb_qOCvG5IkDErqxV5V82cAzZHT2PqN8TZNhkdF9yyC2rnbKFBVyxTcu_nvkpzX6PD2TKq0pHhuf5i421BsweO5UNGVeipeN_IWEHcFYg-lOlHdu9TXHcRynsyxyccg53Vg5Y26hCj9i67TUD6bhOo4rZeUx8TSqPWYqmFW6CxKeWXhLSxSpUlP71JJx3Nnepse7UNRi8lKPOIzlCG7YtLnbs6WwaGMtyTqwMvGbYt63tkbgndhhJ3HjWnOwR-GJrhzXE9A3lJh_c0xHBIdl_F7UThszkXm-PwRVQ";
function SortNewApi() {
  fetch("https://oauth.reddit.com/r/sanantonio/new.json?limit=5", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      for(let i = 0; i < 5; i++) {
        console.log(data.data.children[i].data.title);
        console.log(data.data.children[i].data.link_flair_text);
        console.log(data.data.children[i].data.permalink);
        console.log(data.data.children[i].data.num_comments);        
      }
    });
  }
function SortTopApi() {
  fetch("https://oauth.reddit.com/r/sanantonio/top.json?limit=5", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      for(let i = 0; i < 5; i++) {
        console.log(data.data.children[i].data.title);
        console.log(data.data.children[i].data.link_flair_text);
        console.log(data.data.children[i].data.permalink);
        console.log(data.data.children[i].data.num_comments);        
      }
    });
  }
function SortHotApi() {
  fetch("https://oauth.reddit.com/r/sanantonio/hot.json?limit=5", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      for(let i = 0; i < 5; i++) {
        console.log(data.data.children[i].data.title);
        console.log(data.data.children[i].data.link_flair_text);
        console.log(data.data.children[i].data.permalink);
        console.log(data.data.children[i].data.num_comments); 
      }
       // const newResultsElement = document.getElementById("newResults");

      // data.data.children.forEach((post) => {
      //   const selftext = post.data.selftext;
      //   const postElement = document.createElement("p");
      //   postElement.textContent = selftext + "\n";
      //   newResultsElement.appendChild(postElement);
    });
  }

      //   fetch(
      //     `https://oauth.reddit.com/r/sanantonio/comments/${post.data.id}.json`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     }
      //   ).then(function (commentdata) {
      //     console.log(commentdata);
//         });
//       });
//     });
// }

newBtn.addEventListener("click", SortNewApi);
hotBtn.addEventListener("click", SortHotApi);
topBtn.addEventListener("click", SortTopApi);
historyBtn.addEventListener("click", history);