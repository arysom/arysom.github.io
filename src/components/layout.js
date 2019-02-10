import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import Header from "./header"
import "./layout.css"

const Layout = ({ children, singlePost }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 50,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
{ singlePost && <Link style={{
  border: `1px solid black`,
  padding: '5px 10px',
  marginLeft: 25
}} to="/">Back to index</Link> }
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
