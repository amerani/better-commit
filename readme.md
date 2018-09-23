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

 *notice `readme: ` was prepended to commit message*

 ### cli
 `better-commit -am "better-commit is awesome"`