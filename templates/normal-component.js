module.exports = (component, stylesheet, typescript) => (
`import React from 'react';${stylesheet === 'none' ? '' : `\nimport './${component}.${stylesheet}';`}
${typescript ? '\ntype Props = {};\ntype State = {};\n' : ''}
class ${component} extends React.Component${typescript ? '<Props, State>' : ''} {
  state = {

  }

  render() {
    return (
      <div className='${component}'>
        
      </div>
    );
  }
};

export default ${component};`
);