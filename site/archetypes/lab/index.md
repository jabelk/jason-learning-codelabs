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

<!-- MANDATORY STEP: Overview Step is a required step and must be at the beginning of each codelab -->
{{< step label="Overview" duration="1:00" >}}

### What You’ll Learn
- How to create steps
- How to include code snippets
- How to include links and images
- Call to action

### What You'll Need
- Any required application or library
- Access to a Sandbox

{{</step >}}

<!-- When defining steps, Make sure there is no spaces between the brackets { {< >} } -->
{{< step label="How to Create Steps" duration="1:00" >}}

- Each step should be contained with a `{ {< step >}}` template string like below.
- You can give a title for each step with the `label` attribute, and the estimated duration can be specified in the `duration` attribute as well.


```
{ {<step label="Overview" duration="1:00" >}}

WRITE YOUR OWN CONTENT

{ {<step>}}
```

{{</step >}}


{{<step label="How to include code snippets" duration="3:00" >}}

To include code snippets, you can do a few things.
- Inline highlighting can be done using the tiny tick mark on your keyboard: "`"
- Embedded code

### Python

```python
import requests
```

### JavaScript

```javascript
{
  key1: "string",
  key2: integer,
  key3: "string"
}
```

### Java

```java
for (statement 1; statement 2; statement 3) {
  // code block to be executed
}
```

{{</step >}}

{{<step label="Hyperlinking and Embedded Images" duration="1:00" >}}

## Hyperlinking

[Snack Minute](https://www.youtube.com/playlist?list=PL2k86RlAekM-Qdu_In2-8B1YT6c66MnY0)

## Images

![alt-text-here](./images/sm.png)

{{</step >}}

<!-- MANDATORY STEP: Call to Action Step is a required step and must be at the end of each codelab -->
{{<step label="Congratulations" duration="1:00" >}}

## Learn More

- Link to related Learning Content to continue journey
- Link to other walkthroughs
- Link to Marketing offer page

{{</step >}}
