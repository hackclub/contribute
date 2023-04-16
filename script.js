window.addEventListener("DOMContentLoaded", (event) => {
  showLoader();

  let hash = window.location.hash;

  if (hash == "#force-no-repos") {
    // Force the "no repos" message to show
    showEmptyMessage();
  } else if (hash == "#force-loader") {
    Function.prototype(); // A no-op to keep the loader showing forever
  } else if (hash == "#force-error") {
    hideLoader();
    showErrorMessage();
  } else {
    loadAndRenderRepos();
  }


  function loadAndRenderRepos() {
    let url = "https://hackclub.com/api/contribute/";

    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return { then: function () { } }; // end the promise chain
        }
      })
      .then(function (resp) {
        hideLoader();
        let repos = resp.repositories.nodes;

        if (repos.length > 0) {
          const maxReposToShow = 20;
          let shownRepoCount = 0;
          for (let i = 0; (shownRepoCount < maxReposToShow) && i < repos.length; i++) {
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
              let formattedText = openIssuesCount == 1 ? " issue" : " issues";

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

              if (diffInDays == 0) { // less than 24 hours ago, so we'll be more precise
                if (diffInMS < 1000 * 60 * 60) { // 1 hour
                  let diffInMin = Math.floor(diffInMS / (1000 * 60));
                  if (diffInMin <= 5) {
                    dateText = "just now!";
                  } else {
                    dateText = diffInMin + " minutes ago";
                  }
                } else {
                  let diffInHr = Math.floor(diffInMS / (1000 * 60 * 60));
                  dateText = diffInHr + " hour" + (diffInHr == 1 ? "" : "s") + " ago";
                }
              } else {
                dateText = diffInDays + " day" + (diffInDays == 1 ? "" : "s") + " ago";
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
        showErrorMessage();
      });
  }

  function showEmptyMessage() {
    let noReposEl = document.querySelector("[data-tag='no-repos']");
    noReposEl.classList.remove("hidden");
  }

  function hideLoader() {
    let loaderEl = document.querySelector("[data-tag='loader']");
    loaderEl.classList.add("hidden");
  }

  function randomLoadMessage() {
    const loadMessages = [
      "Loading the list of repos...",
      "Reticulating repositories...",
      "Fetching the freshest repos...",
      "Getting the down-low on these downloads...",
      "Getting the low-down on these downloads...",
      "It's a contribution conspiracy!",
      "It's a contribution conglomerate!",
      "It's a contribution conga-line!",
      "It's a conga line of contributions!",
      "Contribution and retribution...",
      "Putting the 'repo' in 'repository'...",
      "Putting the 'con' in 'contribution'...",
      "Putting the 'rib' in 'contribution'...",
      "Putting the 'open' in 'open source software'...",
      "Putting the 'sour' in 'open source software'...",
      "Putting the 'soft' in 'open source software'...",
      "Putting the 'pen' in 'open source software'...",
      "Created by viewers like you...",
      "Repostravaganza!",
      "That's a lot of repos...",
      "Side-loading repos...",
      "Downloading repos, uploading repos, all-around-loading repos...",
      "Now for my next trick...",
      "Now for my next trick, I'll pull a repo from my hat!",
      "Was... THIS your card?",
      "Was... THIS your repo?",
      "Was... THIS your contribution?",
      "Pulling from the repo of life...",
      "Pulling from the repo of repos...",
      "Pulling from the repo of contributions...",
      "Loading code from the repos...",
      "Loading repos from the code...",
      "Repos loading from the code...",
      "Code loading from the repos...",
      "Code repo from the loading...",
      "Repos coding from the loading...",
      "Commit, push, repeat...",
      "Commit, rinse, repeat... wait?",
      "Communicating with the contribution code...",
      "Reuniting with the repos...",
      "Communing with the contributions...",
      "git commit -m 'Fix repo loading message'...",
      "git commit -m 'Faster repo list load times'...",
      "git commit -m 'More loading'...",
      "echo 'patience is a virtue...' | cowsay | lolcat",
      "Importing repo (1/185,627,198)...",
      "While you wait for this to load... twitter.com/thestrangelog",
    ];
    return loadMessages[Math.floor(Math.random() * loadMessages.length)];
  }

  function showLoader() {
    let loaderEl = document.querySelector(".loading-text");
    loaderEl.innerHTML = randomLoadMessage();
  }

  function showErrorMessage() {
    let errorEl = document.querySelector("[data-tag='error']");
    errorEl.classList.remove("hidden");
  }
});
