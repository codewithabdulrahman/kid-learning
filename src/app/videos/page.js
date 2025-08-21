'use client'

import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { Play, BookOpen, Star, Heart, Target, Award, TrendingUp } from 'lucide-react'

const VideosContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.large};
`

const Title = styled.h1`
  font-size: ${props => props.theme.sizes.xxlarge};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.large};
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const ChannelTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.large} 0;
  flex-wrap: wrap;
`

const ChannelTab = styled.button`
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: scale(1.05);
  }
`

const ConceptFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.large} 0;
  flex-wrap: wrap;
`

const ConceptButton = styled.button`
  background: ${props => props.isActive ? props.theme.colors.secondary : props.theme.colors.accent};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.small};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`

const VideoCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`

const ChannelBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${props => props.channelColor};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.sizes.small};
  font-weight: bold;
  z-index: 2;
`

const DifficultyBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.difficulty === 'Beginner' ? '#2ECC71' : props.difficulty === 'Intermediate' ? '#F39C12' : '#E74C3C'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.sizes.small};
  font-weight: bold;
  z-index: 2;
`

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  
  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.colors.primary};
    font-size: 3rem;
    z-index: 1;
  }
`

const VideoInfo = styled.div`
  padding: ${props => props.theme.spacing.medium};
`

const VideoTitle = styled.h3`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const VideoDescription = styled.p`
  font-size: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.spacing.small};
`

const VideoTags = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing.small};
`

const Tag = styled.span`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.sizes.small};
  font-weight: bold;
`

const LearningPath = styled.div`
  background: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  margin: ${props => props.theme.spacing.large} 0;
  text-align: center;
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.small};
  }
  
  p {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.sizes.medium};
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.large};
`

const ModalContent = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
  }
