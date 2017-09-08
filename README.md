[![CircleCI](https://circleci.com/gh/18F/uswds-data.svg?style=svg)](https://circleci.com/gh/18F/uswds-data)

This is a data visualization guide for the [U.S. Web Design Standards][].

## Quick start

To get started, you'll need:

* Node 6
* [Yarn][]
* Chrome v60 or later
* [Hugo][]

To get started, run the following:

```
bash update.sh
yarn start
```

Then visit http://localhost:4000.

Whenever you update this repository, you will want to
re-run `bash update.sh`.

## Using Docker (optional)

Alternatively, you can use [Docker][], which doesn't involve installing
any extra dependencies.

If you are on Windows, you will also need `bash`, which you can probably
get most easily by installing [git for Windows][].

To get started, run:

```
bash docker-update.sh
docker-compose up
```

Then visit http://localhost:4000.

Whenever you update this repository, you will want to
re-run `bash docker-update.sh`.

If you want to run any commands within the container, such as
any commands specified elsewhere in this readme, you can do so
by prefixing the command with `docker-compose run app`. To enter
a shell that allows you to run any command without having to
prefix it, run `docker-compose run app bash`.

## Running tests

To run the tests, run `yarn test`.

## Adding pages for accessibility testing

The test suite runs [aXe][] on a subset of the site, to help ensure that
the site is accessible. To add to the list of pages that aXe is run on,
edit the `PAGES` array in `config/run-axe.js`.

[U.S. Web Design Standards]: https://standards.usa.gov/
[Docker]: https://www.docker.com/community-edition
[git for Windows]: https://git-for-windows.github.io/
[Yarn]: https://yarnpkg.com/en/
[aXe]: https://axe-core.org/
[Hugo]: https://gohugo.io/getting-started/installing/
