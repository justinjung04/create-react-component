# Create React Component

Create React components through CLI.

## Install
```
npm install @justinjung04/create-react-component --save-dev
```

## Run
```
npx crc
```
or
```
npx create-react-component
```

## Creating

When the question comes up, you can write your component's name
```
Component name(s): MyButton
```

To create multiple components, add the names with comma
```
Component name(s): Header, Body, Footer
```

## Configuration

### crc.config.js

Exports an object with following properties:

- `path` (string): Base path for components to be created. Default is `'src/components'`.
- `component` (string): Type of React component. Accepts one of `'normal'|'pure'|'function'`. Default is `'normal'`.
- `typescript` (boolean): Whether to create TypeScript files. Default is `false`.
- `test` (boolean): Whether to create test file. Default is `false`.
- `stylesheet` (string): Extension of the stylesheet. Accepts one of `'css'|'scss'|'less'|'none'`. Default is `'css'`.
- `custom` (object): To fully customize templates and file componsitions. Accepts following properties:
  - `basePath` (string): Path to custom template folder. Default is `'crc-templates'`.
  - `[templateName]` (array): Array of files to be generated from the custom template. For example, `myTemplate: [ myTemplate.js.js, myTemplate.css.js ]`

### Using custom templates

1. Create template files in a folder. Note the naming convention `[filename].[extension].js`.
```
- my-templates
  - index.js.js
  - index.css.js
```

2. Each template file is a JavaScript that takes `componentName` as argument and returns a new string.
```javascript
module.exports = componentName => (
`console.log(Hello ${componentName}!);`
);
```

3. Add the custom template to `crc.config.js`.
```javascript
module.exports = {
  custom: {
    basePath: 'my-template',
    template1: [
      'index.js',
      'index.css'
    ]
  }
}
```

4. Run the command with `-c` option (or `--custom` option).
```
npx crc -c template1
```

### CLI options

```
Usage: npx crc [options]

Options:

  -v, --version   Prints the version number
  -h, --help      Prints the help message
  -n, --normal    Create component(s) extending React.Component (default)
  -p, --pure      Create component(s) extending React.PureComponent
  -f, --function  Create function component(s)
  -c, --custom    Create custom component(s) based on custom templates
  --javascript    Create JavaScript files (default)
  --typescript    Create TypeScript files
  --test          Include test files
  --notest        Do not include test files (default)
  --css           Inlcude .css file (default)
  --less          Inlcude .less file
  --scss          Inlcude .scss file
  --nocss         Do not inlcude .scss file
  --path          Set path to the component folder
```
