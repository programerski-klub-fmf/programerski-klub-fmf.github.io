# Programerski klub FMF

This repository contains the code and the content for the official website of *Programerski klub FMF*. It relies on the *Hugo* static site generator to build the `HTML` files. It is deployed by *GitHub Pages*.

## Setup

Before you get started, set-up *Hugo* by following the [installation guide](https://gohugo.io/installation/). 

Fork the repository, and clone the fork to your device. You can do this by running the command:
```
git clone "link-to-your-fork" 
```

Navigate to the directory `./your-fork-name/hugo/` with the following command:
```
cd your-fork-name/hugo/
```

This is where you'll do all the work. 

## Adding content

*Hugo* builds the site's content from `markdown` files (ending `.md`) in  the `content` folder and its subfolders. Each file contains metadata as embedded `yaml` code (encapsulated by `---`), that *Hugo* can access. 

To create a new content file run the `hugo new` command. Make sure that the file name is preceeded by the appropriate folder, as demonstrated below. This way, *Hugo* will already include the appropriate metadata template. 

The only exception to this is the folder `entertainment`. Before implementing any changes, consult the project managers. 

### Meetings
```
hugo new meetings/YYYY-MM-DD.md
```

Your file is located at `./your-fork-name/hugo/content/meetings/YYYY-MM-DD.md`. 

### Projects 
```
hugo new projects/file-name.md
```

Your file is located at `./your-fork-name/hugo/content/projects/file-name.md`. 

### Project ideas
```
hugo new project-ideas/file-name.md
```

Your file is located at `./your-fork-name/hugo/content/project-ideas/file-name.md`.

### News
```
hugo new news/folder-name
```

Your folder is located at `./your-fork-name/hugo/content/project-ideas/folder-name`. 

---

To add or edit content, navigate to the proper folder and open your newly-created file in your chosen editor. 

## Testing

To test your code locally, run the command:
```
hugo server -D
```

You should now be able to access the demo site at ```https://localhost:1313/```. 

## Repository Structure 

The majority of the code resides in the `hugo` directory. The `config.yaml` file holds the site's global settings. 

The `hugo` directory is further divided into the following subfolders. 

> A more general breakdown of a *Hugo* site directory is available on [*Hugo*'s official website](https://gohugo.io/content-management/).

### Archetypes 

The `archetypes` folder contains content templates. These will automatically copy into the new file and populate certain fields when you run the `hugo new` command. 

For example, when you run `hugo new meetins/YYYY-MM-DD.md`, *Hugo* will copy the content of `archetypes/meetings.md` into the newly created file, while also filling out the `title` and `date` fields in the meta section.

This is why we don't create new files directly, and instead use the `hugo new` command.

### Assets/style

The folder `assets/style` contains two subdirectories: `bulma`  and `sass`. 

#### bulma

This file holds the source code for the [*Bulma*](https://bulma.io/) `CSS` framework. Generaly, nothing here should be changed.

#### sass

The only file included, `mystyles.scss`,  defines all our *Bulma* framework customisation. Upon build, *Hugo* automatically generates the site's stylesheet CSS file. 

> For additional information on *Bulma* customisation with `scss` files, visit the official [*Bulma* website](https://bulma.io/documentation/customize/).

### Content 

The `content` folder stores the content of this webpage. Unless you're working on structural changes to the site, this is the only directory you should access. 

```bash
content
├── _index.md
├── entertainment
│   └── index.html
├── meetings
│   ├── YYYY-MM-DD.md
│   └── _index.md
├── project-ideas
│   ├── project-idea-name.md
│   └── _index.md
└── projects
    ├── project-name.md
    └── _index.md
```

### Data

Additional data that *Hugo* can use when generating the site. Not in use.

### Layouts

The `layouts` folder defines the site's `HTML` templates. In its structure it mirrors the `content` folder, which defines how each subpage randers. 

### Public

In the `public` directory, *Hugo* stores deployment ready files. Because *GitHub Actions* works through `artefacts`, this folder is obsolete.

### Static

The folder `static` contains the site's global static files, such as its stylesheet and logo.

> For additional information on *Hugo* repository structure read the official [*Hugo* documentation](https://gohugo.io/getting-started/directory-structure/).


## Github Actions 

This project uses *Github Actions Workflow* to automatically deploy the site to *GitHub pages* (TODO: and to validate the `HTML` with regards to the *HTML Living Standard*). The action triggers on `push` and `pull request` events. 

You can access the *GitHub Actions* files at `.github/workflow/`.

> For more information on *GitHub Actions* take a look at official [documentation](https://docs.github.com/en/actions).
