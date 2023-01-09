import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { client } from 'libs/client'
import { type } from 'os'
import { Blog, Category } from 'types/blog'
import Link from 'next/link'

export const getStaticProps = async () => {
  const blog = await client.get({endpoint: "blogs"});
  const category = await client.get({endpoint: "categories"});

  return {
    props: {
      blogs: blog.contents,
      categories: category.contents,
    },
  };
};

type Props = {
  blogs: Blog[],
  categories: Category[],
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  categories,
}: Props) => {
  return (
    <div>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
