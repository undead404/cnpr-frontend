import React from 'react';
import Layout from 'components/Layout';
import List from './List';

export default async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{plates{id,number,allowed,last_seen}}',
    }),
  });
  console.info(resp);
  const { data } = await resp.json();
  console.info(data);
  if (!data || !data.plates) throw new Error('Failed to load the plates.');
  return {
    title: 'CNPR: Plates',
    chunks: ['list'],
    component: (
      <Layout>
        <List fetch={fetch} plates={data.plates} />
      </Layout>
    ),
  };
}
