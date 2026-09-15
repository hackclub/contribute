window.addEventListener("DOMContentLoaded", (event) => {
  const REPO_URL = "https://api.github.com/orgs/hackclub/repos?sort=updated&direction=desc&per_page=100";
  const ORG_URL = "https://api.github.com/orgs/hackclub";
  const MAX_REPOS_TO_SHOW = 10;
  const excludedRepos = [];

  showLoader();

  const hash = window.location.hash;

  if (hash === "#force-no-repos") {
    // Force the "no repos" message to show
    hideLoader();
    showEmptyMessage();
  } else if (hash === "#force-loader") {
    Function.prototype(); // A no-op to keep the loader showing forever
  } else if (hash === "#force-error") {
    hideLoader();
    showErrorMessage();
  } else {
    loadAndRenderRepos();
  }

  updateRepositoryCount();

  async function loadAndRenderRepos() {
    try {
      const response = await fetch(REPO_URL);

      if (!response.ok) {
        throw new Error(`Github returned ${response.status}`);
      }

      const repos = await response.json();

      if (!Array.isArray(repos)) {
        throw new Error("github returned an invalid repository response");
      }

      const reposToShow = repos
        .filter(
          (repo) =>
            !repo.archived &&
            !repo.disabled &&
            !repo.fork &&
            !excludedRepos.includes(repo.name) &&
            repo.open_issues_count > 0
        )
        .slice(0, MAX_REPOS_TO_SHOW);

      hideLoader();

      if (reposToShow.length === 0) {
        showEmptyMessage();
        return;
      }

      const reposListEl = document.querySelector("[data-tag='repos'] ul");
      const exampleEl = document.querySelector("[data-tag='example-repo']");
      const fragment = document.createDocumentFragment();

      for (const repo of reposToShow) {
        const repoEl = exampleEl.cloneNode(true);
        repoEl.classList.remove("hidden");
        repoEl.removeAttribute("data-tag");
        repoEl.querySelector("[data-tag='repo-link']").href = repo.html_url;

        const count = repo.open_issues_count === 1 ? "issue or pull request" : "issues or pull requests";
        repoEl.querySelector("[data-tag='issues-count']").textContent = `${repo.open_issues_count} open ${count}`;

        repoEl.querySelector("[data-tag='name']").textContent = repo.name;

        const descriptionEl = repoEl.querySelector("[data-tag='description']");
        descriptionEl.textContent = repo.description || "No description provided";
        if (!repo.description) {
          descriptionEl.classList.add("missing-description");
        }

        const languageEl = repoEl.querySelector("[data-tag='language']");
        if (repo.language) {
          languageEl.textContent = repo.language;
        } else {
          languageEl.classList.add("hidden");
        }

        const lastPush = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium"
        }).format(new Date(repo.pushed_at));
        repoEl.querySelector("[data-tag='last-push']").textContent =
          `Last push: ${lastPush}`;

        fragment.append(repoEl);
      }

      reposListEl.append(fragment);
    } catch (error) {
      hideLoader();
      showErrorMessage();
      console.error("Fetching repositories failed", error);
    }
  }

  function showEmptyMessage() {
    document.querySelector("[data-tag='no-repos']").classList.remove("hidden");
  }

  function hideLoader() {
    document.querySelector("[data-tag='loader']").classList.add("hidden");
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
      "Where might be the repositories..."
    ];
    return loadMessages[Math.floor(Math.random() * loadMessages.length)];
  }

  function showLoader() {
    document.querySelector(".loading-text").textContent = randomLoadMessage();
  }

  function showErrorMessage(err) {
    document.querySelector("[data-tag='error']").classList.remove("hidden");
  }

  async function updateRepositoryCount() {
    try {
      const response = await fetch(ORG_URL);

      if (!response.ok) {
        throw new Error(`Github returned ${response.status}`);
      }

      const organization = await response.json();
      const counter = document.getElementById("repository-count");
      const overText = document.getElementById("over");

      if (Number.isInteger(organization.public_repos)) {
        counter.textContent = organization.public_repos;
        overText?.remove();
      }
    } catch (error) {
      console.warn("Fetching repository count failed; using fallback", error);
    }
  }
});
