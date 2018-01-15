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

Options:

  -i, init [path]      Create an empty website or reinitialize an existing one.
  -d, --doc <path>     Other documents generated.
  -o, --output <path>  Writes the compiled file to the disk directory. (default: dist)
  -p, --port [number]  The port. (default: 5858)
  -h, --host [host]    The host. (default: 0.0.0.0)
  --build              Creating an optimized production build.
  --clean              Delete the .cache folder.
  -h, --help           output usage information

Examples:

  $ rdoc init
  $ rdoc init doc-example
  $ rdoc -d doc/mm
  $ rdoc -d tutorial,doc
  $ rdoc -p 2323  -d doc --clean
  $ rdoc -h 0.0.0.0 -d doc --clean
```

### License

The MIT License (MIT)
