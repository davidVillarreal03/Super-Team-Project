const hotBtn = document.querySelector("#hot");
const topBtn = document.querySelector("#top");
const newBtn = document.querySelector("#new");

const accessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE5MzQ2NTkzLjYxNTM5LCJpYXQiOjE3MTkyNjAxOTMuNjE1MzksImp0aSI6InZBNzhrVHo1bnQ5dHpvRlFGZm5fZXZUT0lGOVI2dyIsImNpZCI6IkJHcU5SbGNlNjNmb3NrSi1PQVkwckEiLCJsaWQiOiJ0Ml8xMnMxMHlmMzljIiwiYWlkIjoidDJfMTJzMTB5ZjM5YyIsImxjYSI6MTcxODc1NzgyNjU0OSwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.RBRpCE9UHAZvhCouGAd23jinCOhJF2cmttEFTUShcpCPp8zORLXS0cSSo13a4med3IX7odtidYYNLJ5tUwpycE17C6I2gB6nqtz2X9nb_NvT_ad1ZZ0vcl1CdhtKn-L-tnQ8w_IQWNRB1zrjlZhw56ZoEFWigUMtktGADoXK_PWLnJ13P1eDzhndvKDzjlA24T75b7o7gK-SASA1G8boJXy0lntzFozXg-x5dSjGyhfHC_gin2wa0JXCgaOpXVd79E8ETDUdVIUiJINd8nLBpkfCcqk8Xgc-XISuSFmkRpOF8OaJRpSxFak2efJp29L-n7eUiP4NzFvRTYqQUz9Q_Q";
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
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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