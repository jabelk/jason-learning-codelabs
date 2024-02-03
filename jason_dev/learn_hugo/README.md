
### learn hugo after installed


[hugo quick start](https://gohugo.io/getting-started/quick-start/)

Verify that you have installed Hugo v0.112.0 or later.

`hugo version`
Run these commands to create a Hugo site with the Ananke theme. The next section provides an explanation of each command.
```
hugo new site quickstart
cd quickstart
git init
git submodule add <https://github.com/theNewDynamic/gohugo-theme-ananke.git> themes/ananke
echo "theme = 'ananke'" >> hugo.toml
hugo server
```
