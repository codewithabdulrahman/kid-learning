'use client'

import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { 
  CheckCircle, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Award, 
  Star, 
  Target,
  TrendingUp,
  BookOpen,
  Play
} from 'lucide-react'

const AssessmentsContainer = styled.div`
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

const LearningPath = styled.div`
  background: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  margin: ${props => props.theme.spacing.large} 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.medium};
  }
  
  p {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.sizes.medium};
  }
`

const AssessmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`

const AssessmentCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  box-shadow: ${props => props.theme.shadows.medium};
  cursor: ${props => props.isLocked ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  opacity: ${props => props.isLocked ? 0.6 : 1};
  
  &:hover {
    transform: ${props => props.isLocked ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.isLocked ? props.theme.shadows.medium : props.theme.shadows.large};
  }
`

const LockIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  color: ${props => props.theme.colors.warning};
`

const AssessmentIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${props => props.theme.spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  border-radius: 50%;
  color: white;
  font-size: 2rem;
  
  svg {
    width: 40px;
    height: 40px;
  }
`

const AssessmentTitle = styled.h3`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const AssessmentDescription = styled.p`
  font-size: ${props => props.theme.sizes.medium};
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.spacing.medium};
`

const Prerequisites = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.small};
  border-radius: 8px;
  font-size: ${props => props.theme.sizes.small};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.medium};
`

const StartButton = styled.button`
  background: ${props => props.isLocked ? props.theme.colors.background : props.theme.colors.success};
  color: ${props => props.isLocked ? props.theme.colors.text : 'white'};
  border: none;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.medium};
  font-weight: bold;
  cursor: ${props => props.isLocked ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: ${props => props.isLocked ? 'none' : 'scale(1.05)'};
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
  margin: ${props => props.theme.spacing.small} 0;
`

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.success};
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`

const Achievements = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  margin: ${props => props.theme.spacing.large} auto;
  max-width: 800px;
  box-shadow: ${props => props.theme.shadows.medium};
`

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.medium};
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.isEarned ? props.theme.colors.success : props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius};
  margin: ${props => props.theme.spacing.small} 0;
  opacity: ${props => props.isEarned ? 1 : 0.6};
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

const QuestionContainer = styled.div`
  margin: ${props => props.theme.spacing.large} 0;
`

const Question = styled.div`
  font-size: ${props => props.theme.sizes.large};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.large};
  font-weight: bold;
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
`

const OptionButton = styled.button`
  background: ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.large};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

