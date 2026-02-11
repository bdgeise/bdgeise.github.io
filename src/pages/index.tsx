import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import SEO from "~/src/components/seo"
import Layout from "~/src/layouts/layout"
import Markdown from "~/src/styles/markdown"
import { rhythm } from "~/src/styles/typography"

const Home = () => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query About {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/.*/about.md$/" } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)

  const markdown = data.allMarkdownRemark.edges[0].node.html

  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection>
        <ProfileImageWrapper>
          <StaticImage
            src="../images/profile.png"
            alt="Profile photo"
            placeholder="blurred"
            width={200}
          />
        </ProfileImageWrapper>
        <Container
          dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
          rhythm={rhythm}
        ></Container>
      </HeroSection>
    </Layout>
  )
}

const HeroSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  width: calc(var(--post-width) * 1.2);
  margin: 80px auto 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    flex-direction: column;
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }
`

const ProfileImageWrapper = styled.div`
  flex-shrink: 0;

  .gatsby-image-wrapper {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    img {
      transform: translateY(0px);
    }
  }
`

const Container = styled(Markdown).attrs({
  as: "main",
})`
  flex: 1;

  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.25rem;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    margin-top: 0;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }
`

export default Home
