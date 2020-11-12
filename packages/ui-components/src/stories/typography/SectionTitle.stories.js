import React from 'react';

import { SectionTitle } from '../../components/typography/SectionTitle';

export default {
  title: 'Typography/SectionTitle',
  component: SectionTitle,
};

export const Default = (args) => <SectionTitle {...args}>Lorem ipsum</SectionTitle>;

export const Loading = Default.bind({});
Loading.args = {
  loading: true,
};

export const ChangedColor = Default.bind({});
ChangedColor.args = {
  loading: true,
  loadingColor: 'red',
};
