import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout";
import SEO from "../components/seo"
// import '../css/blog-post.css';

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout singlePost={true}>
    <SEO title={`${post.frontmatter.title}`} keywords={[`gatsby`, `application`, `react`]} />
    <div className="blog-post-container">
      <div className="blog-post">
                <span className="blog-post-date">{post.fields.date}</span>
        <h1>{post.frontmatter.title}</h1>
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