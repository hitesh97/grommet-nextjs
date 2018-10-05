// eslint-disable-next-line no-underscore-dangle
export const _starter = `const Demo = () => (
  <Menu
    tabIndex='-1'
    label='Actions'
    items={['small', 'medium', 'large', 'xlarge', 'huge']
      .map(item => ({ label: item, onClick: () => {} }))}
  />
);

render(<Demo />);  
`;
