import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="py-4">
        {posts
          .map(({ node: post }) => {
            return (
              <div className="py-4" key={post.id}>
                <span>{post.fields.date}</span>
                <h1 className="mb-2">
                <Link className="no-underline text-orange-dark hover:text-orange-lighter" to={post.fields.slug}>{post.frontmatter.title}</Link>
</h1>
                <p className="leading-normal text-black">{post.excerpt}</p>
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
