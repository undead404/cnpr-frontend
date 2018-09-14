import React from 'react';
import Layout from 'components/Layout';
import Recognized from './Recognized';

const title = 'Admin Page';
function action(context) {
  console.info(context.fetch);
  return {
    chunks: ['recognized'],
    title,
    component: (
      <Layout>
        <Recognized plateNumber={context.params.plateNumber} />
      </Layout>
    ),
  };
}

export default action;
