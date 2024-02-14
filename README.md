# WIP Tutorial Tooling

Two directions / goals:

- build tool to generate tutorial for existing process with new sidecar JSON
- improve process by including Google Docs / DOCX

## Tutorial Tool: Adapting for Sidecar

TOML uses +++ instead of ---, and = instead of :

existing build process uses this:
`'hugo --source=site --minify --baseURL="${{ env.HUGO_BASE_URL }}"'`

{{ .Content }} is where [content](https://www.youtube.com/watch?v=8b2YTSMdMps) is going to show up from the markdown.

`site/themes/codelabs/layouts/posts/index.html` has our content
```html
<body unresolved>
  <google-codelab title="{{ .Title }}" id="{{ .Title | urlize }}" authors="{{ .Params.authors }}" updated="{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}" environment="web" {{ if .Site.Params.feedbackLink }}feedback-link="{{ .Site.Params.feedbackLink }}"{{ end }} home-url="{{ .Site.BaseURL }}" description="{{ .Params.description }}">

{{ .Content }}

  </google-codelab>
```
example in [google's codelabs html template](https://github.com/googlecodelabs/tools/blob/9f2b585333fc582b0a545f6b4bee0f4466ef71c7/claat/render/template.html#L46)

### Features: Required

1. generate sidecar JSON with the [following schema](https://learning-confluence.cisco.com/confluence/pages/viewpage.action?spaceKey=MW1&title=Content-Automation-Service):

```json
{
    "id" : "ccna-intro-acl",
    "title" : "CCNA: Configure Your First ACL",
    "description" : "Unlock the power of access control lists...",
    "date" : "2024-01-20",
    "duration" : "1h30m00s",
    "ia-guid" : "dd3876a4-a148-4ef3-af33-ac8f3fb69bab",
    "lesson-guid" : "99d03642-0bb2-4fc0-ba0c-d7efdac982ad",
    "certifications" : "ccna",
    "skill-levels" : "intermediate",
    "tags" : [
        {
            "tag": "Kubernetes"
        },
        {
            "tag": "KubeCtl"
        }
    ],
    "technologies" : [
        {
            "tech": "Cloud"
        }
    ],
    "files" : [
        {
            "label": "Overview",
            "duration": "5:00",
            "xy-guid": "29d5f00f-233b-4cf3-8280-5fedc1599bb8",
            "file": "step-1.md"
        },
        {
            "label": "What is K8s",
            "duration": "5:00",
            "xy-guid": "f0ba7101-f83a-41a0-9aac-f434daaaa9fe",
            "file": "step-2.md"
        },
        {
            "label": "Deploy K8s",
            "duration": "10:00",
            "xy-guid": "c4fb099a-9a94-4575-bb58-58ed7ab04e88",
            "file": "step-3.md"
        },
        {
            "label": "Kubectl Basics",
            "duration": "5:00",
            "xy-guid": "a6f1150f-1c32-4725-aa7a-a3451dcad93e",
            "file": "step-4.md"
        },
        {
            "label": "Congratulations",
            "duration": "5:00",
            "xy-guid": "d9665972-ad86-4a08-9d4a-d7236c5c63b5",
            "file": "step-5.md"
        }
    ],
    "authors" : [
        {
            "name": "Kareem Iskander",
            "email": "kiskande@cisco.com"
        }
    ],
    "active" : true

}
```

It must have a folder structure matching that in the poplartest folder, found within the same repository, e.g.
```
assets/
images/
sidecar.json
step-1.md
...
step-5.md
```


2. Publishing
With the repository and sidecar properly configured, the deployment process is started by making a POST request to <https://git.certsite.net/poplar/newTutorialToStage> with a body in the format

```
{
    "course_ids": ["poplartest"],
    "create_tickets": true,
    "create_catalog_entries": true
}

```
"course_ids" is a list of courses that you want to deploy.
"create_tickets" indicates if you want Jira tickets to automatically be created in the DDCM space.
"create_catalog_entries" automatically creates entries for all courses in the content catalog on staging.

3. Use CLAAT to export from Doc to MD

claat export -f md   -pass_metadata title,date  1qJhgYNoJnvCzUWMX9Mln-EZfqUYTbzzDDxFHIYo9CAA

claat export -f md   -pass_metadata title,date,ia-guid,lesson-guid,certifications,skill-levels,tags,technologies,files,authors,active  1qJhgYNoJnvCzUWMX9Mln-EZfqUYTbzzDDxFHIYo9CAA

- make sure quotes around values in gDOC since YAML parsing CCNA: ABC caused issue in title name.

## GPT outputs

GPT:
Yes, you can definitely structure your tutorials this way in Hugo. Hugo works well with nested content and you can have a directory for each tutorial with its own markdown files and assets. Here's a simple way to set it up:

1. Create a new directory in your `content/posts/` directory for each tutorial. For instance, `content/posts/tutorial-1/`.

2. Inside each tutorial directory, create markdown files for each step (step-1.md, step-2.md, etc.) and a sidecar.json for metadata. You can also create an `images/` directory for tutorial-specific images.

3. The order of the steps can be controlled by the `weight` parameter in the front matter of each markdown file. Lower weights come first. For example:

    ```
    ---
    title: "Step 1"
    weight: 1
    ---
    ```

4. In your layout templates, you'll need to account for the nested structure. For instance, you might have a `layouts/posts/single.html` template to display a single tutorial. This template would need to loop over the `.Pages` of the current page to display each step in order. Here's a simple example:

    ```
    {{ range .Pages }}
        <h2>{{ .Title }}</h2>
        {{ .Content }}
    {{ end }}
    ```

5. The sidecar.json file would need to be handled separately, as Hugo doesn't automatically parse these files as front matter. You could access it as a data file if you put it in Hugo's `data/` directory, or you could create a custom script to inject the data into the front matter of your markdown files.

Remember to run `hugo server` to start your local server and see your changes as you make them. You can access the server at `localhost:1313` in your web browser.

Please note that the specifics may vary depending on your theme and other factors, and you may need to adjust your configuration and templates to suit your needs.

Shortcodes in Hugo are custom, user-defined markdown-style markers that instruct Hugo to do something special.

In your case, {{</step >}} is closing a shortcode, but there is no corresponding opening shortcode {{< step >}}. This could be what's causing the error.

However, it also seems like you are trying to use some custom shortcodes ({{< step >}} and {{<step label="Overview" duration="1:00" >}}), but I'm not sure if these are defined in your Hugo project. If they are not, you would need to create these shortcodes in your layouts/shortcodes/ directory for Hugo to recognize them.

Just to clarify, the shortcode syntax in Hugo looks like this: {{< shortcodeName >}} for opening a shortcode and {{< /shortcodeName >}} for closing one.

Additionally, your step markdown files appear to have the same front matter. You might want to adjust the title and id fields to reflect the content of each individual step.


The Google Codelabs theme for Hugo is a specific theme designed to make it easy to create self-paced, interactive tutorials. It's used by Google for their own Codelabs site.

The `index.json.json` file in your `layouts` folder appears to be generating a JSON file which contains metadata for all of your posts. The file is structured to include several attributes for each post, including title, description, authors, categories, tags, and dates.

If you're using the Google Codelabs theme, there are a few key things to know:

1. Pages: Each tutorial or codelab should be a single markdown page. The theme doesn't natively support multiple markdown files for a single codelab (like `step-1.md`, `step-2.md`, etc.). Instead, each step of the codelab is typically a different heading within the markdown file.

2. Shortcodes: The theme comes with several custom shortcodes to help structure your codelabs. For example, `{{< step >}}` to define a step, `{{< aside >}}` for asides, and `{{< button >}}` for buttons.

3. Front Matter: Your front matter should include specific fields used by the theme. For example, `id` to uniquely identify the codelab, `summary` for a brief summary of the codelab, `categories` to categorize the codelab, and `env` to specify the environment (like 'web', 'android', etc.).

The error you're seeing may be due to trying to split a single codelab into multiple markdown files, which isn't natively supported by the theme. Instead, consider structuring your codelab as a single markdown file with multiple steps defined using the `{{< step >}}` shortcode.

is there another markdown based publishing web framework that uses a sidecar.json for metadata and separate markdown files for steps like I am using?

Your specific use case – using a sidecar.json for metadata and individual markdown files for each step of a tutorial – isn't a standard pattern in most static site generators. This approach would typically require some customization in any framework.

However, some publishing frameworks are more flexible and might be easier to adapt to your needs. Here are a few options:

1. **Jekyll**: A popular static site generator with a large ecosystem of plugins. You might be able to achieve your desired setup by creating a custom plugin or script. Jekyll also has good support for data files.

2. **Gatsby**: This is a more flexible and powerful framework based on React. It has a robust data layer that can source content from almost anywhere, including markdown files and JSON files. You could potentially use Gatsby's createPages API to create pages from your markdown steps and associate them with metadata from a JSON file.

3. **VuePress**: This is designed specifically for technical documentation, which makes it a good fit for tutorials. You could potentially use VuePress' custom theme feature to implement your desired setup.

4. **Docusaurus**: Another option designed for technical documentation, built using React. It supports separate markdown files for documentation and could potentially be customized to use a separate JSON file for metadata.

Remember, achieving your desired setup in any of these frameworks would likely require some custom scripting or plugin development. I recommend looking into each one to see which might be the best fit for your needs.

Is our codelabs custom?


It's hard to tell definitively without the original theme files for comparison, but these seem to be customized versions of the theme files. The presence of specific links (like the Cisco CSS link), the Google fonts, and the unique JavaScript at the beginning of `single.html` are indicators that they've been customized to some degree.

In the `index.html` file, there's also a reference to an override CSS file (`google_codelab_index_scss_overide.css`), which also suggests that there might be some custom styling applied to the theme.

If you want to know to what extent these files have been customized, you would need to compare these files with the original ones from the theme. A side-by-side comparison would allow you to see what changes have been made. This is usually done using a diff tool or software version control systems like Git.


Look at shortcode <<step>>
The `step.html` file you provided is a Hugo shortcode for defining a step in a codelab. When you use this shortcode in your content files, it's replaced with the HTML defined in `step.html`.

Here's a breakdown of what it does:

- `<google-codelab-step label="{{ .Get "label" }}"{{ with .Get "duration" }} duration="{{ . }}"{{ end }}>`: This line creates a `google-codelab-step` custom HTML element with a label attribute that uses the "label" parameter passed to the shortcode. If a "duration" parameter is provided, it also adds a duration attribute with that value.
  
- `{{ .Inner | markdownify }}`: This line converts the inner content of the shortcode from Markdown to HTML. The `.Inner` variable in Hugo contains the text that is placed between the opening and closing tags of a shortcode.

- `</google-codelab-step>`: This line closes the `google-codelab-step` custom HTML element.

This is a pretty standard Hugo shortcode, and it doesn't seem to be heavily customized. However, the use of the `google-codelab-step` custom HTML element suggests that it's meant to be used with some specific JavaScript and CSS that understands how to work with this custom element, likely provided by the Google Codelabs theme.

Any other way to do the steps?

In Hugo, shortcodes are intended to simplify the inclusion of more complex HTML or other features into your Markdown content. The step shortcode you are using is a great example of this. However, if you want to avoid using shortcodes, you'll have to manually write the corresponding HTML directly in your Markdown files.

For example, instead of using:

```markdown
{{< step label="Step 1" duration="5" >}}
This is the content of the step.
{{< /step >}}
```

You would write the HTML directly:

```html
<google-codelab-step label="Step 1" duration="5">
<p>This is the content of the step.</p>
</google-codelab-step>
```

Note that you have to convert your content to HTML manually when using this method, as the `markdownify` function used in the shortcode is not available. Also, switching to writing HTML directly in your Markdown files would make them harder to read and write, which is one of the reasons why shortcodes exist.

If you're looking for a different way to define your codelab steps but still want to use Hugo's features to make writing content easier, you could consider defining steps as separate content files within a codelab. This would involve reorganizing your content and possibly modifying the theme, but it would allow you to define each step in its own Markdown file without needing to use shortcodes.


Q: how can I define separate content files within a code lab as steps using the codelabs theme from hugo and the files I have shared?

As of now, the Codelabs theme in Hugo does not natively support defining each step as separate content files. The theme is built around the assumption that each codelab is a single Markdown file with steps defined using the step shortcode.

However, it is technically possible to modify the theme to support this, but it would require significant changes to the theme's templates and potentially your site's content structure.

Here's a rough idea of how you might do it:

1. Organize your codelabs into separate directories within the `content/posts` directory. Each directory would represent a single codelab. Inside each codelab's directory, create separate Markdown files for each step. For example:

   ```
   content/
     posts/
       my-codelab/
         01-step-one.md
         02-step-two.md
         03-step-three.md
   ```

2. In each step's Markdown file, use front matter to define the step's label, duration, and any other metadata. For example:

   ```markdown
   ---
   title: "Step One"
   label: "Step 1"
   duration: 5
   ---
   
   This is the content of the step.
   ```

3. Modify the `single.html` template in the theme to iterate over the steps in each codelab and generate a `google-codelab-step` element for each one. The Hugo function `where` can be used to filter only the pages (steps) under the current page (codelab). Something like:

   ```html
   {{ range where .Site.Pages "Parent" . }}
     <google-codelab-step label="{{ .Params.label }}"{{ with .Params.duration }} duration="{{ . }}"{{ end }}>
       {{ .Content }}
     </google-codelab-step>
   {{ end }}
   ```

This would allow you to define each step in a separate Markdown file, and Hugo would combine them into a single codelab when it generates your site. However, this is a significant change to the theme and the structure of your content, and you should thoroughly test it to make sure it works as expected. Also, this approach is more complex and may not be suitable if you're not comfortable with Hugo's templating language or if your codelabs don't neatly fit into this structure.


Q: Update with new single.html

Given the current single.html, if you want to modify it to work with each step as a separate Markdown file, you would replace the {{ .Content }} line with the range code that generates a google-codelab-step for each step. Here's what the new single.html might look like:

<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  <title>{{ .Title }}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400|Roboto:400,300,400italic,500,700|Roboto+Mono">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://www.cisco.com/etc/designs/cdc/clientlibs/responsive/css/cisco-sans.min.css" type="text/css">
  <link rel="stylesheet" href="{{ .Site.BaseURL }}google_codelab_step_scss_bin.css">
  <link rel="stylesheet" href="{{ .Site.BaseURL }}google_codelab_survey_scss_bin.css">
  <link rel="stylesheet" href="{{ .Site.BaseURL }}google_codelab_scss_bin.css">
  <link rel="stylesheet" href="{{ .Site.BaseURL }}google_codelab_step_overide.css">
  <style>
    body {
      transition: opacity ease-in 0.2s;
    }

    body[unresolved] {
      opacity: 0;
      display: block;
      overflow: hidden;
      position: relative;
    }
  </style>
  <script type="text/javascript">
    (function() {
      var didInit = false;
      function initMunchkin() {
        if(didInit === false) {
          didInit = true;
          Munchkin.init('564-WHV-323');
        }
      }
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//munchkin.marketo.net/munchkin.js';
      s.onreadystatechange = function() {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          initMunchkin();
        }
      };
      s.onload = initMunchkin;
      document.getElementsByTagName['head'](0).appendChild(s);
    })();
  </script>

</head>

<body unresolved>
  <google-codelab title="{{ .Title }}" id="{{ .Title | urlize }}" authors="{{ .Params.authors }}" updated="{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}" environment="web" {{ if .Site.Params.feedbackLink }}feedback-link="{{ .Site.Params.feedbackLink }}"{{ end }} home-url="{{ .Site.BaseURL }}" description="{{ .Params.description }}">
  
  {{ range .Pages }}
    <google-codelab-step label="{{ .Params.label }}" {{ with .Params.duration }} duration="{{ . }}" {{ end }}>
      {{ .Content }}
    </google-codelab-step>
  {{ end }}

  </google-codelab>
  <script src="{{ .Site.BaseURL }}native-shim.js"></script>
  <script src="{{ .Site.BaseURL }}custom-elements.min.js"></script>
  <script src="{{ .Site.BaseURL }}prettify.js"></script>
  <script src="{{ .Site.BaseURL }}google_codelab_step_bin.js"></script>
  <script src="{{ .Site.BaseURL }}google_codelab_survey_bin.js"></script>
  <script src="{{ .Site.BaseURL }}google_codelab_bin.js"></script>
  <script src="{{ .Site.BaseURL }}google_codelab_step_overide.js"></script>
</body>

</html>
In this updated template, {{ range .Pages }} is used to iterate over the child pages (steps) of the current page (codelab). For each step, a google-codelab-step element is created with the label and duration from the step's front matter, and the content of the step.

Q:got error with updated templates

The issue you're experiencing might be due to the structure of your content. In Hugo, `index.md` or `_index.md` is treated as a list page which is intended to display a list of other pages. In your case, the `index.md` should be `_index.md` to serve as a list page for other Markdown files (steps) in the same directory. The `index.md` is treated as a regular content page, which could be the reason for the blank page as Hugo might not be recognizing other Markdown files in the directory as child pages (steps).

Here's how you should structure your content:

```
content/
  posts/
    my-codelab/
      _index.md  --> codelab metadata goes here
      step-1.md
      step-2.md
```

Each `step-x.md` file would contain the content and metadata for an individual step. Remember to ensure the metadata for each step is correct, including the `title` and `label` fields.

Also, make sure that the `title` field in the front matter of each step file is unique. In your provided example, both `index.md` and `index-2.md` have the same `id`, which could cause issues.

After structuring your content this way, the updated `single.html` should correctly loop over each step file in the codelab directory and generate the corresponding `google-codelab-step` elements.

Remember to restart the Hugo server after making these changes, as Hugo's server doesn't always correctly update when changes are made to the site structure.

q: show meta data front matter

The `_index.md` front matter would look something like this:

```markdown
---
id: ccna-intro-acl
status: published
authors: **********
categories: web
tags: "kubectl,kubernetes"
feedback_link: "https://github.com/googlecodelabs/your-first-pwapp/issues"
analytics_account: *************
source: "1qJhgYNoJnvCzUWMX9Mln-EZfqUYTbzzDDxFHIYo9CAA"
files: TBD
active: true
title: "CCNA: Configure Your First ACL"
date: 2023-09-28
certifications: "n/a"
technologies: cloud
---
```

You'll note that it's the same as the `index.md` front matter, except it doesn't have the `label` and `duration` fields. These fields should be unique to each step and defined in the individual step files.

The `_index.md` file should contain metadata that applies to the entire codelab. Fields like `label` and `duration`, which are unique to each step, should be defined in the individual step files.

Then, each `step-x.md` (e.g., `step-1.md`, `step-2.md`) file should have its own front matter, for example:

```markdown
---
title: "Step 1"
label: "Step 1"
duration: 5
---

Your step content goes here.
```

This structure allows Hugo to recognize `_index.md` as a parent page that has child pages (the steps). Hence, when you loop over `.Pages` in your `single.html`, it'll correctly identify the `step-x.md` files as the pages to loop over.

