Run skill shape: full-text. This repository documents no launch procedure, so the steps below hold the whole of it and cite the file each one derives from.

## Prerequisites

This is a Jekyll static site built with the `github-pages` gem, which pins Jekyll 3.9.3 (`Gemfile`, `Gemfile.lock`). There is no database, no container, and no backend service.

- **Ruby 3.2.6.** The CI workflow pins this version and no `.ruby-version` file exists, so match it locally (`.github/workflows/pages.yml`). Check with `ruby -v`.
- **Bundler.** `Gemfile.lock` was produced with Bundler 2.5.23 (`BUNDLED WITH` in `Gemfile.lock`). Check with `bundle -v`.
- **Network access to rubygems.org**, to install gems (`Gemfile`).
- **A C toolchain** may be needed if a gem with native extensions has no prebuilt version for your platform. The repository does not say which gems need one (see Human steps).

Platform notes the repository does state:
- `webrick` is in the `Gemfile` because Ruby 3.x no longer bundles it. The `Gemfile` comment says this fix comes from GitHub's "Testing your GitHub Pages site locally with Jekyll" guide.
- On Windows the `Gemfile` conditionally adds `tzinfo`, `tzinfo-data` and `wdm`. These are installed automatically on that platform and need no manual action (`Gemfile`).

## One-time setup

Run from the repository root (the directory containing `Gemfile`).

1. Install the gems:
   ```
   bundle install
   ```
   (`Gemfile`, `Gemfile.lock`)
2. Check whether `Gemfile.lock` changed. The `Gemfile` no longer lists `minima`, but the committed `Gemfile.lock` still lists `minima (~> 2.0)` under `DEPENDENCIES`. `bundle install` will probably remove that line from the lockfile. This is a harmless working-tree change, but do not commit it unless the task is about dependencies (`Gemfile`, `Gemfile.lock`, `_config.yml` sets `theme: null`).

No other setup is needed. The repository has no seed data, environment files, or generated assets. Site content comes from the Markdown and HTML pages at the root and from `_data/`, `_includes/`, `_layouts/`, `_sass/` and `assets/`. `_site/` is the build output directory and is git-ignored (`.gitignore`).

## Launch

Run from the repository root.

Development server, which blocks and rebuilds on file changes:
```
bundle exec jekyll serve
```
(`Gemfile` header comment, which documents this exact command)

One-off production-style build, which exits when done and writes to `_site/`. This mirrors CI (`.github/workflows/pages.yml`):
```
JEKYLL_ENV=production bundle exec jekyll build
```
The CI workflow also passes `--baseurl "<pages base_path>"`. For a local build, `baseurl: "/"` in `_config.yml` is already correct, so omit the flag.

`_config.yml` is not reloaded while `jekyll serve` runs (its own header comment says so). Stop and restart the server after editing it. Changes to pages, includes, layouts, data files and Sass are picked up automatically.

## How to know it is up

- With `jekyll serve`, the terminal prints a `Server address: http://...` line and then `Server running... press ctrl-c to stop`. Use the address printed on that line, because the repository does not configure a port.
- An HTTP request to that address returns 200 with the homepage HTML.
- Pages and URLs to check: `/` (`index.md`), `/sessions.html`, `/speakers/`, `/sponsors/`.
- With `jekyll build`, success is the process exiting 0 and `_site/index.html` existing.
- A broken build prints a Liquid or Sass error and exits non-zero. In `serve`, the error is printed and the last good build keeps being served.

## Address or entry point

Open the address from the `Server address:` line in a browser. The site root is `/` because `baseurl: "/"` (`_config.yml`). Pages come from the root-level `.md` and `.html` files, such as `index.md`, `sessions.html`, `speakers.md`, `sponsors.md`, `location.md`, `schedule-redirect.html` and `404.html`.

The production URL is `https://orlandocodecamp.com` (`_config.yml`, `CNAME`). It deploys from GitHub Actions to GitHub Pages (`.github/workflows/pages.yml`) and cannot be reproduced locally.

There is no test suite or lint configuration in the repository. Verification is building the site and viewing the pages.

## Human steps

- **Ruby installation.** The repository names no version manager and has no `.ruby-version` or `.tool-versions`. Whoever sets up the machine must install Ruby 3.2.6 by whatever means they use (rbenv, asdf, Homebrew, or similar). The repository does not say which.
- **Native-extension build tools.** The repository does not say whether `bundle install` needs a compiler or system libraries on your platform. If it fails, read the error and install what it names. This was not confirmed because nothing was installed or run in this read-only discovery.
- **Local port.** No port is configured in the repository. Jekyll chooses one and prints it at startup. If a specific port is wanted, or the default is taken, the reader must pass it as a `jekyll serve` option. This document does not name one.
- **Live-site content.** `README.md` says the event is "April 11th, 2026" and that the schedule and attendee sign-up are still to come. Sessions, speakers and sponsors are probably driven by files in `_data/`, but I did not trace the content flow. Anyone who needs fresh external data (registration, the schedule, Eventbrite links) must obtain it from the event organizers. Nothing in the repository fetches it at build time.
- **GitHub Pages deployment.** Deploying needs repository admin and Pages settings access on the `Orlando-Codecamp/orlandocodecamp.github.io` GitHub repository. This is outside local launch, and I did not verify that the account has it.