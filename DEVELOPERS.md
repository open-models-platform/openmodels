# Developing OpenModels

1. [Getting started](#getting-started)
   - [Install dependencies](#install-dependencies)
2. [Local development](#local-development)
   - [Fork the repo](#fork-the-repo)
   - [Clone the repo](#clone-the-repo)
   - [Running turborepo](#running-turborepo)
     - [Shared components](#shared-components)
     - [Installing packages](#installing-packages)
   - [New OpenModels docs](#new-openmodels-docs)
3. [Create a pull request](#create-a-pull-request)

- [Common tasks](#common-tasks)
  - [Add a redirect](#add-a-redirect)
- [Community channels](#community-channels)

## Getting started

Thank you for your interest in [OpenModels](https://open-models-platform.com) and your willingness to contribute!

To ensure a positive and inclusive environment, please read our [code of conduct](https://github.com/open-models-platform/.github/blob/main/CODE_OF_CONDUCT.md). We encourage you to explore the existing [issues](https://github.com/open-models-platform/openmodels/issues) to see how you can make a meaningful impact. This document will help you setup your development environment.

### Install dependencies

You will need to install and configure the following dependencies on your machine to build [OpenModels](https://open-models-platform.com):

- [Git](http://git-scm.com/)
- [Node.js v18.x (LTS)](http://nodejs.org)
- [npm](https://www.npmjs.com/) version 9.x.x
- [Docker](https://docs.docker.com/get-docker/) (to run studio locally)

## Local development

This repo uses [Turborepo](https://turborepo.org/docs).

All of our apps are in this [Turborepo](https://turborepo.org/docs), which make it easy to share packages and config between projects.

### Fork the repo

To contribute code to [OpenModels](https://open-models-platform.com), you must fork the [OpenModels repo](https://github.com/open-models-platform/openmodels).

### Clone the repo

1. Clone your GitHub forked repo:

   ```sh
   git clone https://github.com/<github_username>/openmodels.git
   ```

2. Go to the OpenModels directory:

   ```sh
   cd openmodels
   ```

### Install dependencies

1. Install the dependencies in the root of the repo.

   ```sh
   npm install # install dependencies
   ```

2. After that you can run the apps simultaneously with the following.

   ```sh
   npm run dev # start all the applications
   ```

Then visit, and edit, any of the following sites:

| Site                                                     | Directory      | Scope name | Description                                   | Local development server   |
| -------------------------------------------------------- | -------------- | ---------- | --------------------------------------------- | -------------------------- |
| [open-models-platform.com](https://open-models-platform.com)                     | `/apps/www`    | www        | The main website                              | <http://localhost:3000>      |
| [open-models-platform.com/dashboard](https://open-models-platform.com/dashboard) | `/apps/studio` | studio     | Studio dashboard (requires Docker, see below) | <http://localhost:8082>      |
| [open-models-platform.com/docs](https://open-models-platform.com/docs)           | `/apps/docs`   | docs       | Guides and Reference (Next.js based)          | <http://localhost:3001/docs> |

#### Running sites individually

You can run any of the sites individually by using the scope name. For example:

```sh
npm run dev:www
```

#### Shared components

The monorepo has a set of shared components under `/packages`:

- `/packages/common`: Common React components, shared between all sites.
- `/packages/config`: All shared config
- `/packages/spec`: Generates documentation using spec files.
- `/packages/tsconfig`: Shared Typescript settings

#### Installing packages

Installing a package with NPM workspaces requires you to add the `-w` flag to tell NPM which workspace you want to install into. Do not install dependencies in their local folder, install them from the route using the `-w` flag.

The format is: `npm install <package name> -w=<workspace to install in>`.

For example:

- `npm install react -w common`: installs into `./packages/common`
- `npm install react -w www`: installs into `./apps/www`
- `npm install react -w studio`: installs into `./apps/studio`

You do not need to install `devDependencies` in each workspace. These can all be installed in the root package.

---

## Running Docker for OpenModels Studio

To run Studio locally, you'll need to setup Docker in addition to your NextJS frontend.

#### Prerequsites

First, make sure you have the Docker installed on your device. You can download and install it from [here](https://docs.docker.com/get-docker/).

#### Get Started

1. Navigate to the `docker` directory in your forked repo

   ```sh
   cd docker
   ```

2. Copy the example `env` file

   ```sh
   cp .env.example .env
   ```

3. Run docker

   ```sh
   docker compose up
   ```

This command initializes the containers specified in the `docker-compose.yml` file. It might take a few moments to complete, depending on your computer and internet connection.

Once the `docker compose up` process completes, you should have your local version of OpenModels up and running within Docker containers. You can access it at `http://localhost:8082`.

Remember to keep the Docker application open as long as you're working with your local OpenModels instance.

## Create a pull request

After making any changes, open a pull request. Once you submit your pull request, the OpenModels team will review it with you.

Once your PR has been merged, you will be proudly listed as a contributor in the [contributor chart](https://github.com/open-models-platform/openmodels/graphs/contributors)!

## Issue assignment

We don't have a process for assigning issues to contributors. Please feel free to jump into any issues in this repo that you are able to help with. Our intention is to encourage anyone to help without feeling burdened by an assigned task. Life can sometimes get in the way, and we don't want to leave contributors feeling obligated to complete issues when they may have limited time or unexpected commitments.

We also recognize that not having a process can sometimes lead to competing or duplicate PRs. There's no perfect solution here. We encourage you to communicate early and often on an Issue to indicate that you're actively working on it. If you see that an Issue already has a PR, try working with that author instead of drafting your own.

We review PRs in the order of their submission. We try to accept the earliest one that is closest to being ready to merge.

---

## Common tasks

### Add a redirect

Create a new entry in the [`redirects.js`](https://github.com/open-models-platform/openmodels/blob/master/apps/www/lib/redirects.js) file in our main site.

---

### Federated docs

We support "federating" docs, meaning doc content can come directly from external repos other than [`open-models-platform/openmodels`](https://github.com/open-models-platform/openmodels).

- It's great for things like client libs who have their own set of docs that we don't want to duplicate on the official OpenModels docs (eg. [`openmodels/vecs`](https://github.com/open-models-platform/vecs)).
- No duplication or manual steps required - fetches and generates automatically as part of the docs build pipeline
- It's flexible - you can "embed" external docs nearly anywhere at any level in OpenModels docs, but they will feel native
- If you are maintaining a repo containing docs that you think could also live in OpenModels docs, feel free to create an issue and we can work together to integrate

Federated docs work using Next.js's build pipeline. We use `getStaticProps()` to fetch remote documentation (ie. markdown) at build time which is processed and passed to the respective page within the docs.

See the [Vecs Python source code](https://github.com/open-models-platform/openmodels/blob/master/apps/docs/pages/guides/ai/python/%5Bslug%5D.tsx) to see how we do this for [`openmodels/vecs`](https://github.com/open-models-platform/vecs). Use this as a starting point for federating other docs.

Some things to consider:

- Links will often need to be transformed. For example if you are bringing in external markdown content, they may contain relative links that may not translate 1-to-1 after rendering in the OpenModels docs. Use the [Link Transform](https://github.com/open-models-platform/openmodels/blob/master/apps/docs/lib/mdx/plugins/rehypeLinkTransform.ts) rehype plugin to transform links.
- External markdown may contain syntax extensions that OpenModels docs don't understand by default (eg. [mkdocs-material extensions](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown)). We've built a few remark plugins to support these extensions (eg. [MkDocs Admonition](https://github.com/open-models-platform/openmodels/blob/master/apps/docs/lib/mdx/plugins/remarkAdmonition.ts)). If there is a markdown extension that you need that isn't built yet, feel free to open an issue and we can work together to create it.

---

## Community channels

If you get stuck somewhere or have any questions, join our [Discord Community Server](https://discord.open-models-platform.com/) or the [Github Discussions](https://github.com/open-models-platform/openmodels/discussions). We are here to help!

## Contributors

<a href="https://github.com/open-models-platform/openmodels/graphs/contributors">
   <img src="https://contributors.deno.dev/open-models-platform/openmodels?height=1200&width=1200&count=90" width="1200" height="1200" alt="contributors">
</a>
