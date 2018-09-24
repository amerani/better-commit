# better-commit
`git commit` with batteries included

## Installation
`npm i -g better-commit`

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

- no branch name prepended on `master` or `detached HEAD`  
(TODO: branch name options)

## Plugins
- extensible by specifying plugins in `.bettercommitrc`
- supports published npm packages like `better-commit-*`
- also supports local modules for co-location benefits
- [see example repository here](https://github.com/amerani/better-commit-examples)

## Contributing
Please suggest features you'd like to use in your git workflow, better yet, submit a pull request :thumbsup: