import Text from 'antd/lib/typography/Text';
import React from 'react';
import styled from 'styled-components';

const foo = '#293845';

const Styled = styled(Text)`
  font-size: 2rem;
  font-weight: 500;
  color: rgba(0, 129, 198, 1);
  margin: ${props => props.margin || '40px 0 20px'};
`;
export const Title = ({ children }) => {
  return <Styled>{children}</Styled>;
};
