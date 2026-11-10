Run skill shape: full-text. This repository documents no launch procedure, so the steps below hold the whole of it and cite the file each one derives from.

## Prerequisites

This is a Jekyll static site built with the `github-pages` gem. There is no database, container or service to start.

- **Ruby 3.2.6.** CI pins this version (`.github/workflows/pages.yml`). No `.ruby-version` or `.tool-versions` file exists. Check with `ruby -v`.
- **Bundler 2.5.23.** `Gemfile.lock` records this as `BUNDLED WITH` (`Gemfile.lock`). Check with `bundle -v`. Any bundler that accepts the lockfile should work.
- **Network access to rubygems.org** for the gem install (`Gemfile`).
- **Git.** The repository is used as a normal checkout.

## One-time setup

Run these from the repository root, the directory that holds `Gemfile`.

1. Install the gems:
   ```
   bundle install
   ```
   This pulls `github-pages ~> 228` (Jekyll 3.9.3 in the lockfile), `jekyll-feed`, and `webrick ~> 1.8`. `webrick` is needed because Ruby 3 no longer bundles it (`Gemfile`, `Gemfile.lock`).
2. On Windows, `tzinfo`, `tzinfo-data` and `wdm` are installed only on Windows platforms (`Gemfile`). No extra step is needed on macOS or Linux.
3. No environment variables, secrets or seed data are needed. All site content is in `_data/`, the `.md` and `.html` pages, `_includes/`, `_layouts/` and `_sass/`. The plugins `jekyll-redirect-from` and `jekyll-seo-tag` are configured in `_config.yml`.

Known wrinkle: `Gemfile.lock` lists `minima (~> 2.0)` under DEPENDENCIES, but `Gemfile` no longer declares it. The `Gemfile` comment says the minima theme gem was removed. If `bundle install` complains that the lockfile and Gemfile disagree, run `bundle install` without a frozen or deployment setting so Bundler can re-resolve. This is the likely cause and I could not confirm it. CI uses `bundler-cache: true` (`.github/workflows/pages.yml`).

## Launch

Run from the repository root.

- **Local dev server, blocking:**
  ```
  bundle exec jekyll serve
  ```
  This is the command the `Gemfile` header comment names. It runs in the foreground until stopped. `_config.yml` is not reloaded while it runs, so restart the server after editing it (`_config.yml`).
- **One-shot build, not a server:**
  ```
  bundle exec jekyll build
  ```
  This writes the site to `_site/`, which is gitignored (`.gitignore`). The project's registered build command is this same one.
- **Production-style build, as CI does it:**
  ```
  JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
  ```
  CI passes the `--baseurl` value from `actions/configure-pages`. The empty string here is an assumption for a user site; `_config.yml` sets `baseurl: "/"` (`.github/workflows/pages.yml`, `_config.yml`).

## How to know it is up

- **For `jekyll build`:** the command exits with status 0, and `_site/index.html` exists afterwards. Jekyll's output ends with a "done in N seconds" line. The build printing no error lines is the success signal.
- **For `jekyll serve`:** Jekyll prints the address it is serving on (as `Server address: http://…`) followed by `Server running... press ctrl-c to stop`. Requesting that address returns the home page. Read the address and port from that line, because neither is set in the repository.

## Address or entry point

- **`jekyll serve`:** open the `Server address` URL it prints. Jekyll's own default port applies, since `_config.yml` has no `port` or `host` setting. Pages worth checking are `/`, `/speakers`, `/sessions`, `/schedule-redirect` and `/sponsors`. They come from `index.md`, `speakers.md`, `sessions.html`, `schedule-redirect.html` and `sponsors.md`.
- **Production site:** `https://orlandocodecamp.com`. This is `url` in `_config.yml`, and `CNAME` is present. CI deploys to GitHub Pages on push to the default branch.
- **`jekyll build` only:** the entry point is the generated `_site/` directory.

## Human steps

- **Ruby 3.2.6 install.** If the machine does not have it, the reader must install it with their own version manager. The repository ships no `.ruby-version`, so nothing selects the version automatically.
- **Local port and address.** No port is configured in the repository. If the printed address is unreachable or the port is taken, the reader must pass their own `--port` or `--host` flag to `jekyll serve`. I did not confirm a default value.
- **Lockfile disagreement.** The `minima` mismatch above is the one thing that may need a human decision. The reader may need to run `bundle install` unfrozen and commit the updated `Gemfile.lock`, or leave it alone.
- **Deployment.** The GitHub Pages deployment needs repository admin rights, a Pages environment and `GITHUB_TOKEN` permissions. I did not confirm any of these. Nothing in local development depends on them.