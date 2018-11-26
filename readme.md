# better-commit
`git commit` with batteries included

## Installation
`npm i -g better-commit`  
`npm i -g better-commit@stable`

## Usage

### git alias (recommended)
`git config --global alias.c '!f() { better-commit "$@"; }; f'`

```sh
~/better-commit  readme ✗
▶ git c -m "Add readme"
[readme 08e9199] readme: Add readme
1 file changed, 10 insertions(+)
create mode 100644 readme.md
```

*notice branch name `readme: ` was prepended to commit message*

### cli
`better-commit -am "better-commit is awesome"`

## Options
- supports all `git commit` options  
`git c -i readme.md -m "Update readme" --fixup 55e75f7`


## Plugins
- extensible by specifying plugins in `.bettercommitrc`

### Core Plugins
- `better-commit-prepend-branch` (default)  
*no branch name prepended on `master` or `detached HEAD`*
- `better-commit-autocorrect`
- `better-commit-emoji`

```json
{
    "plugins": [
        ["prepend-branch", {
            "master": "retsam"
        }],
        ["emoji", "random"],
        "autocorrect"
    ]
}
```

exclude plugins
```json
{
    "plugins": ["!prepend-branch"]
}

```
*plugins must be published on npm as `better-commit-<plugin-name>`*

### [Examples](https://github.com/amerani/better-commit-examples)

## Demo
![Demo](https://raw.githubusercontent.com/amerani/better-commit/master/better-commit-demo.gif)

## Contributing
Please suggest features you'd like to use in your git workflow, better yet, submit a pull request :thumbsup:
