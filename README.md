# WIP Tutorial Tooling

Two directions / goals:

- build tool to generate tutorial for existing process with new sidecar JSON
- improve process by including Google Docs / DOCX

## Tutorial Tool: Adapting for Sidecar

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
