const hotBtn = document.querySelector("#hot");
const topBtn = document.querySelector("#top");
const newBtn = document.querySelector("#new");

const accessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzE5NDQ1MjYyLjAyNjMzLCJpYXQiOjE3MTkzNTg4NjIuMDI2MzMsImp0aSI6IjgxaXdHVzljbVIzaWpXTkhxNGNPNWc5VEZEc2lmZyIsImNpZCI6ImkxcXBoRnNmYS12TjExTGViY0w4SXciLCJsaWQiOiJ0Ml8xMzkyeWx5YTE2IiwiYWlkIjoidDJfMTM5MnlseWExNiIsImxjYSI6MTcxOTM1NTIyMDkxNiwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.lMYYGf54YgB3y8xiM7ok9yqoFwZwQRYlMucbPwrGoaUmum5YwK5IAvNqzqSuKk8jvcmDsZ3BLxPv-By2f2fuX088rtQTF2nisn4qDFb14iHhfSuflkw1ZVaOnCe48x3RTDN4C2GLO1PGD5_sp-maEpD0_twnULM5XsGUvIfP7YCsEI9rcyaLfgpaBMGWty2aq9khlkoCgktf5sDM_v4aQuoEyD_cr9vP9b4Srbfnx6U1TLxxA4dGIIq439tgrqzthdk71wtOIQfTCDPWARQHJrWVLEHUXPB-77yoXSfBo8qLTPVEz3ECgMbWJdb4g4mCRVOS6_uQM0u9_0BOoUt9mA";
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
      const ResultsElement = document.getElementById("Results");
      console.log(data);

      data.data.children.forEach((post) => {
        const title = post.data.title;
        const link_flair = post.data.link_flair_text;
        const permalink = post.data.permalink;
        const num_comments = post.data.num_comments;

        const postContainer = document.createElement("div");

        const titleElement = document.createElement("h1");
        const link_flairElement = document.createElement("h2");
        const permalinkElement = document.createElement("h2");
        const num_commentsElement = document.createElement("h2");

        titleElement.textContent = title;
        link_flairElement.textContent = link_flair;
        permalinkElement.textContent = permalink;
        num_commentsElement.textContent = num_comments;

        postContainer.appendChild(titleElement);
        postContainer.appendChild(link_flairElement);
        postContainer.appendChild(permalinkElement);
        postContainer.appendChild(num_commentsElement);

        ResultsElement.appendChild(postContainer);

        fetch(`https://oauth.reddit.com${permalink}.json`, {
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
          .then(function (commentdata) {
            console.log(commentdata);
          })
          .catch(function (error) {
            console.error("Error fetching comments:", error);
          });
      });
    })
    .catch(function (error) {
      console.error("Error fetching posts:", error);
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
      const ResultsElement = document.getElementById("Results");
      console.log(data);

      data.data.children.forEach((post) => {
        const title = post.data.title;
        const link_flair = post.data.link_flair_text;
        const permalink = post.data.permalink;
        const num_comments = post.data.num_comments;

        const postContainer = document.createElement("div");

        const titleElement = document.createElement("h1");
        const link_flairElement = document.createElement("h2");
        const permalinkElement = document.createElement("h2");
        const num_commentsElement = document.createElement("h2");

        titleElement.textContent = title;
        link_flairElement.textContent = link_flair;
        permalinkElement.textContent = permalink;
        num_commentsElement.textContent = num_comments;

        postContainer.appendChild(titleElement);
        postContainer.appendChild(link_flairElement);
        postContainer.appendChild(permalinkElement);
        postContainer.appendChild(num_commentsElement);

        ResultsElement.appendChild(postContainer);

        fetch(`https://oauth.reddit.com${permalink}.json`, {
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
          .then(function (commentdata) {
            console.log(commentdata);
          })
          .catch(function (error) {
            console.error("Error fetching comments:", error);
          });
      });
    })
    .catch(function (error) {
      console.error("Error fetching posts:", error);
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
      const ResultsElement = document.getElementById("Results");
      console.log(data);

      data.data.children.forEach((post) => {
        const title = post.data.title;
        const link_flair = post.data.link_flair_text;
        const permalink = post.data.permalink;
        const num_comments = post.data.num_comments;

        const postContainer = document.createElement("div");

        const titleElement = document.createElement("h1");
        const link_flairElement = document.createElement("h2");
        const permalinkElement = document.createElement("h2");
        const num_commentsElement = document.createElement("h2");

        titleElement.textContent = title;
        link_flairElement.textContent = link_flair;
        permalinkElement.textContent = permalink;
        num_commentsElement.textContent = num_comments;

        postContainer.appendChild(titleElement);
        postContainer.appendChild(link_flairElement);
        postContainer.appendChild(permalinkElement);
        postContainer.appendChild(num_commentsElement);

        ResultsElement.appendChild(postContainer);

        fetch(`https://oauth.reddit.com${permalink}.json`, {
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
          .then(function (commentdata) {
            console.log(commentdata);
          })
          .catch(function (error) {
            console.error("Error fetching comments:", error);
          });
      });
    })
    .catch(function (error) {
      console.error("Error fetching posts:", error);
    });
}

newBtn.addEventListener("click", SortNewApi);
hotBtn.addEventListener("click", SortHotApi);
topBtn.addEventListener("click", SortTopApi);
