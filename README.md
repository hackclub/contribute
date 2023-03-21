# Contribute to Hack Club

Hack Club is a nonprofit network of high school coding clubs and makers around the world. The Hack Club community has over 250 open source repositories, many of which are being actively developed every day. What makes these repositories open source is that they are editable by the public, which encourages you, the Hack Club community, to come together and work on code socially. Contributions can be made in many ways, like tracking bugs and features by opening a GitHub issue, editing code by creating a GitHub pull request, and reviewing pull requests made by others. We welcome and encourage your contributions, and we look forward to seeing the things you create!

## How it works

This page uses GitHub's unauthenticated API to pull down public repositories from an organization. We use JavaScript to clone an example element and use that to populate the repository elements on the page.

## Contributing

Contributions are encouraged and welcome! Feel free to submit a pull request with code changes, or open issues for suggestions or bug reports.

Development chatter happens in the [#hackclub-site-dev](https://app.slack.com/client/T0266FRGM/C036BTDGP43) channel in the [Hack Club Slack](https://hackclub.com/slack/).

## Running Locally

1. Clone this repository
   - `git clone https://github.com/hackclub/contribute.git && cd contribute`
1. Start server
   - `python -m SimpleHTTPServer`
1. View your server
   - `open http://localhost:8000/`

## Debugging Tools

There are some special URL fragments you can add to test things:

* `#force-no-repos` will force the "no repositories with open issues" message to show
* `#force-loader` will force the loader to show infinitely
* `#force-error` will force the error message to show