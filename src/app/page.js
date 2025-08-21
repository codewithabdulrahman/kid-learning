'use client'

import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Navigation from './components/Navigation'
import HomeContent from './components/HomeContent'
import theme from './styles/theme'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navigation />
        <HomeContent />
      </AppContainer>
    </ThemeProvider>
  )
}
