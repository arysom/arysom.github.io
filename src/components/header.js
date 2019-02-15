import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-black shadow-md">
    <div className="container mx-auto py-4">
      <h1 className="font-black tracking-wide text-4xl ">
        <Link to="/" className="hover:text-orange no-underline text-white">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
