import React from "react"
import { Helmet } from "react-helmet"
export const DocTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
