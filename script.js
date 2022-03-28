window.addEventListener("DOMContentLoaded", (event) => {
  let url = "https://hackclub.com/api/contribute/";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      let repos = resp.repositories.nodes;

      if (repos.length > 0) {
        const maxReposToShow = 20;
        let shownRepoCount = 0;
        for (let i = 0; shownRepoCount < maxReposToShow; i++) {
          // Open issue count
          let openIssuesCount = repos[i].issues.totalCount;
          if (openIssuesCount > 0) {
            shownRepoCount++;
            let reposListEl = document.querySelector("[data-tag='repos'] ul");
            let exampleEl = document.querySelector("[data-tag='example-repo']");

            let repoEl = exampleEl.cloneNode(true);
            repoEl.classList.remove("hidden");

            repoEl.querySelector("[data-tag='repo-link']").href =
              repos[i].url;

            // Format open issues language
            let formattedText =
              openIssuesCount == 1 ? " issue" : " issues";

            repoEl.querySelector("[data-tag='issues-count']").innerText =
              openIssuesCount + formattedText;

            // Name
            repoEl.querySelector("[data-tag='name']").innerText = repos[i].name;

            // Description
            repoEl.querySelector("[data-tag='description']").innerText =
              repos[i].description;

            // Language
            // Can occasionally be null
            languageEl = repoEl.querySelector("[data-tag='language']");
            if (repos[i].languages.nodes.length > 0) {
              languageEl.innerText = repos[i].languages.nodes[0].name;
            } else {
              languageEl.classList.add("hidden");
            }

            // Pushed at date
            let currentDate = new Date();
            let pushedAtDate = new Date(repos[i].pushedAt);

            let diffInMS = currentDate.getTime() - pushedAtDate.getTime();
            let diffInDays = Math.floor(diffInMS / (1000 * 3600 * 24));

            let dateText;

            if (diffInDays < 1) {
              dateText = "today";
            } else if (diffInDays == 1) {
              dateText = diffInDays + " day ago";
            } else if (diffInDays >= 2) {
              dateText = diffInDays + " days ago";
            }

            repoEl.querySelector("[data-tag='last-push']").innerText =
              "Last updated " + dateText;

            reposListEl.appendChild(repoEl);
          }
        }
      } else {
        showEmptyMessage();
      }
    })
    .catch(function (err) {
      console.log("Fetching " + url + " failed");
      console.log("Error: " + err);
    });

  function showEmptyMessage() {
    let noReposEl = document.querySelector("[data-tag='no-repos']");
    noReposEl.classList.remove("hidden");
  }
});
