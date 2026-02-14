const React = require("react")
const meta = require("./gatsby-meta-config")

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  const betterlyticsSiteId = meta.analytics?.betterlyticsSiteId
  if (betterlyticsSiteId) {
    setHeadComponents([
      React.createElement("script", {
        key: "betterlytics",
        async: true,
        src: "https://betterlytics.io/analytics.js",
        "data-site-id": betterlyticsSiteId,
      }),
    ])
  }

  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-script",
      dangerouslySetInnerHTML: {
        __html: `
          (() => {    
            window.__onThemeChange = function() {};      

            function setTheme(newTheme) {                  
              window.__theme = newTheme;                  
              preferredTheme = newTheme;                  
              document.body.className = newTheme;
              document.body.dataset.theme = newTheme;                 
              window.__onThemeChange(newTheme);                
            }

            let preferredTheme

            try {
              preferredTheme = localStorage.getItem('theme')
            } catch (err) {}

            window.__setPreferredTheme = newTheme => {
              setTheme(newTheme)

              try {
                localStorage.setItem('theme', newTheme)
              } catch (err) {}
            }

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

            darkQuery.addEventListener('change', e => {
              window.__setPreferredTheme(e.matches ? 'dark' : 'light')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
          })()
        `,
      },
    }),
  ])
}
