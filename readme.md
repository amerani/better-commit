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

## Contributing
Please suggest features you'd like to use in your git workflow, better yet, submit a pull request :thumbsup: