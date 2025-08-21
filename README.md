# 🎓 Kid Math - Interactive Learning App for 3-4 Year Olds

A fun, engaging Next.js application designed to help preschoolers learn fundamental math concepts through interactive games, videos, and drawing activities.

## ✨ Features

### 🎮 Interactive Learning Activities
- **Counting Fun**: Learn to count 1-10 with interactive objects and sound feedback
- **Shape Explorer**: Identify and learn about basic geometric shapes
- **Adding Together**: Practice simple addition with visual aids and difficulty levels
- **Math Videos**: Watch educational YouTube videos about numbers and shapes
- **Drawing Canvas**: Interactive drawing with math templates and tools

### 🎨 Age-Appropriate Design
- Large, colorful buttons and text
- Simple navigation with icons
- Engaging animations and sound effects
- Touch-friendly interface for tablets and mobile devices
- Progress tracking and positive reinforcement

### 🚀 Technical Features
- Built with Next.js 14 and React 18
- Styled-components for beautiful, responsive design
- Framer Motion for smooth animations
- YouTube API integration for educational content
- HTML5 Canvas for drawing activities
- Responsive design for all devices

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kid-math
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Learning Objectives

### Counting (1-10)
- Interactive counting with animal emojis
- Audio feedback for correct answers
- Progress tracking and completion rewards

### Shapes Recognition
- Circle, Square, Triangle, Rectangle, Diamond, Star
- Visual identification games
- Score tracking and positive reinforcement

### Basic Addition
- Three difficulty levels (Easy: 1-5, Medium: 1-10, Hard: 1-15)
- Visual aids with emoji representations
- Step-by-step problem solving

### Educational Videos
- Curated YouTube content for preschoolers
- Topics: counting, shapes, addition, number songs
- Safe, educational content only

### Drawing & Creativity
- Canvas-based drawing tools
- Math templates (numbers, shapes, counting)
- Color palette and brush size options
- Save and download artwork

## 🎨 Design System

### Color Palette
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #4ECDC4 (Turquoise)
- **Accent**: #FFE66D (Yellow)
- **Success**: #2ECC71 (Green)
- **Warning**: #F39C12 (Orange)
- **Error**: #E74C3C (Red)

### Typography
- **Primary Font**: Comic Sans MS (child-friendly)
- **Secondary Font**: Arial Rounded MT Bold

### Components
- Responsive navigation with icons
- Interactive game cards
- Progress bars and score displays
- Animated feedback and celebrations

## 🔧 Customization

### Adding New Activities
1. Create a new page in `src/app/[activity-name]/page.js`
2. Add navigation item in `src/app/components/Navigation.js`
3. Update the home page activities list

### Modifying Videos
Edit the `mathVideos` array in `src/app/videos/page.js` to add or change YouTube content.

### Adjusting Difficulty
Modify the difficulty ranges in the addition game or create new difficulty levels for other activities.

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch-enabled devices

## 🎵 Audio Features

- Interactive sound effects for correct/incorrect answers
- Mute/unmute functionality
- Web Audio API for browser-based sound generation
- Touch-friendly audio controls

## 🚀 Performance Features

- Next.js 14 App Router for optimal performance
- Client-side components with 'use client' directive
- Optimized images and lazy loading
- Efficient state management
- Smooth animations with Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Educational content creators on YouTube
- React and Next.js communities
- Styled-components and Framer Motion teams
- Preschool educators for learning methodology insights

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Made with ❤️ for early childhood education**
