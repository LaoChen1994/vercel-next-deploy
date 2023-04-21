import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXProvider } from "@mdx-js/react";
import Content from './content/start.mdx';
import paths from './data';

interface IProps {
  id: string;
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: paths.map((item) => ({
    params: {
      id: item.path,
    },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<IProps, any> = (ctx) => {
  const { id } = ctx.params
  return {
    props: {
      id,
    },
  }
}

const BlogDetail = (props: IProps) => {
  const { id } = props

  console.log(id)

  return (
    <div className="flex flex-col">
      <MDXProvider>
        <Content />
      </MDXProvider>
    </div>
  )
}

export default BlogDetail
