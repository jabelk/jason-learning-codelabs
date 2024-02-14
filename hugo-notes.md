hugo uses archetypes as templates
<https://gohugo.io/content-management/archetypes/>

our template is in `site/archetypes/lab` and `create_new_LAB.sh` uses it with this line `hugo -s site new content --kind lab posts/${LAB_NAME}`. Template variables only in the Front Matter (meta data)
```yaml
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
description: "{{ replace .Name "-" " " | title }}"
categories: [ CATEGORY_PRIMARY, CATEGORY1, CATEGORYN ]
tags: [ TAG1, TAG2, TAGN ]
duration: MM:SS
authors: AUTHOR_NAME
draft: true
---
```

 the default archetype uses the replace function to replace hyphens with spaces when populating the title in front matter.

Archetypes receive the following objects and values in context:

.Date
.Type
.Site (see details)
.File (see details)

Currently using [Leaf Bundles](https://gohugo.io/content-management/archetypes/#leaf-bundles) format with images/ and index.md format.

## Open questions

in our `layouts/index.json.json` is templated with Hugo inputs:
```json
{{- $posts := slice -}}

{{- range where (where site.RegularPages "Section" "==" "posts") ".Draft" "ne" true -}}
  {{- $item := dict
    "ID" ( .Title | urlize )
    "URL" .Permalink
    "RelURL" .RelPermalink
    "Title" ( .Title )
    "Description" ( .Params.description )
    "Duration" ( .Params.duration )
    "Authors" ( .Params.authors )
    "Categories" .Params.categories
    "Tags" .Params.tags
    "PublishDate" .PublishDate
    "Date" ( .Date.Format "2006-01-02T15:04:05Z07:00" )
    "Modified" .Lastmod
  -}}

  {{- $posts = $posts | append $item -}}
{{- end -}}

{{- $object := dict
  "BaseURL" .Site.BaseURL
  "Updated" ( now.Format "2006-01-02T15:04:05Z07:00" )
  "LastChange" .Site.LastChange
  "CategoryColors" .Site.Params.categoryColors
  "Posts" $posts
-}}

{{- $object | jsonify (dict "indent" "  ") -}}

```
