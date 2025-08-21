'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, Shapes, Plus, Play, Palette, Star, ClipboardCheck } from 'lucide-react'

const HomeContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xlarge};
  text-align: center;
`

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.sizes.xxlarge};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.large};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.xlarge};
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
`

const ActivityCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`

const ActivityIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${props => props.theme.spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  border-radius: 50%;
  color: white;
  
  svg {
    width: 40px;
    height: 40px;
  }
`

const ActivityTitle = styled.h3`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const ActivityDescription = styled.p`
  font-size: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
`

const WelcomeMessage = styled(motion.div)`
  background: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: ${props => props.theme.spacing.xlarge};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.small};
  }
  
  p {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.sizes.medium};
  }
`

const HomeContent = () => {
  const activities = [
    {
      path: '/counting',
      icon: Calculator,
      title: 'Counting Fun',
      description: 'Learn to count with fun animals and objects!',
      bgColor: '#FF6B6B'
    },
    {
      path: '/shapes',
      icon: Shapes,
      title: 'Shape Explorer',
      description: 'Discover circles, squares, triangles and more!',
      bgColor: '#4ECDC4'
    },
    {
      path: '/addition',
      icon: Plus,
      title: 'Adding Together',
      description: 'Join numbers and see them grow!',
      bgColor: '#FFE66D'
    },
    {
      path: '/videos',
      icon: Play,
      title: 'Math Videos',
      description: 'Watch fun videos about numbers and shapes!',
      bgColor: '#2ECC71'
    },
    {
      path: '/drawing',
      icon: Palette,
      title: 'Drawing Time',
      description: 'Draw and trace numbers and shapes!',
      bgColor: '#9B59B6'
    },
    {
      path: '/assessments',
      icon: ClipboardCheck,
      title: 'Take Tests',
      description: 'Test your knowledge and earn achievements!',
      bgColor: '#E74C3C'
    }
  ]

  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎉 Welcome to Math World! 🎉
      </Title>
      
      <Subtitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Let's learn numbers, shapes, and counting together!
      </Subtitle>

      <WelcomeMessage
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>🌟 Ready to Start Learning? 🌟</h2>
        <p>Choose an activity below and let's have fun with math!</p>
      </WelcomeMessage>

      <ActivitiesGrid>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.path}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
          >
            <Link href={activity.path} style={{ textDecoration: 'none' }}>
              <ActivityCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ActivityIcon bgColor={activity.bgColor}>
                  <activity.icon />
                </ActivityIcon>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDescription>{activity.description}</ActivityDescription>
              </ActivityCard>
            </Link>
          </motion.div>
        ))}
      </ActivitiesGrid>
    </HomeContainer>
  )
}

export default HomeContent
