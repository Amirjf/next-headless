import React from 'react';
import client from '../src/apollo/client';
import { GET_PAGES_URI } from '../src/queries/pages/get-pages';
import { useRouter } from 'next/router';
import { GET_PAGE } from '../src/queries/pages/get-page';
import { isEmpty } from 'lodash';
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from '../src/utils/slug';

const Page = () => {
  return <div>sd</div>;
};

export default Page;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGES_URI,
  });

  const pathsData: any = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map((page: any) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        const slugs = page?.uri?.split('/').filter((pageSlug: any) => pageSlug);
        pathsData.push({ params: { slug: slugs } });
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}

export async function getStaticProps({ params }: any) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join('/'),
    },
  });

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
}
