/* eslint-disable dot-notation */
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import JSONPretty from 'react-json-pretty';
import { Box, Button, Heading, Paragraph, Markdown } from 'grommet';
import { ThemeContext } from 'grommet/contexts';
import Page from '../app/Page';
import DocProperty from './DocProperty';
import Example from './Example';

export default class Doc extends React.Component {
  state = {
    documentation: {},
  };

  loadComponnet = ({ name, library }) => {
    if (name && library) {
      fetch(`/api/examples/${library}/${name}`)
        .then(res => (res ? res.json() : res))
        .catch(() => this.setState({ documentation: {} }))
        .then(res => res && res.length &&
          this.setState({ documentation: res.length > 0 ? res[0] : res }));
    }
  };

  componentDidMount() {
    this.loadComponnet(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.name !== this.props.name || newProps.library !== this.props.library) {
      this.loadComponnet(newProps);
    }
  }
  render() {
    const {
      children, name, library, text, nav, footer, desc,
    } = this.props;
    const { documentation } = this.state;
    const { examples = {}, doc = desc, themeDoc } = documentation;
    return (
      <Page
        title={this.props.name}
        description={doc && doc.description}
        nav={nav}
        footer={footer}
      >
        <Box
          pad={{ vertical: 'medium' }}
          border='bottom'
        >
          <Box
            direction='row-responsive'
          >
            <Box basis='1/2' align='start'>
              <Heading level={1}>
                <strong>{name}</strong>
              </Heading>
              {doc ? (
                <Paragraph size='large'>
                  {doc.description}
                </Paragraph>
              ) : null}
              {text ? (
                <Paragraph size='large'>
                  {text}
                </Paragraph>
              ) : null}
              {(doc && doc.availableAt) ? (
                <Button href={doc.availableAt.url} target='_blank' >
                  {typeof doc.availableAt.badge === 'string' ? <img alt='Example badge' src={doc.availableAt.badge} /> : doc.availableAt.badge}
                </Button>
              ) : null}
            </Box>
            {examples['_starter'] && (
              <Box flex={true} pad={{ vertical: 'large' }} align='center'>
                <Example
                  library={library}
                  component={name}
                  example='_starter'
                >
                  {examples['_starter']}
                </Example>
              </Box>
            )}
          </Box>
        </Box>

        {doc ? (
          <Box>
            { doc.usage && (
              <Box
                pad={{ vertical: 'medium' }}
                border='bottom'
                gap='medium'
              >
                <Heading margin='none' level={2}><strong>usage</strong></Heading>
                <Box
                  background='light-2'
                  pad='medium'
                >
                  <Markdown>{`\`\`\`${doc.usage}\`\`\``}</Markdown>
                </Box>
              </Box>
            )}
            {doc.properties && (
            <Box
              pad={{ vertical: 'medium' }}
              border='bottom'
              gap='medium'
            >
              <Heading margin='none' level={2}><strong>documentation</strong></Heading>
              <Box
                background='light-2'
                pad='medium'
              >
                {doc.properties.map(property => (
                  <DocProperty
                    key={property.name}
                    property={property}
                    component={name}
                    library={library}
                    example={property.name}
                    code={examples[property.name]}
                  />
                  ))}
              </Box>
            </Box>
            )}
          </Box>
        ) : null}
        {themeDoc && (
          <Box
            pad={{ vertical: 'medium' }}
            border='bottom'
            gap='medium'
          >
            <Heading margin='none' level={2}><strong>theming</strong></Heading>
            <Box
              background='light-2'
              pad='medium'
            >
              <ThemeContext.Consumer>
                {theme =>
                  Object.keys(themeDoc).map((key) => {
                    const themeProp = themeDoc[key];
                    const props = key.split('.');
                    const themeValue = props.reduce(
                      (branch, prop) => (branch ? branch[prop] : null),
                      theme
                    );
                    return (
                      <DocProperty
                        key={key}
                        basis='1/3'
                        property={{ name: key, ...themeProp }}
                        defaultExample={themeValue && typeof themeValue !== 'string' ? <JSONPretty json={themeValue} /> : themeValue}
                      />
                    );
                  })
                }
              </ThemeContext.Consumer>
            </Box>
          </Box>
        )}
        {children}
      </Page>
    );
  }
}

Doc.propTypes = {
  name: PropTypes.string.isRequired,
  library: PropTypes.string,
  text: PropTypes.string,
  nav: PropTypes.bool,
  footer: PropTypes.bool,
};

Doc.defaultProps = {
  text: undefined,
  library: undefined,
  nav: true,
  footer: true,
};