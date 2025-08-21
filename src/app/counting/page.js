'use client'

import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { Volume2, VolumeX, RotateCcw, CheckCircle } from 'lucide-react'

const CountingContainer = styled.div`
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

const NumberDisplay = styled.div`
  font-size: 8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: ${props => props.theme.spacing.large} 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`

const ObjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

const ObjectItem = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &.counted {
    background: ${props => props.theme.colors.success};
    transform: scale(1.2);
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
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

export default function Counting() {
  const [currentNumber, setCurrentNumber] = useState(1)
  const [countedObjects, setCountedObjects] = useState([])
  const [isMuted, setIsMuted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

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

  const handleObjectClick = (index) => {
    if (countedObjects.length < currentNumber && !countedObjects.includes(index)) {
      const newCounted = [...countedObjects, index]
      setCountedObjects(newCounted)
      
      playSound(440 + (newCounted.length * 50), 0.2)
      
      if (newCounted.length === currentNumber) {
        setShowFeedback(true)
        playSound(800, 0.5)
        setTimeout(() => {
          setShowFeedback(false)
          if (currentNumber < 10) {
            setCurrentNumber(currentNumber + 1)
            setCountedObjects([])
          } else {
            setGameCompleted(true)
          }
        }, 1500)
      }
    }
  }

  const resetGame = () => {
    setCurrentNumber(1)
    setCountedObjects([])
    setGameCompleted(false)
    setShowFeedback(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (currentNumber <= 5) {
      playSound(200 + (currentNumber * 100), 0.3)
    }
  }, [currentNumber])

  if (gameCompleted) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <CountingContainer>
            <GameArea>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={100} color="#2ECC71" />
                <Title>🎉 Congratulations! 🎉</Title>
                <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
                  You've learned to count to 10!
                </p>
                <Button onClick={resetGame} bgColor="#4ECDC4">
                  Play Again
                </Button>
              </motion.div>
            </GameArea>
          </CountingContainer>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <CountingContainer>
          <Title>🔢 Let's Count Together! 🔢</Title>
          
          <GameArea>
            <NumberDisplay>{currentNumber}</NumberDisplay>
            
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${(countedObjects.length / currentNumber) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </ProgressBar>
            
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              Click {currentNumber} objects to count them!
            </p>
            
            <ObjectsGrid>
              {Array.from({ length: 10 }, (_, index) => (
                <ObjectItem
                  key={index}
                  className={countedObjects.includes(index) ? 'counted' : ''}
                  onClick={() => handleObjectClick(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {['🐶', '🐱', '🐰', '🐸', '🐵', '🐼', '🐨', '🦊', '🐯', '🦁'][index]}
                </ObjectItem>
              ))}
            </ObjectsGrid>
            
            <AnimatePresence>
              {showFeedback && (
                <Feedback
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  Great job! 🎉
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
        </CountingContainer>
      </div>
    </ThemeProvider>
  )
}
