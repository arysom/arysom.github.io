const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  if (node.internal.type === `MarkdownRemark`) {

    const filename = createFilePath({ node, getNode, basePath: `blog` })

    // get the date and title from the file name
    const [, date, title] = filename.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    )

    // create a new slug concatenating everything
    const slug = `/${title}/`

    createNodeField({ node, name: `slug`, value: slug })
    createNodeField({ node, name: `date`, value: date })

  }
}

const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/components/blog-post.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {singlePost:true}, // additional data can be passed via context
      })
    })
  })
}