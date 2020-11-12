import React from 'react';
import styled from 'styled-components';

import { STFIcon, IOSShareIcon } from '../components/icons';

const Container = styled.div`
  display: flex;
  svg {
    margin: 10px;
  }
`;

export const Default = (args) => (
  <Container>
    <STFIcon {...args} />
    <IOSShareIcon {...args} />
  </Container>
);

export default {
  title: 'Icons',
  component: Default,
  argTypes: {
    fontSize: {
      control: {
        type: 'select',
        options: ['default', 'inherit', 'small', 'large'],
      },
    },
  },
};
