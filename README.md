# Programerski klub FMF

This repository contains the code and thecontent for the official website of *Programerski klub FMF*. It relies on the *Hugo* static site generator to build the `HTML` files. It is deployed by *GitHub Pages*.

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

*Hugo* builds the sites content from `markdown` files (ending `.md`) in folder `content` and it's subfolders. Each file contains metadata as embedded `yaml` code (encapsulated by `---`), that *Hugo* can axes. 

To create a new content file run the `hugo new` command. Make sure that the file name is preceeded by the appropriate folder, as demonstrated below. This way, *Hugo* will already include the appropriate metadata template. 

The only exception to this is the folder `entertainment`. Before implementing any changes, consult the project managers. 

### Metings
```
hugo new meetings/YYYY-MM-DD.md
```

Your file is locate at `./your-fork-name/hugo/content/meetings/YYYY-MM-DD.md`. 

### Projects 
```
hugo new projects/file-name.md
```

Your file is locate at `./your-fork-name/hugo/content/projects/file-name.md`. 

### Project idea
```
hugo new project-ideas/file-name.md
```

Your file is locate at `./your-fork-name/hugo/content/project-ideas/file-name.md`. 

---

Navigate to the proper folder, and edit your file manually. 

## Testing

To test your code locally, run the command:
```
hugo server -D
```

You should now be able to access the demo site at ```https://localhost:1313/```. 

## Repository Structure 

The majority of the code resides in the `hugo` directory. The `config.yaml` file holds the site's global settings. 

The `hugo` directory is further divided into the following subfolders. 

### Archetypes 

### Content 

### Data

### Public

### Static

### Templates 

## Github Actions 

This project uses *Github Actions Workflow* to automatically deploy the site to *GitHub pages* (TODO: and to validate the `HTML` with regards to the *HTML Living Standard*). The action triggers on `push` and `pull request` events. 

You can access the *GitHub Actions* files at `.github/workflow/`.
