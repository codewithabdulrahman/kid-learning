'use client'

import React, { useRef, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import theme from '../styles/theme'
import { 
  Palette, 
  RotateCcw, 
  Download, 
  Eraser, 
  Circle, 
  Square, 
  Triangle,
  Type,
  MousePointer
} from 'lucide-react'

const DrawingContainer = styled.div`
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

const DrawingArea = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  margin: 0 auto;
  max-width: 1000px;
  box-shadow: ${props => props.theme.shadows.large};
`

const CanvasContainer = styled.div`
  position: relative;
  margin: ${props => props.theme.spacing.large} 0;
  text-align: center;
`

const Canvas = styled.canvas`
  border: 3px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius};
  cursor: crosshair;
  background: white;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
  flex-wrap: wrap;
`

const ToolButton = styled.button`
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.medium} 0;
`

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

const BrushSize = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.medium} 0;
`

const SizeSlider = styled.input`
  width: 100px;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.background};
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`

const Templates = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.large} 0;
  flex-wrap: wrap;
`

const TemplateButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.sizes.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

export default function Drawing() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('draw')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [context, setContext] = useState(null)

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#008000', '#FFC0CB', '#A52A2A'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 800
    canvas.height = 600
    
    // Set initial context properties
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    setContext(ctx)
  }, [])

  useEffect(() => {
    if (context) {
      context.strokeStyle = color
      context.lineWidth = brushSize
    }
  }, [color, brushSize, context])

  const startDrawing = (e) => {
    if (tool === 'draw' || tool === 'eraser') {
      setIsDrawing(true)
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      if (tool === 'eraser') {
        context.globalCompositeOperation = 'destination-out'
      } else {
        context.globalCompositeOperation = 'source-over'
      }
      
      context.beginPath()
      context.moveTo(x, y)
    }
  }

  const draw = (e) => {
    if (!isDrawing || (tool !== 'draw' && tool !== 'eraser')) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    context.globalCompositeOperation = 'source-over'
  }

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const downloadCanvas = () => {
    const link = document.createElement('a')
    link.download = 'kid-math-drawing.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const drawShape = (shape) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    context.beginPath()
    
    switch (shape) {
      case 'circle':
        context.arc(centerX, centerY, 50, 0, 2 * Math.PI)
        break
      case 'square':
        context.rect(centerX - 50, centerY - 50, 100, 100)
        break
      case 'triangle':
        context.moveTo(centerX, centerY - 50)
        context.lineTo(centerX - 50, centerY + 50)
        context.lineTo(centerX + 50, centerY + 50)
        context.closePath()
        break
      default:
        return
    }
    
    context.stroke()
  }

  const addText = () => {
    const text = prompt('Enter text to add:')
    if (text) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const x = rect.width / 2
      const y = rect.height / 2
      
      context.font = `${brushSize * 3}px Arial`
      context.fillStyle = color
      context.textAlign = 'center'
      context.fillText(text, x, y)
    }
  }

  const loadTemplate = (template) => {
    clearCanvas()
    
    switch (template) {
      case 'numbers':
        context.font = '48px Arial'
        context.fillStyle = color
        context.textAlign = 'center'
        for (let i = 1; i <= 5; i++) {
          context.fillText(i.toString(), 150 + (i-1) * 120, 300)
        }
        break
      case 'shapes':
        drawShape('circle')
        drawShape('square')
        drawShape('triangle')
        break
      case 'counting':
        context.font = '36px Arial'
        context.fillStyle = color
        context.textAlign = 'center'
        context.fillText('1 2 3 4 5', 400, 200)
        context.fillText('6 7 8 9 10', 400, 400)
        break
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <DrawingContainer>
          <Title>🎨 Drawing & Math Fun! 🎨</Title>
          
          <DrawingArea>
            <Toolbar>
              <ToolButton 
                isActive={tool === 'draw'} 
                onClick={() => setTool('draw')}
              >
                <MousePointer />
                Draw
              </ToolButton>
              <ToolButton 
                isActive={tool === 'eraser'} 
                onClick={() => setTool('eraser')}
              >
                <Eraser />
                Eraser
              </ToolButton>
              <ToolButton onClick={addText}>
                <Type />
                Add Text
              </ToolButton>
              <ToolButton onClick={clearCanvas}>
                <RotateCcw />
                Clear
              </ToolButton>
              <ToolButton onClick={downloadCanvas}>
                <Download />
                Save
              </ToolButton>
            </Toolbar>

            <ColorPalette>
              {colors.map((colorOption) => (
                <ColorButton
                  key={colorOption}
                  color={colorOption}
                  isActive={color === colorOption}
                  onClick={() => setColor(colorOption)}
                />
              ))}
            </ColorPalette>

            <BrushSize>
              <span>Brush Size:</span>
              <SizeSlider
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
              <span>{brushSize}px</span>
            </BrushSize>

            <Templates>
              <TemplateButton onClick={() => loadTemplate('numbers')}>
                📊 Number Template
              </TemplateButton>
              <TemplateButton onClick={() => loadTemplate('shapes')}>
                🔷 Shape Template
              </TemplateButton>
              <TemplateButton onClick={() => loadTemplate('counting')}>
                🔢 Counting Template
              </TemplateButton>
            </Templates>

            <CanvasContainer>
              <Canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={(e) => {
                  e.preventDefault()
                  const touch = e.touches[0]
                  const mouseEvent = new MouseEvent('mousedown', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                  })
                  canvasRef.current.dispatchEvent(mouseEvent)
                }}
                onTouchMove={(e) => {
                  e.preventDefault()
                  const touch = e.touches[0]
                  const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                  })
                  canvasRef.current.dispatchEvent(mouseEvent)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  const mouseEvent = new MouseEvent('mouseup', {})
                  canvasRef.current.dispatchEvent(mouseEvent)
                }}
              />
            </CanvasContainer>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1rem', color: '#2C3E50' }}>
                💡 Tip: Use the templates to practice drawing numbers and shapes!
              </p>
            </div>
          </DrawingArea>
        </DrawingContainer>
      </div>
    </ThemeProvider>
  )
}
