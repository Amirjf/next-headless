import parse, { domToReact } from 'html-react-parser';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { getAllPostSlugs, getPostAndMorePosts } from '../../src/apollo/api';
import {
  formatDate,
  metaDescription,
  removeTags,
} from '../../src/utils/miscellaneous';

const Post = ({ blog, blogs }: any) => {
  console.log(blog, blogs);
  const router = useRouter();
  blogs = blogs?.edges;

  if (!router.isFallback && !blog?.slug) {
    return <>ERROR</>;
  }

  function makeExcerpt(desc: string) {
    var excerpt = removeTags(desc);
    excerpt = metaDescription(excerpt);
    return excerpt;
  }

  const replaceImage = {
    replace: ({ name, attribs, children }: any) => {
      if (name === 'figure' && /wp-block-image/.test(attribs.class)) {
        return <>{domToReact(children, replaceImage)}</>;
      }

      if (name === 'img') {
        return (
          <Image
            src={attribs.src}
            width={attribs.width}
            height={attribs.height}
            layout="fill"
            alt={
              attribs.alt
                ? attribs.alt
                : 'Image - this image does not have an alt text, please let me know.'
            }
          />
        );
      }
    },
  };

  return (
    <>
      {router.isFallback ? (
        <>Loading ...</>
      ) : (
        <>
          <Head>
            <title>{blog.title} - Kasper Aamodt</title>
            <meta content={makeExcerpt(blog.excerpt)} name="description" />
          </Head>
          <main>
            <span>{formatDate(blog.date)}</span>

            <h1 style={{ marginTop: '0px' }}>{blog.title}</h1>
            {blog.featuredImage && (
              <Image
                style={{ width: '50%' }}
                src={blog.featuredImage.node.sourceUrl}
                height={blog.featuredImage.node.mediaDetails.height}
                width={blog.featuredImage.node.mediaDetails.width}
                alt="Hero image"
                layout="fill"
                priority
              />
            )}
            <div style={{ marginBottom: '0px' }}>
              {parse(blog.content, replaceImage)}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticProps({ params }: any) {
  const data = await getPostAndMorePosts(params.slug);

  return {
    props: {
      blog: data.post,
      blogs: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostSlugs();

  return {
    paths: allPosts.edges.map(({ node }: any) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}
