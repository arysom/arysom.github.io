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
        <div className="flex flex-col min-h-screen">
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container flex-1 mx-auto py-4 antialiased font-sans">
          <main>{children}</main>
        </div>

          <footer className="w-full py-4 pin-b text-center border-t border-grey p-4">
            © {new Date().getFullYear()}, Built with <a className="no-underline text-red hover:text-green" href="https://www.gatsbyjs.org">Gatsby</a> and <a href="https://tailwindcss.com" className="no-underline text-green hover:text-red">Tailwind</a>
{ singlePost && <Link className="bg-transparent hover:bg-blue text-blue-dark font-bold no-underline hover:text-white py-2 ml-2 px-4 border border-blue hover:border-transparent rounded" to="/">Back to index</Link> }
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
