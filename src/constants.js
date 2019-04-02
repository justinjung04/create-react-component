const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const helpMessage = `
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
`;

module.exports = { RESET, BOLD, RED, GREEN, helpMessage };