import React from 'react';
import Layout from 'components/Layout';
import Config from './Config';

export default function action() {
  return {
    chunks: ['config'],
    title: 'CNPR: config',
    component: (
      <Layout>
        <Config />
      </Layout>
    ),
  };
}
