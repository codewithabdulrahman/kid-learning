'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calculator, Shapes, Plus, Play, Palette, ClipboardCheck } from 'lucide-react'

const NavContainer = styled.nav`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 100;
`

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.large};
  list-style: none;
  flex-wrap: wrap;
`

const NavItem = styled.li`
  position: relative;
`

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.3s ease;
  min-width: 80px;
  
  &:hover {
    background: ${props => props.theme.colors.background};
    transform: translateY(-2px);
  }
  
  svg {
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
  }
  
  span {
    font-size: ${props => props.theme.sizes.small};
    font-weight: bold;
  }
`

const Navigation = () => {
  const pathname = usePathname()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/counting', icon: Calculator, label: 'Count' },
    { path: '/shapes', icon: Shapes, label: 'Shapes' },
    { path: '/addition', icon: Plus, label: 'Add' },
    { path: '/videos', icon: Play, label: 'Videos' },
    { path: '/drawing', icon: Palette, label: 'Draw' },
    { path: '/assessments', icon: ClipboardCheck, label: 'Tests' }
  ]

  return (
    <NavContainer>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLink href={item.path} isActive={pathname === item.path}>
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  )
}

export default Navigation