export default function Assessments() {
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Mock user progress - in a real app, this would come from a database
  const [userProgress, setUserProgress] = useState({
    'counting-basic': { completed: true, score: 90, videoWatched: true },
    'shapes-basic': { completed: true, score: 85, videoWatched: true },
    'addition-basic': { completed: false, score: 0, videoWatched: true },
    'patterns-basic': { completed: false, score: 0, videoWatched: false },
    'comparison-basic': { completed: false, score: 0, videoWatched: false }
  })

  const assessments = [
    {
      id: 'counting-basic',
      title: 'Counting Assessment',
      description: 'Test your counting skills from 1-10',
      icon: '🔢',
      bgColor: '#FF6B6B',
      prerequisites: ['Watch Numberblocks Counting Video'],
      questions: [
        {
          question: 'How many apples do you see? 🍎🍎🍎',
          options: ['2', '3', '4', '5'],
          correct: 1
        },
        {
          question: 'Count the stars: ⭐⭐⭐⭐⭐',
          options: ['3', '4', '5', '6'],
          correct: 2
        },
        {
          question: 'What comes after 7?',
          options: ['6', '8', '9', '10'],
          correct: 1
        }
      ]
    },
    {
      id: 'shapes-basic',
      title: 'Shapes Assessment',
      description: 'Identify basic geometric shapes',
      icon: '🔷',
      bgColor: '#4ECDC4',
      prerequisites: ['Watch Shapes Video'],
      questions: [
        {
          question: 'What shape is this? 🔴',
          options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
          correct: 1
        },
        {
          question: 'How many sides does a triangle have?',
          options: ['2', '3', '4', '5'],
          correct: 1
        },
        {
          question: 'Which shape has 4 equal sides?',
          options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
          correct: 2
        }
      ]
    },
    {
      id: 'addition-basic',
      title: 'Addition Assessment',
      description: 'Simple addition with numbers 1-5',
      icon: '➕',
      bgColor: '#FFE66D',
      prerequisites: ['Complete Counting Assessment', 'Watch Addition Video'],
      questions: [
        {
          question: 'What is 2 + 3?',
          options: ['4', '5', '6', '7'],
          correct: 1
        },
        {
          question: 'If you have 1 cookie and get 2 more, how many do you have?',
          options: ['2', '3', '4', '5'],
          correct: 1
        },
        {
          question: 'What is 4 + 1?',
          options: ['3', '4', '5', '6'],
          correct: 2
        }
      ]
    },
    {
      id: 'patterns-basic',
      title: 'Patterns Assessment',
      description: 'Recognize and continue simple patterns',
      icon: '🔄',
      bgColor: '#2ECC71',
      prerequisites: ['Complete Shapes Assessment', 'Watch Patterns Video'],
      questions: [
        {
          question: 'What comes next? 🔴🔵🔴🔵🔴?',
          options: ['🔴', '🔵', '🟡', '🟢'],
          correct: 1
        },
        {
          question: 'Continue the pattern: ⭐⭐🌙⭐⭐🌙⭐⭐?',
          options: ['⭐', '🌙', '☀️', '⭐'],
          correct: 1
        },
        {
          question: 'What comes next? 🚗🚗🚗🚗🚗?',
          options: ['🚗', '🚕', '🚙', '🚌'],
          correct: 0
        }
      ]
    },
    {
      id: 'comparison-basic',
      title: 'Comparison Assessment',
      description: 'Compare sizes, amounts, and quantities',
      icon: '⚖️',
      bgColor: '#9B59B6',
      prerequisites: ['Complete Patterns Assessment', 'Watch Comparison Video'],
      questions: [
        {
          question: 'Which is bigger? 🐘 or 🐭',
          options: ['🐘', '🐭', 'Same size', 'Cannot tell'],
          correct: 0
        },
        {
          question: 'Which group has more? 🍎🍎🍎 or 🍌🍌',
          options: ['🍎🍎🍎', '🍌🍌', 'Same amount', 'Cannot tell'],
          correct: 0
        },
        {
          question: 'Which is taller? 🌳 or 🌱',
          options: ['🌳', '🌱', 'Same height', 'Cannot tell'],
          correct: 0
        }
      ]
    }
  ]

  const isAssessmentLocked = (assessment) => {
    if (assessment.prerequisites.length === 0) return false
    
    return assessment.prerequisites.some(prereq => {
      if (prereq.includes('Complete')) {
        const assessmentName = prereq.split(' ')[1].toLowerCase() + '-basic'
        return !userProgress[assessmentName]?.completed
      }
      if (prereq.includes('Watch')) {
        // Check if video was watched (simplified logic)
        return false // Assume videos are always watched for demo
      }
      return false
    })
  }

  const startAssessment = (assessment) => {
    if (isAssessmentLocked(assessment)) return
    
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setUserAnswers({})
    setAssessmentCompleted(false)
    setScore(0)
    setShowResults(false)
  }

  const handleAnswer = (answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    let correctAnswers = 0
    selectedAssessment.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correctAnswers++
      }
    })
    
    const finalScore = Math.round((correctAnswers / selectedAssessment.questions.length) * 100)
    setScore(finalScore)
    
    // Update progress
    setUserProgress(prev => ({
      ...prev,
      [selectedAssessment.id]: {
        ...prev[selectedAssessment.id],
        completed: true,
        score: finalScore
      }
    }))
    
    setAssessmentCompleted(true)
    setShowResults(true)
  }

  const closeAssessment = () => {
    setSelectedAssessment(null)
    setCurrentQuestion(0)
    setUserAnswers({})
    setAssessmentCompleted(false)
    setScore(0)
    setShowResults(false)
  }

  const getOverallProgress = () => {
    const completed = Object.values(userProgress).filter(p => p.completed).length
    return Math.round((completed / assessments.length) * 100)
  }

  const getEarnedAchievements = () => {
    const completed = Object.values(userProgress).filter(p => p.completed).length
    if (completed >= 5) return ['Math Master', 'Perfect Score', 'Quick Learner']
    if (completed >= 3) return ['Math Master', 'Quick Learner']
    if (completed >= 1) return ['Quick Learner']
    return []
  }

  if (selectedAssessment) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <CloseButton onClick={closeAssessment}>×</CloseButton>
              
              {!showResults ? (
                <>
                  <h2 style={{ marginBottom: '20px', color: '#2C3E50' }}>
                    {selectedAssessment.title}
                  </h2>
                  
                  <ProgressBar>
                    <ProgressFill 
                      progress={((currentQuestion + 1) / selectedAssessment.questions.length) * 100} 
                    />
                  </ProgressBar>
                  
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Question {currentQuestion + 1} of {selectedAssessment.questions.length}
                  </p>
                  
                  <QuestionContainer>
                    <Question>
                      {selectedAssessment.questions[currentQuestion].question}
                    </Question>
                    
                    <OptionsGrid>
                      {selectedAssessment.questions[currentQuestion].options.map((option, index) => (
                        <OptionButton
                          key={index}
                          isSelected={userAnswers[currentQuestion] === index}
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </OptionsGrid>
                    
                    <button
                      onClick={nextQuestion}
                      disabled={userAnswers[currentQuestion] === undefined}
                      style={{
                        background: '#4ECDC4',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '20px',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        marginTop: '20px'
                      }}
                    >
                      {currentQuestion < selectedAssessment.questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
                    </button>
                  </QuestionContainer>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={100} color="#2ECC71" />
                  <h2 style={{ marginBottom: '20px', color: '#2C3E50' }}>
                    Assessment Complete! 🎉
                  </h2>
                  <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
                    Your Score: {score}%
                  </p>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    {score >= 80 ? 'Excellent work! You\'re ready for the next level!' : 
                     score >= 60 ? 'Good job! Keep practicing to improve!' : 
                     'Keep trying! Practice makes perfect!'}
                  </p>
                  <button
                    onClick={closeAssessment}
                    style={{
                      background: '#4ECDC4',
                      color: 'white',
                      border: 'none',
                      padding: '15px 30px',
                      borderRadius: '20px',
                      fontSize: '1.2rem',
                      cursor: 'pointer'
                    }}
                  >
                    Back to Assessments
                  </button>
                </motion.div>
              )}
            </ModalContent>
          </Modal>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <AssessmentsContainer>
          <Title>📝 Math Assessments 📝</Title>
          
          <LearningPath>
            <h2>🌟 Learning Path Progress 🌟</h2>
            <p>Complete assessments to unlock new levels and earn achievements!</p>
            <ProgressBar>
              <ProgressFill progress={getOverallProgress()} />
            </ProgressBar>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Overall Progress: {getOverallProgress()}%
            </p>
          </LearningPath>

          <AssessmentGrid>
            {assessments.map((assessment, index) => {
              const isLocked = isAssessmentLocked(assessment)
              const progress = userProgress[assessment.id]
              
              return (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <AssessmentCard 
                    isLocked={isLocked}
                    whileHover={{ scale: isLocked ? 1 : 1.02 }}
                  >
                    {isLocked && <LockIcon>🔒</LockIcon>}
                    
                    <AssessmentIcon bgColor={assessment.bgColor}>
                      {assessment.icon}
                    </AssessmentIcon>
                    
                    <AssessmentTitle>{assessment.title}</AssessmentTitle>
                    <AssessmentDescription>{assessment.description}</AssessmentDescription>
                    
                    <Prerequisites>
                      <strong>Prerequisites:</strong> {assessment.prerequisites.join(', ')}
                    </Prerequisites>
                    
                    {progress && (
                      <div style={{ marginBottom: '15px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                          {progress.completed ? `Completed! Score: ${progress.score}%` : 'Not completed yet'}
                        </p>
                      </div>
                    )}
                    
                    <StartButton
                      isLocked={isLocked}
                      onClick={() => startAssessment(assessment)}
                    >
                      {isLocked ? '🔒 Locked' : progress?.completed ? '🔄 Retake' : '🚀 Start Assessment'}
                    </StartButton>
                  </AssessmentCard>
                </motion.div>
              )
            })}
          </AssessmentGrid>

          <Achievements>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>
              🏆 Achievements & Badges 🏆
            </h2>
            {getEarnedAchievements().map((achievement, index) => (
              <AchievementItem key={index} isEarned={true}>
                <Award size={24} color="#FFD700" />
                <span style={{ fontWeight: 'bold' }}>{achievement}</span>
                <span style={{ marginLeft: 'auto', color: '#666' }}>✅ Earned</span>
              </AchievementItem>
            ))}
            {['Math Master', 'Perfect Score', 'Quick Learner'].filter(a => !getEarnedAchievements().includes(a)).map((achievement, index) => (
              <AchievementItem key={index} isEarned={false}>
                <Award size={24} color="#ccc" />
                <span style={{ color: '#999' }}>{achievement}</span>
                <span style={{ marginLeft: 'auto', color: '#999' }}>🔒 Locked</span>
              </AchievementItem>
            ))}
          </Achievements>
        </AssessmentsContainer>
      </div>
    </ThemeProvider>
  )
}
