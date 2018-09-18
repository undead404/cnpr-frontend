import React from 'react';
import Layout from 'components/Layout';
import Config from './Config';

export default async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query:
        '{config{configVersion,minConfidence,minNumberLength,recognitionDelay}}',
    }),
  });
  let { data } = await resp.json();
  console.info(data);
  if (!data || !data.config) data = { config: {} };
  return {
    chunks: ['config'],
    title: 'Config',
    component: (
      <Layout>
        <Config config={data.config} fetch={fetch} />
      </Layout>
    ),
  };
}
