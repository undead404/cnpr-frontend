import React from 'react';
import Layout from 'components/Layout';
import Logs from './Logs';

const title = 'Log In';

function action() {
  return {
    chunks: ['logs'],
    title,
    component: (
      <Layout>
        <Logs title={title} />
      </Layout>
    ),
  };
}

export default action;
