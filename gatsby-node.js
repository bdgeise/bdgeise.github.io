const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFields
    }
    type MarkdownRemarkFrontmatter {
      title: String
      desc: String
      date: Date @dateformat
      category: String
      thumbnail: File @fileByRelativePath
      alt: String
    }
    type MarkdownRemarkFields {
      slug: String
    }
  `)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`./src/pages/blog.tsx`)
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const posts = result.data?.postsRemark?.edges ?? []

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  const categories = result.data?.categoriesGroup?.group ?? []

  categories.forEach(category => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: blogTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })
}
