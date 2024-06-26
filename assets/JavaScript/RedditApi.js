const redditaccessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE5OTQ4MzE4LjMxOTY0NCwiaWF0IjoxNzE5ODYxOTE4LjMxOTY0NCwianRpIjoiNkFZcDBsZWhfMUw2LXhpdU5XV19Lb1R0dzRtdURRIiwiY2lkIjoiaTFxcGhGc2ZhLXZOMTFMZWJjTDhJdyIsImxpZCI6InQyXzEzOTJ5bHlhMTYiLCJhaWQiOiJ0Ml8xMzkyeWx5YTE2IiwibGNhIjoxNzE5MzU1MjIwOTE2LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.TiHMGgNYBKHO2_5G6BJmAw7MvV6s4CPrazabPihaNQ2Hs-SX4V7oWFAp_6iJv2mjFK1Rn57jtei6gMkiH5uMMUHdkcn_eIJLgOO0ceInprG4j_SJIcQQRWy4VIOCX-49SAojWWhTFIu0r31aLM_A7HyI_jaOKvy8IBdEWrwm-nTnZ2DZ1pZ-PobdAQtdo_34OsCJ0eL55N8MbZ15u62I2f0oyT4pzs3bLGBeTDP95HHZz9PM55gtFc09eYyXf3Jh-exI3ZpcDAuT35N9npXdeCduS97tbxtpfE2ga2WdXWF_25f5f7v-bdZI4LNU7tQprDbGxqrJygMigQFQPyjP0A";

const ResultsElement = document.getElementById("Results");
const CommentResultsElement = document.getElementById("CommentResults");

function clearResults() {
  while (ResultsElement.firstChild) {
    ResultsElement.removeChild(ResultsElement.firstChild);
  }
  while (CommentResultsElement.firstChild) {
    CommentResultsElement.removeChild(CommentResultsElement.firstChild);
  }
}

function fetchPosts(sort, flairText) {
  clearResults();
  let url = `https://oauth.reddit.com/r/sanantonio/${sort}.json?limit=50`;
  if (flairText) {
    url = `https://oauth.reddit.com/r/sanantonio/search.json?q=flair_name:"${flairText}"&sort=${sort}&limit=50`;
  }
  fetch(url, {
    headers: {
      Authorization: `Bearer ${redditaccessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let count = 0;
      data.data.children.forEach((post) => {
        if (count >= 10) return;
        const { title, selftext, link_flair_text, permalink, num_comments } =
          post.data;

        if (!flairText || link_flair_text === flairText) {
          count++;
          const postContainer = document.createElement("div");
          postContainer.className = "post-container";

          const titleElement = document.createElement("h1");
          titleElement.className = "post-title";
          titleElement.textContent = title;
          postContainer.appendChild(titleElement);

          if (selftext) {
            console.log("selftext:", selftext);
            const selftextElement = document.createElement("h1");
            selftextElement.className = "post-text";
            selftextElement.textContent = selftext;
            postContainer.appendChild(selftextElement);
          } else {
            console.log("selftext is empty or undefined for post:", post);
          }

          const link_flairElement = document.createElement("h2");
          link_flairElement.className = "post-flair";
          link_flairElement.textContent = link_flair_text;
          postContainer.appendChild(link_flairElement);

          const permalinkElement = document.createElement("h3");
          permalinkElement.className = "post-link";
          permalinkElement.textContent = permalink;
          postContainer.appendChild(permalinkElement);

          const detailsElement = document.createElement("details");
          detailsElement.className = "post-details";
          const summaryElement = document.createElement("summary");
          summaryElement.className = "post-summary details-summary";
          summaryElement.innerHTML = `Comments: ${num_comments}`;
          detailsElement.appendChild(summaryElement);
          postContainer.appendChild(detailsElement);

          ResultsElement.appendChild(postContainer);

          detailsElement.addEventListener("toggle", (event) => {
            if (event.target.open) {
              summaryElement.classList.add("open");
            } else {
              summaryElement.classList.remove("open");
            }
          });

          fetchComments(permalink, detailsElement);
        }
      });
    })
    .catch((error) => {
      console.error(`Error fetching ${sort} posts:`, error);
    });
}

function fetchComments(permalink, detailsElement) {
  fetch(`https://oauth.reddit.com${permalink}.json`, {
    headers: {
      Authorization: `Bearer ${redditaccessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((commentdata) => {
      console.log(commentdata);
      const commentsContainer = document.createElement("div");
      commentsContainer.className = "comments-container";

      let commentCount = 0;
      commentdata[1].data.children.forEach((comment) => {
        if (commentCount >= 15) return;

        const { author, body } = comment.data;

        const CommentContainer = document.createElement("div");
        CommentContainer.className = "comment-container";
        const authorElement = document.createElement("h1");
        authorElement.className = "comment-author";
        const bodyElement = document.createElement("h2");
        bodyElement.className = "comment-body";

        authorElement.textContent = author;
        bodyElement.textContent = body;

        CommentContainer.appendChild(authorElement);
        CommentContainer.appendChild(bodyElement);

        commentsContainer.appendChild(CommentContainer);
        commentCount++;
      });

      detailsElement.appendChild(commentsContainer);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
}

const topBtn = document.querySelector("#top");
const newBtn = document.querySelector("#new");
const hotBtn = document.querySelector("#hot");
const foodBtn = document.querySelector("#food");
const whereBtn = document.querySelector("#where");
const visitingBtn = document.querySelector("#visiting");

topBtn.addEventListener("click", () => fetchPosts("top", ""));
newBtn.addEventListener("click", () => fetchPosts("new", ""));
hotBtn.addEventListener("click", () => fetchPosts("hot", ""));
foodBtn.addEventListener("click", () => fetchPosts("top", "Food/Drink"));
whereBtn.addEventListener("click", () => fetchPosts("top", "Where in SA?"));
visitingBtn.addEventListener("click", () => fetchPosts("top", "Visiting SA"));
