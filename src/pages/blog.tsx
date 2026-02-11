import React, { useLayoutEffect, useState } from "react"

import { type PageProps, graphql } from "gatsby"
import styled from "styled-components"

import CategoryFilter from "~/src/components/catetgoryFilter"
import PostGrid from "~/src/components/postGrid"
import SEO from "~/src/components/seo"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import Layout from "~/src/layouts/layout"
import type Post from "~/src/types/Post"

const Blog = ({
  pageContext,
  data,
}: PageProps<Queries.Query, Queries.MarkdownRemarkFrontmatter>) => {
  const [posts, setPosts] = useState<Post[]>([])
  const currentCategory = pageContext.category
  const postData = data.allMarkdownRemark.edges

  useLayoutEffect(() => {
    const filteredPostData = currentCategory
      ? postData.filter(
          ({ node }) => node?.frontmatter?.category === currentCategory,
        )
      : postData

    const mapped = filteredPostData.map(({ node }) => {
      const { id, fields, frontmatter } = node
      const { slug } = fields!
      const { title, desc, date, category, thumbnail, alt } = frontmatter!
      const { childImageSharp } = thumbnail!

      return {
        id,
        slug,
        title,
        desc,
        date,
        category,
        thumbnail: childImageSharp?.id,
        alt,
      }
    })

    setPosts(mapped)
  }, [currentCategory, postData])

  const site = useSiteMetadata()
  const postTitle = currentCategory || site.postTitle

  const hasCategories = data.allMarkdownRemark.group.length > 0

  return (
    <Layout>
      <SEO title="Blog" />
      <Main>
        <Content>
          {hasCategories && (
            <CategoryFilter categoryList={data.allMarkdownRemark.group} />
          )}
          <PostTitle>{postTitle}</PostTitle>
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <EmptyMessage>No posts yet. Check back soon!</EmptyMessage>
          )}
        </Content>
      </Main>
    </Layout>
  )
}

const Main = styled.main`
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`

const Content = styled.div`
  box-sizing: content-box;
  width: 87.5%;
  max-width: var(--width);
  padding-top: var(--sizing-lg);
  padding-bottom: var(--sizing-lg);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-top: var(--grid-gap-lg);
    width: 87.5%;
  }
`

const EmptyMessage = styled.p`
  font-size: var(--text-base);
  color: var(--color-gray-6);
  text-align: center;
  margin-top: var(--sizing-lg);
`

const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-extra-bold);
  margin-bottom: var(--sizing-md);
  line-height: 1.21875;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1.75rem;
  }
`

export const query = graphql`
  query Home {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(posts/blog)/" } }
      limit: 2000
      sort: { frontmatter: { date: DESC } }
    ) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            category
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
            alt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Blog
