import React from 'react';
import Layout from 'components/Layout';
import Logs from './Logs';

export default async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{logs{allowed,confidence,datetime,id,plateNumber,region}}',
    }),
  });
  console.info(resp);
  let { data } = await resp.json();
  console.info(data);
  // if (!data || !data.logs) throw new Error('Failed to load the logs.');
  if (!data || !data.logs) data = { logs: [] };
  return {
    chunks: ['logs'],
    title: 'Logs',
    component: (
      <Layout>
        <Logs fetch={fetch} logs={data.logs} />
      </Layout>
    ),
  };
}
