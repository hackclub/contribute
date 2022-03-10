window.addEventListener("DOMContentLoaded", (event) => {
  // let repos = [
  //   "hackclub/scrapbook",
  //   "hackclub/scrappy",
  //   "hackclub/gamelab",
  //   "hackclub/workshops",
  //   "jessicard/hacker-challenge",
  // ]
  // let url = "https://api.github.com/repos/jessicard/hacker-challenge/issues\?labels\=good%20first%20issue";
  let url = "https://api.github.com/users/hackclub/repos\?sort=pushed"

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(repos) {
      repos.forEach((repo) => {
        // let url = "https://api.github.com/repos/" + repo + "/issues";
        if (repo['has_issues']) {
          console.log(repo['name']);
          console.log(repo['open_issues_count']);
          console.log(repo['html_url']);
          console.log(repo['language']);
          console.log(repo['description']);
          console.log("Last pushed at: " + repo['pushed_at']);
          console.log('---------------------------');
        };
      })
    }).catch(function() {
      console.log("Booo");
    }
  );
});
