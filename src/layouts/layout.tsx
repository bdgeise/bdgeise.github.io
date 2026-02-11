import React from "react"

import styled, { ThemeProvider } from "styled-components"

import Footer from "~/src/components/footer/footer"
import NavBar from "~/src/components/navBar/navBar"
import useSiteMetadata from "~/src/hooks/useSiteMetadata"
import useTheme from "~/src/hooks/useTheme"
import ThemeContext from "~/src/stores/themeContext"
import GlobalStyle from "~/src/styles/globalStyle"
import styledTheme from "~/src/styles/styledTheme"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme, themeToggler } = useTheme()
  const { title } = useSiteMetadata()

  return (
    <ThemeProvider theme={styledTheme}>
      <ThemeContext.Provider value={theme}>
        <GlobalStyle />
        <PageWrapper>
          <Container>
            <NavBar title={title} themeToggler={themeToggler} />
            {children}
          </Container>
          <Footer />
        </PageWrapper>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Container = styled.div`
  flex: 1;
  width: 100%;
  background-color: var(--color-post-background);
`

export default Layout
