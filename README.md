rdoc
---

Fast static site generator for React.

```bash
npm install rdoc -g   # Install rdoc
rdoc init my-project  # Init project

cd my-project && npm start # Into the directory, start the service.
```

<div align="center">
  <img src="./rdoc.png"> 
</div>

### Command

```shell
Usage: rdoc [options]

Fast static site generator for React.

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  -d, --doc <path>       Other documents generated.
  -o, --output <path>    Writes the compiled file to the disk directory. (default: dist)
  -p, --port [number]    The port. (default: 5858)
  -h, --host [host]      The host. (default: 0.0.0.0)
  -b, --branch <branch>  Name of the branch you are pushing to. (default: gh-pages)
  --publish [url]        Other documents generated.
  --build                Creating an optimized production build.
  --clean                Delete the .cache folder.
  -h, --help             output usage information

Examples:

  $ rdoc init
  $ rdoc init doc-example
  $ rdoc -d doc/mm
  $ rdoc -d tutorial,doc
  $ rdoc -d tutorial,doc --clean --build
  $ rdoc -p 2323  -d doc --clean
  $ rdoc -h 0.0.0.0 -d doc --clean
  $ rdoc --publish https://git_repo.git --branch master
```
### Development

To develop, run the self-reloading build, Get the code:

```shell
$ git clone https://github.com/jaywcjlove/rdoc.git
$ cd rdoc     # Into the directory
$ npm install # or  yarn install
```

To develop, run the self-reloading build:

```bash
# Run the app
# Restart the app automatically every time code changes. 
# Useful during development.
$ npm run doc
```

Open your browser and visit http://localhost:5858

### Folders

```bash
.
├── README.md
├── dist
├── package.json
├── src
│   ├── build.js
│   ├── commands
│   ├── conf
│   ├── publish.js
│   ├── server.js
│   ├── utils
│   └── web
├── templates
│   └── default # document the static file.
└── theme
    └── default
```

### License

The MIT License (MIT)
