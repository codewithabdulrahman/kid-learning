'use client'

import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { CheckCircle, RotateCcw, Volume2, VolumeX } from 'lucide-react'

const ShapesContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.large};
  text-align: center;
`

const Title = styled.h1`
  font-size: ${props => props.theme.sizes.xxlarge};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.large};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const GameArea = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xlarge};
  margin: 0 auto;
  max-width: 800px;
  box-shadow: ${props => props.theme.shadows.large};
`

const ShapeDisplay = styled.div`
  font-size: 8rem;
  margin: ${props => props.theme.spacing.large} 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`

const QuestionText = styled.p`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.text};
  margin: ${props => props.theme.spacing.large} 0;
  font-weight: bold;
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.large};
  margin: ${props => props.theme.spacing.large} 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

const OptionButton = styled(motion.button)`
  background: ${props => props.isSelected ? props.theme.colors.success : props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
`

const Button = styled.button`
  background: ${props => props.bgColor || props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.large};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  overflow: hidden;
  margin: ${props => props.theme.spacing.large} 0;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.success};
  border-radius: 10px;
`

const Feedback = styled(motion.div)`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.success};
  margin: ${props => props.theme.spacing.medium} 0;
  font-weight: bold;
`

const ScoreDisplay = styled.div`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.primary};
  margin: ${props => props.theme.spacing.medium} 0;
  font-weight: bold;
`

export default function Shapes() {
  const [currentShape, setCurrentShape] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const shapes = [
    { emoji: '🔴', name: 'Circle', color: '#FF6B6B' },
    { emoji: '🟦', name: 'Square', color: '#4ECDC4' },
    { emoji: '🔺', name: 'Triangle', color: '#FFE66D' },
    { emoji: '🟨', name: 'Rectangle', color: '#2ECC71' },
    { emoji: '🟣', name: 'Diamond', color: '#9B59B6' },
    { emoji: '🟠', name: 'Star', color: '#F39C12' }
  ]

  const playSound = (frequency, duration) => {
    if (isMuted) return
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return // Prevent multiple selections
    
    setSelectedOption(option)
    
    if (option === shapes[currentShape].name) {
      setScore(score + 1)
      playSound(800, 0.5)
      setShowFeedback(true)
      
      setTimeout(() => {
        setShowFeedback(false)
        if (currentShape < shapes.length - 1) {
          setCurrentShape(currentShape + 1)
          setSelectedOption(null)
        } else {
          setGameCompleted(true)
        }
      }, 1500)
    } else {
      playSound(200, 0.3)
      setShowFeedback(true)
      
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedOption(null)
      }, 1500)
    }
  }

  const resetGame = () => {
    setCurrentShape(0)
    setSelectedOption(null)
    setScore(0)
    setGameCompleted(false)
    setShowFeedback(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (currentShape < shapes.length) {
      playSound(300 + (currentShape * 100), 0.3)
    }
  }, [currentShape])

  if (gameCompleted) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <ShapesContainer>
            <GameArea>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={100} color="#2ECC71" />
                <Title>🎉 Shape Master! 🎉</Title>
                <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
                  You've learned all the shapes!
                </p>
                <ScoreDisplay>Final Score: {score}/{shapes.length}</ScoreDisplay>
                <Button onClick={resetGame} bgColor="#4ECDC4">
                  Play Again
                </Button>
              </motion.div>
            </GameArea>
          </ShapesContainer>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <ShapesContainer>
          <Title>🔷 Let's Learn Shapes! 🔷</Title>
          
          <GameArea>
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${((currentShape + 1) / shapes.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </ProgressBar>
            
            <ScoreDisplay>Score: {score}/{shapes.length}</ScoreDisplay>
            
            <ShapeDisplay style={{ color: shapes[currentShape].color }}>
              {shapes[currentShape].emoji}
            </ShapeDisplay>
            
            <QuestionText>
              What shape is this?
            </QuestionText>
            
            <OptionsGrid>
              {shapes.map((shape, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleOptionClick(shape.name)}
                  disabled={selectedOption !== null}
                  isSelected={selectedOption === shape.name}
                  whileHover={{ scale: selectedOption === null ? 1.05 : 1 }}
                  whileTap={{ scale: selectedOption === null ? 0.95 : 1 }}
                >
                  {shape.emoji} {shape.name}
                </OptionButton>
              ))}
            </OptionsGrid>
            
            <AnimatePresence>
              {showFeedback && (
                <Feedback
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  {selectedOption === shapes[currentShape].name ? 'Correct! 🎉' : 'Try again! 💪'}
                </Feedback>
              )}
            </AnimatePresence>
            
            <Controls>
              <Button onClick={toggleMute} bgColor="#9B59B6">
                {isMuted ? <VolumeX /> : <Volume2 />}
                {isMuted ? ' Unmute' : ' Mute'}
              </Button>
              <Button onClick={resetGame} bgColor="#F39C12">
                <RotateCcw />
                Reset
              </Button>
            </Controls>
          </GameArea>
        </ShapesContainer>
      </div>
    </ThemeProvider>
  )
}
