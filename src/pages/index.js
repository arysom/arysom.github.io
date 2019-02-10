import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="blog-posts">
        {posts
          .map(({ node: post }) => {
            return (
              <div className="blog-post-preview" key={post.id}>
                <span className="blog-post-date">{post.fields.date}</span>
                <h1>
                <Link style={{
                  textDecoration:`none`
                }} to={post.fields.slug}>{post.frontmatter.title}</Link>
</h1>
                <p>{post.excerpt}</p>
                <p className="tags"></p>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [fields___date]}) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            date
            slug
          }
          frontmatter {
            title
            tags
            categories
          }
        }
      }
    }
  }
`
