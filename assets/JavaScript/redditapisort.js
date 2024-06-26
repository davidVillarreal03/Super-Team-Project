const testBtn = document.querySelector("#testBtn");


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
      const newResultsElement = document.getElementById("newResults");

      data.data.children.forEach((post) => {
        const selftext = post.data.selftext;
        const postElement = document.createElement("p");
        postElement.textContent = selftext + "\n";
        newResultsElement.appendChild(postElement);
        console.log(data);
        fetch(
          `https://oauth.reddit.com/r/sanantonio/comments/${post.data.id}.json`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(function (commentdata) {
            // const newCommentsElement = document.getElementById("newComments");

            // commentElement.textContent =
            // newCommentsElement.appendChild(commentElement)
            data.data.children.forEach(
              (commentpost) =>
                function (i, item) {
                  var comment = item.data.body;
                  var author = item.data.author;
                  var postcomment =
                    "<p>[Author]" + author + "<br>" + comment + "</p>";
                  results.append(postcomment);
                }
            );
            console.log(commentdata);
          });
      });
    });
}

testBtn.addEventListener("click", SortNewApi);
