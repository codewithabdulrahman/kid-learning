'use client'

import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { CheckCircle, RotateCcw, Volume2, VolumeX, Plus, Minus } from 'lucide-react'

const AdditionContainer = styled.div`
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

const ProblemDisplay = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: ${props => props.theme.spacing.large} 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.large};
`

const NumberBox = styled.div`
  background: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  min-width: 120px;
  box-shadow: ${props => props.theme.shadows.medium};
`

const OperatorBox = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  min-width: 80px;
  color: white;
  font-weight: bold;
  box-shadow: ${props => props.theme.shadows.medium};
`

const AnswerInput = styled.input`
  font-size: 3rem;
  text-align: center;
  border: 3px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.medium};
  width: 150px;
  margin: ${props => props.theme.spacing.large} 0;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 10px ${props => props.theme.colors.secondary};
  }
`

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.success};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.large};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: ${props => props.theme.spacing.medium};
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const VisualAids = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
  flex-wrap: wrap;
`

const VisualItem = styled.div`
  font-size: 2rem;
  padding: ${props => props.theme.spacing.small};
  background: ${props => props.theme.colors.background};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.small};
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

const DifficultySelector = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
`

const DifficultyButton = styled.button`
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

export default function Addition() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [problems, setProblems] = useState([])

  const generateProblems = (level) => {
    const newProblems = []
    for (let i = 0; i < 10; i++) {
      let num1, num2
      switch (level) {
        case 'easy':
          num1 = Math.floor(Math.random() * 5) + 1
          num2 = Math.floor(Math.random() * 5) + 1
          break
        case 'medium':
          num1 = Math.floor(Math.random() * 10) + 1
          num2 = Math.floor(Math.random() * 10) + 1
          break
        case 'hard':
          num1 = Math.floor(Math.random() * 15) + 1
          num2 = Math.floor(Math.random() * 15) + 1
          break
        default:
          num1 = Math.floor(Math.random() * 5) + 1
          num2 = Math.floor(Math.random() * 5) + 1
      }
      newProblems.push({ num1, num2, answer: num1 + num2 })
    }
    return newProblems
  }

  useEffect(() => {
    setProblems(generateProblems(difficulty))
  }, [difficulty])

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

  const handleSubmit = () => {
    const answer = parseInt(userAnswer)
    if (isNaN(answer)) return
    
    if (answer === problems[currentProblem].answer) {
      setScore(score + 1)
      playSound(800, 0.5)
      setShowFeedback(true)
      
      setTimeout(() => {
        setShowFeedback(false)
        if (currentProblem < problems.length - 1) {
          setCurrentProblem(currentProblem + 1)
          setUserAnswer('')
        } else {
          setGameCompleted(true)
        }
      }, 1500)
    } else {
      playSound(200, 0.3)
      setShowFeedback(true)
      
      setTimeout(() => {
        setShowFeedback(false)
        setUserAnswer('')
      }, 1500)
    }
  }

  const resetGame = () => {
    setCurrentProblem(0)
    setUserAnswer('')
    setScore(0)
    setGameCompleted(false)
    setShowFeedback(false)
    setProblems(generateProblems(difficulty))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty)
    resetGame()
  }

  useEffect(() => {
    if (currentProblem < problems.length) {
      playSound(300 + (currentProblem * 50), 0.3)
    }
  }, [currentProblem])

  if (gameCompleted) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <AdditionContainer>
            <GameArea>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={100} color="#2ECC71" />
                <Title>🎉 Math Champion! 🎉</Title>
                <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
                  You've completed all the addition problems!
                </p>
                <ScoreDisplay>Final Score: {score}/{problems.length}</ScoreDisplay>
                <Button onClick={resetGame} bgColor="#4ECDC4">
                  Play Again
                </Button>
              </motion.div>
            </GameArea>
          </AdditionContainer>
        </div>
      </ThemeProvider>
    )
  }

  if (problems.length === 0) return null

  const currentProblemData = problems[currentProblem]

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <AdditionContainer>
          <Title>➕ Let's Add Numbers! ➕</Title>
          
          <GameArea>
            <DifficultySelector>
              <DifficultyButton 
                isActive={difficulty === 'easy'} 
                onClick={() => changeDifficulty('easy')}
              >
                Easy (1-5)
              </DifficultyButton>
              <DifficultyButton 
                isActive={difficulty === 'medium'} 
                onClick={() => changeDifficulty('medium')}
              >
                Medium (1-10)
              </DifficultyButton>
              <DifficultyButton 
                isActive={difficulty === 'hard'} 
                onClick={() => changeDifficulty('hard')}
              >
                Hard (1-15)
              </DifficultyButton>
            </DifficultySelector>

            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </ProgressBar>
            
            <ScoreDisplay>Score: {score}/{problems.length}</ScoreDisplay>
            
            <ProblemDisplay>
              <NumberBox>{currentProblemData.num1}</NumberBox>
              <OperatorBox>+</OperatorBox>
              <NumberBox>{currentProblemData.num2}</NumberBox>
              <OperatorBox>=</OperatorBox>
              <AnswerInput
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="?"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </ProblemDisplay>
            
            <VisualAids>
              {Array.from({ length: currentProblemData.num1 }, (_, i) => (
                <VisualItem key={`num1-${i}`}>🍎</VisualItem>
              ))}
              <Plus size={24} color="#4ECDC4" />
              {Array.from({ length: currentProblemData.num2 }, (_, i) => (
                <VisualItem key={`num2-${i}`}>🍎</VisualItem>
              ))}
            </VisualAids>
            
            <SubmitButton onClick={handleSubmit} disabled={!userAnswer}>
              Check Answer
            </SubmitButton>
            
            <AnimatePresence>
              {showFeedback && (
                <Feedback
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  {parseInt(userAnswer) === currentProblemData.answer ? 'Correct! 🎉' : 'Try again! 💪'}
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
        </AdditionContainer>
      </div>
    </ThemeProvider>
  )
}
