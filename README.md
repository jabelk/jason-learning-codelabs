
[![Build and deploy Hugo static site to GitHub Pages](https://github.com/CiscoLearning/cisco-learning-codelabs/actions/workflows/cicd.yaml/badge.svg?branch=main&event=push)](https://github.com/CiscoLearning/cisco-learning-codelabs/actions/workflows/cicd.yaml)
 
# Guide

## How to Contribute Content

1. [Install Hugo](https://gohugo.io/getting-started/installing/)
2. Write a new codelab under `site/content/posts/<your directory>/` directory in markdown file`index.md`.
    - Use either of the following to create your new content:
        - Copy [Codelabs Template](/sample/markdown-template/codelab.md) to new `index.md`
        - Run `./create_new_lab.sh` and follow the prompts to create the needed directories and files.
    - [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/) is helpful resource.
3. Run either the Hugo command `hugo server -D --disableFastRender -s site` directly or run `./run_dev_server.sh` for local testing

    > You don't have to kill and run this process whenever you add or update content. Hugo development server auto-refreshes on file changes

4. Commit, Push and Create Pull Request

> Note: If you are unfamiliar with git, [here](https://ciscolearning.github.io/cisco-learning-codelabs/posts/tutorial-tutorial/) is a tutorial to help you get started using Microsoft Visual Studio Code (VSCode).  This covers how to clone the repository, how to scaffold the tutorial, and how to use VSCode's built-in toolset to work with the git process (commit, push, synch, publish, etc).  This is the only supported method by the Learning and Certifications Technical Advocacy team (e.g. the only way that the L&C TAs will provide help and support).

### Update the front matter data

Copy and paste the front matter below to the top of your markdown file if not already present and change the values appropriately.

Guidelines are available below the sample front matter.

```yaml
---
title: <LAB TITLE>
description: <LAB DESCRIPTION>
categories: [<PRIMARY_CATEGORY>, <SECONDARY_CATEGORY>]
tags: [TAG1, TAG2, TAGN,...]
duration: <MM:SS>
updated: <YYYY-MM-DD>
authors: <AUTHOR NAME>
draft: true
---
```

The front matter consists of key-value pairs of the form "key: value". Keys cannot
contain colons, and separate front matter fields must be on seperate lines.
At present, values must all be on one line. All metadata must come before the
title. Any arbitrary keys and values may be used; however, only the following
will be understood by the template renderer:

- **Description:** This is the short description shown on the index of codelabs cards as well as the intro to the codelab in the first step.

- **Categories:** A comma-separated list of the topics the codelab covers, represented with a YAML array. The categories can have two values. The first is the primary, and the second is the secondary, and they will appear at the bottom of the card in the index of codelabs page. Only the primary category is used to filter by categories and colorize the bottom color of the card.
Here is the list of currently supported categories:

    - Networking
    - Data Center
    - Collaboration
    - Service Provider
    - Security
    - Automation
    - Certification
    - Coding
    - Cloud
    - IoT

- **Tags:** A comma-separated list of tags describing your codelab. This field helps with searching, represented with a YAML array.

- **Duration:** The time it takes to complete the entire codelab. Typically the sum of all steps

- **Authors:** A comma- separated list of authors.

- **Draft:** True or False value, if True it will not appear on production website.


### Steps

- Each step should be contained with `{{< step >}}` template string like below. You can give title for each step with the `label` attribute, and the estimated duration can be specified in `duration` attribute as well.

```
{{< step label="Overview" duration="1:00" >}}

<WRITE YOUR OWN CONTENT IN MARKDOWN>

{{< /step >}}
```

Replace `<WRITE YOUR OWN CONTENT IN MARKDOWN>` with your step text and images utilizing markdown format. If you need to include images, you can put images in `site/content/posts/<lab name>/images` directory.  Create the `images` directory if it does not exist.

*Example Markdown to include image:*
`![IMAGE](images/IMAGE.png)` 

- To create additional steps just copy the above block below the previous step and edit as usual.

### Resources

- [Codelabs Template](https://raw.githubusercontent.com/CiscoLearning/cisco-learning-codelabs/main/sample/markdown-template/codelab.md)
- [How to write a codelab](https://ciscolearning.github.io/cisco-learning-codelabs/posts/write-a-codelab/)
- [Markdown format Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Considerations

- Writing style should be conversational.  Referencing ones self or the learner is acceptable and encouraged to maintain a casual style.
- Make the **title** more noticeable within **no more than 60 characters** long.
- `Overview` and `Call to Action` steps are mandatory and must be at the beginning and end of your guide (see [template](/sample/markdown-template/codelab.md))
- Always **add environmental setup step(s)** for readers to reproduce the Codelab.
- Keep each steps as compact as possible:
  - Don't try to explain every underlying technologies.
  - Add links to other resources for keeping things compact and interesting to the readers.
