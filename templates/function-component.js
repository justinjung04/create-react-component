module.exports = (component, stylesheet, typescript) => (
`import React from 'react';${stylesheet === 'none' ? '' : `\nimport './${component}.${stylesheet}';`}
${typescript ? '\ntype Props = {};\n' : ''}
const ${component}${typescript ? ': React.FunctionComponent<Props>' : ''} = props => {
  return (
    <div className='${component}'>
      
    </div>
  );
};

export default ${component};`
);