window.addEventListener("DOMContentLoaded", (event) => {
  let url = "https://api.github.com/users/hackclub/repos\?sort=pushed"

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(repos) {
      if (repos.length > 0) {
        repos.forEach((repo) => {
          let openIssuesCount = repo["open_issues_count"];
          if (openIssuesCount > 0) {
            let reposListEl = document.querySelector("[data-tag='repos'] ul");
            let exampleEl = document.querySelector("[data-tag='example-repo']");

            let repoEl = exampleEl.cloneNode(true);
            repoEl.classList.remove("hidden");

            repoEl.querySelector("[data-tag='repo-link']")
              .href = repo["html_url"];
            repoEl.querySelector("[data-tag='name']")
              .innerText = repo["name"];
            repoEl.querySelector("[data-tag='issues-count']")
              .innerText = openIssuesCount;
            repoEl.querySelector("[data-tag='description']")
              .innerText = repo["description"];
            repoEl.querySelector("[data-tag='last-push']")
              .innerText = repo["pushed_at"];

            // Languages can occasionally be null
            languageEl = repoEl.querySelector("[data-tag='language']");
            if (repo["language"]) {
              languageEl.innerText = repo["language"];
            } else {
              languageEl.classList.add("hidden");
            }

            reposListEl.appendChild(repoEl);
          }
        })
      } else {
        showEmptyMessage();
      }
    }).catch(function(err) {
      console.log("Fetching " + url + " failed");
      console.log("Error: " + err);
    }
  );

  function showEmptyMessage() {
    let noReposEl = document.querySelector("[data-tag='no-repos']");
    noReposEl.classList.remove("hidden");
  }
});
