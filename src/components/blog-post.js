import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout";
import SEO from "../components/seo"
import './blog-post.css';

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout singlePost={true}>
    <SEO title={`${post.frontmatter.title}`} keywords={[`gatsby`, `application`, `react`]} />
    <div className="blog-post container mx-auto antialiased py-4">
      <div className="py-4">
                <span>{post.fields.date}</span>
        <h1 className="blog-post-title">{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
</Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
          slug
          date
      }
      frontmatter {
        title
      }
    }
  }
`
