const redditaccessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE5NjE4NTc5LjYwMTcyNywiaWF0IjoxNzE5NTMyMTc5LjYwMTcyNywianRpIjoiMGhfaVNQU0lLaW1MejR6NVd1a253NXUwTk0yaXdBIiwiY2lkIjoiaTFxcGhGc2ZhLXZOMTFMZWJjTDhJdyIsImxpZCI6InQyXzEzOTJ5bHlhMTYiLCJhaWQiOiJ0Ml8xMzkyeWx5YTE2IiwibGNhIjoxNzE5MzU1MjIwOTE2LCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyIsImZsbyI6OX0.a9BnrisZF4BsaT_sDnaFSEw1Z1GAu1DpRq1bCjrPQGUUUuoOvQQwdj-Te006PWVjLUH3_s4frKVuRs4-SEpW94su39-yFfSSHOjAxoplkr6tOuzHs_HgVQjrPY2jKIlLcx1su7YfiF_VB3IUs3BSTiZpluUd1Mfbc6lQfS6O9B4v8i6zOoXkl4erfwOABsGKLfjeeF4uvwf2HUemJY_YDGGRqfAqevwEgaoCNNH8SpRYaQQulyg4mUqQZyKo6dfdMvwrXsGBzbJRfWR518O-dPOMumDUBPp8uN1EPeA4SX7J4LNnWm0Nnk0Ily8guoqSnLWr-5a1HV3xgsf7GEn9zw";

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
  let url = `https://oauth.reddit.com/r/sanantonio/${sort}.json?limit=100`;
  if (flairText) {
    url = `https://oauth.reddit.com/r/sanantonio/search.json?q=flair_name:"${flairText}"&sort=${sort}&limit=100`;
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
        const { title, link_flair_text, permalink, num_comments } = post.data;

        if (!flairText || link_flair_text === flairText) {
          count++;
          const postContainer = document.createElement("div");
          const titleElement = document.createElement("h1");
          const link_flairElement = document.createElement("h2");
          const permalinkElement = document.createElement("h3");
          const num_commentsElement = document.createElement("h4");

          titleElement.textContent = title;
          link_flairElement.textContent = link_flair_text;
          permalinkElement.textContent = permalink;
          num_commentsElement.textContent = `Comments: ${num_comments}`;

          const detailsElement = document.createElement("details");
          const summaryElement = document.createElement("summary");
          summaryElement.textContent = `Comments: ${num_comments}`;

          detailsElement.appendChild(summaryElement);
          postContainer.appendChild(titleElement);
          postContainer.appendChild(link_flairElement);
          postContainer.appendChild(permalinkElement);
          postContainer.appendChild(detailsElement);

          ResultsElement.appendChild(postContainer);

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

      let commentCount = 0;
      commentdata[1].data.children.forEach((comment) => {
        if (commentCount >= 15) return;

        const { author, body } = comment.data;

        const CommentContainer = document.createElement("div");
        const authorElement = document.createElement("h1");
        const bodyElement = document.createElement("h2");

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
