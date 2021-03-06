// eslint-disable-next-line no-underscore-dangle
export const plain = `class Demo extends React.Component {
  constructor(){
    super();
    this.state = {
      show: false,
      plain: undefined,
    };
  }  
  render() {
    const { plain, show } = this.state;
    let layerNode;
    if (show) {
      const close = () => this.setState({ show: false });
      layerNode = (
        <Layer
          plain={plain}
          onEsc={close}
        >
          <Box pad={{ horizontal: 'medium' }}>
            <Heading level={2} margin='medium'>Confirm</Heading>
            <Text>
              Are you sure you want to close this layer?
            </Text>
            <Box align='start' margin={{ vertical: 'medium' }}>
              <Button primary={true} label='Sure, close it' onClick={close} />
            </Box>
          </Box>
        </Layer>
      );
    }     
    return (
      <Box>
        {[true, false].map(plainValue => (
          <Box key={plainValue} margin='small'>
            <Button
              active={plainValue === plain}
              label={plainValue.toString()}
              onClick={() => this.setState({ show: true, plain: plainValue })}
            />
          </Box>
        ))}
        {layerNode}
      </Box>
    );  
  }
}

render(<Demo />);
`;