`

const YouTubeEmbed = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedConcept, setSelectedConcept] = useState('all')

  const channels = [
    { id: 'all', name: 'All Channels', color: '#9B59B6' },
    { id: 'numberblocks', name: 'Numberblocks', color: '#FF6B6B' },
    { id: 'sesame', name: 'Sesame Street', color: '#4ECDC4' },
    { id: 'pinkfong', name: 'Pinkfong!', color: '#FFE66D' },
    { id: 'supersimple', name: 'Super Simple Songs', color: '#2ECC71' },
    { id: 'jackhartmann', name: 'Jack Hartmann', color: '#F39C12' }
  ]

  const concepts = [
    { id: 'all', name: 'All Concepts' },
    { id: 'counting', name: 'Counting' },
    { id: 'shapes', name: 'Shapes' },
    { id: 'addition', name: 'Addition' },
    { id: 'patterns', name: 'Patterns' },
    { id: 'comparison', name: 'Comparison' }
  ]

  const mathVideos = [
    // Numberblocks - The #1 Recommendation
    {
      id: 'v=8jOzLOACgxI',
      title: 'Numberblocks - Counting 1-5',
      description: 'Meet the Numberblocks! Learn to count from 1 to 5 with fun characters.',
      channel: 'numberblocks',
      channelName: 'Numberblocks',
      channelColor: '#FF6B6B',
      concept: 'counting',
      difficulty: 'Beginner',
      tags: ['Counting', 'Numbers', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/8jOzLOACgxI/maxresdefault.jpg',
      learningPath: 'Step 1: Number Recognition'
    },
    {
      id: 'v=2X-HAFPHBzg',
      title: 'Numberblocks - Adding Together',
      description: 'See how Numberblocks combine to make bigger numbers!',
      channel: 'numberblocks',
      channelName: 'Numberblocks',
      channelColor: '#FF6B6B',
      concept: 'addition',
      difficulty: 'Beginner',
      tags: ['Addition', 'Numbers', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/2X-HAFPHBzg/maxresdefault.jpg',
      learningPath: 'Step 2: Simple Addition'
    },
    {
      id: 'v=7DjsD7S5EcM',
      title: 'Numberblocks - Shapes & Patterns',
      description: 'Learn shapes and patterns with the Numberblocks!',
      channel: 'numberblocks',
      channelName: 'Numberblocks',
      channelColor: '#FF6B6B',
      concept: 'shapes',
      difficulty: 'Beginner',
      tags: ['Shapes', 'Patterns', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/7DjsD7S5EcM/maxresdefault.jpg',
      learningPath: 'Step 3: Shapes & Patterns'
    },

    // Sesame Street
    {
      id: 'v=oLU06V1qNWg',
      title: 'Sesame Street - Count with Elmo',
      description: 'Count to 10 with Elmo and friends!',
      channel: 'sesame',
      channelName: 'Sesame Street',
      channelColor: '#4ECDC4',
      concept: 'counting',
      difficulty: 'Beginner',
      tags: ['Counting', 'Numbers', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/oLU06V1qNWg/maxresdefault.jpg',
      learningPath: 'Step 1: Number Recognition'
    },
    {
      id: 'v=dJZXqhQJUyM',
      title: 'Sesame Street - Shapes Song',
      description: 'Learn about circles, squares, and triangles!',
      channel: 'sesame',
      channelName: 'Sesame Street',
      channelColor: '#4ECDC4',
      concept: 'shapes',
      difficulty: 'Beginner',
      tags: ['Shapes', 'Geometry', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/dJZXqhQJUyM/maxresdefault.jpg',
      learningPath: 'Step 3: Shapes & Patterns'
    },

    // Pinkfong!
    {
      id: 'v=8jOzLOACgxI',
      title: 'Pinkfong! - Counting to 20',
      description: 'High-energy counting song to 20!',
      channel: 'pinkfong',
      channelName: 'Pinkfong!',
      channelColor: '#FFE66D',
      concept: 'counting',
      difficulty: 'Intermediate',
      tags: ['Counting', 'Numbers', 'Intermediate'],
      thumbnail: 'https://img.youtube.com/vi/8jOzLOACgxI/maxresdefault.jpg',
      learningPath: 'Step 4: Advanced Counting'
    },
    {
      id: 'v=2X-HAFPHBzg',
      title: 'Pinkfong! - Math Songs Compilation',
      description: 'Fun math songs about numbers and shapes!',
      channel: 'pinkfong',
      channelName: 'Pinkfong!',
      channelColor: '#FFE66D',
      concept: 'patterns',
      difficulty: 'Beginner',
      tags: ['Patterns', 'Songs', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/2X-HAFPHBzg/maxresdefault.jpg',
      learningPath: 'Step 3: Shapes & Patterns'
    },

    // Super Simple Songs
    {
      id: 'v=7DjsD7S5EcM',
      title: 'Super Simple Songs - 10 Little Dinosaurs',
      description: 'Gentle counting song with dinosaurs!',
      channel: 'supersimple',
      channelName: 'Super Simple Songs',
      channelColor: '#2ECC71',
      concept: 'counting',
      difficulty: 'Beginner',
      tags: ['Counting', 'Numbers', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/7DjsD7S5EcM/maxresdefault.jpg',
      learningPath: 'Step 1: Number Recognition'
    },
    {
      id: 'v=oLU06V1qNWg',
      title: 'Super Simple Songs - Shapes Song',
      description: 'Calm and clear shapes learning song!',
      channel: 'supersimple',
      channelName: 'Super Simple Songs',
      channelColor: '#2ECC71',
      concept: 'shapes',
      difficulty: 'Beginner',
      tags: ['Shapes', 'Geometry', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/oLU06V1qNWg/maxresdefault.jpg',
      learningPath: 'Step 3: Shapes & Patterns'
    },

    // Jack Hartmann
    {
      id: 'v=dJZXqhQJUyM',
      title: 'Jack Hartmann - Count and Workout',
      description: 'Count and move with Jack Hartmann!',
      channel: 'jackhartmann',
      channelName: 'Jack Hartmann',
      channelColor: '#F39C12',
      concept: 'counting',
      difficulty: 'Intermediate',
      tags: ['Counting', 'Movement', 'Intermediate'],
      thumbnail: 'https://img.youtube.com/vi/dJZXqhQJUyM/maxresdefault.jpg',
      learningPath: 'Step 4: Advanced Counting'
    },
    {
      id: 'v=8jOzLOACgxI',
      title: 'Jack Hartmann - Big and Small',
      description: 'Learn about size comparison with movement!',
      channel: 'jackhartmann',
      channelName: 'Jack Hartmann',
      channelColor: '#F39C12',
      concept: 'comparison',
      difficulty: 'Beginner',
      tags: ['Comparison', 'Movement', 'Beginner'],
      thumbnail: 'https://img.youtube.com/vi/8jOzLOACgxI/maxresdefault.jpg',
      learningPath: 'Step 5: Size Comparison'
    }
  ]

  const filteredVideos = mathVideos.filter(video => {
    const channelMatch = selectedChannel === 'all' || video.channel === selectedChannel
    const conceptMatch = selectedConcept === 'all' || video.concept === selectedConcept
    return channelMatch && conceptMatch
  })

  const openVideo = (video) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <VideosContainer>
          <Title>📺 Math Learning Videos 📺</Title>
          
          <LearningPath>
            <h3>🌟 Learning Path: Watch → Learn → Practice → Assess 🌟</h3>
            <p>Complete video lessons, then take assessments to unlock the next level!</p>
          </LearningPath>

          <ChannelTabs>
            {channels.map((channel) => (
              <ChannelTab
                key={channel.id}
                isActive={selectedChannel === channel.id}
                onClick={() => setSelectedChannel(channel.id)}
              >
                {channel.name}
              </ChannelTab>
            ))}
          </ChannelTabs>

          <ConceptFilter>
            {concepts.map((concept) => (
              <ConceptButton
                key={concept.id}
                isActive={selectedConcept === concept.id}
                onClick={() => setSelectedConcept(concept.id)}
              >
                {concept.name}
              </ConceptButton>
            ))}
          </ConceptFilter>
          
          <VideoGrid>
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <VideoCard onClick={() => openVideo(video)} whileHover={{ scale: 1.02 }}>
                  <ChannelBadge channelColor={video.channelColor}>
                    {video.channelName}
                  </ChannelBadge>
                  <DifficultyBadge difficulty={video.difficulty}>
                    {video.difficulty}
                  </DifficultyBadge>
                  <VideoThumbnail>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Play className="play-icon" />
                  </VideoThumbnail>
                  <VideoInfo>
                    <VideoTitle>{video.title}</VideoTitle>
                    <VideoDescription>{video.description}</VideoDescription>
                    <VideoTags>
                      {video.tags.map((tag, tagIndex) => (
                        <Tag key={tagIndex}>{tag}</Tag>
                      ))}
                    </VideoTags>
                    <div style={{ 
                      background: '#f0f0f0', 
                      padding: '8px', 
                      borderRadius: '8px', 
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      📚 {video.learningPath}
                    </div>
                  </VideoInfo>
                </VideoCard>
              </motion.div>
            ))}
          </VideoGrid>

          <AnimatePresence>
            {selectedVideo && (
              <Modal
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeVideo}
              >
                <ModalContent onClick={(e) => e.stopPropagation()}>
                  <CloseButton onClick={closeVideo}>×</CloseButton>
                  <h2 style={{ marginBottom: '20px', color: '#2C3E50' }}>
                    {selectedVideo.title}
                  </h2>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    <strong>Channel:</strong> {selectedVideo.channelName} | 
                    <strong> Difficulty:</strong> {selectedVideo.difficulty} | 
                    <strong> Learning Path:</strong> {selectedVideo.learningPath}
                  </p>
                  <YouTubeEmbed>
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </YouTubeEmbed>
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    background: '#f8f9fa', 
                    borderRadius: '8px',
                    border: '2px solid #4ECDC4'
                  }}>
                    <h4 style={{ color: '#2C3E50', marginBottom: '10px' }}>🎯 After Watching:</h4>
                    <ul style={{ textAlign: 'left', color: '#666' }}>
                      <li>Practice the concept with real objects</li>
                      <li>Take the assessment to unlock the next level</li>
                      <li>Complete hands-on activities</li>
                    </ul>
                  </div>
                </ModalContent>
              </Modal>
            )}
          </AnimatePresence>
        </VideosContainer>
      </div>
    </ThemeProvider>
  )
}
