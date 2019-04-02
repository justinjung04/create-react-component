module.exports = component => (
`import ${component} from './${component}';

export default ${component};`
);