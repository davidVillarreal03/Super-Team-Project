const testBtn = document.querySelector("#testBtn");

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
      // console.log(data);
      const newResultsElement = document.getElementById("newResults");

      data.data.children.forEach((post) => {
        const selftext = post.data.selftext;
        const postElement = document.createElement("p");
        postElement.textContent = selftext + "\n";
        newResultsElement.appendChild(postElement);

        fetch(
          `https://oauth.reddit.com/r/sanantonio/comments/${post.data.id}.json`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).then(function (commentdata) {
          // const newCommentsElement = document.getElementById("newComments");

          // commentElement.textContent =
          // newCommentsElement.appendChild(commentElement)
          console.log(commentdata);
        });
      });
    });
}

testBtn.addEventListener("click", SortNewApi);
