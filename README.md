# 📝 Emoji Journal

A simple, clean journaling app built with React + TypeScript that allows users to make **one entry per day**. Track your daily mood with emojis and optional notes!

## ✨ Features

### Core Features
- **Daily Mood Tracking**: Select from 15 different mood emojis
- **Optional Notes**: Add thoughts, reflections, or what happened today
- **One Entry Per Day**: Save button disabled after daily entry is complete
- **Automatic Timestamps**: All entries are timestamped automatically
- **Reverse Chronological Display**: See your newest entries first
- **Local Storage**: All data persists in your browser's localStorage

### Stretch Features ✅
- **🌙 Light/Dark Mode Toggle**: Smooth theme switching with system preference detection
- **📊 Emoji-Based Mood Stats**: Weekly mood analytics with visual progress bars
- **✏️ Edit/Delete Past Entries**: Full CRUD operations for journal management

## 🛠️ Tech Stack

- **React 18** with **TypeScript** for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** for beautiful, responsive styling
- **dayjs** for timestamp formatting and date operations
- **Built-in React state** + **localStorage** (no external state managers)

## 🎯 User Experience

- **Mobile-First Responsive Design**: Works perfectly on all devices
- **Accessible**: Full keyboard navigation and screen reader support
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Visual Feedback**: Clear indicators for saved entries and current state

## 🏗️ Component Architecture

```
src/
├── components/
│   ├── EmojiSelector.tsx     # Mood emoji picker grid
│   ├── NoteInput.tsx         # Optional text input
│   ├── EntryDisplay.tsx      # List of past entries with edit/delete
│   ├── StatsSummary.tsx      # Weekly mood analytics
│   └── ThemeToggle.tsx       # Light/dark mode switch
├── contexts/
│   └── ThemeContext.tsx      # Theme state management
├── utils/
│   └── storage.ts            # localStorage operations
├── types.ts                  # TypeScript interfaces
└── App.tsx                   # Main application logic
```

## 🚀 Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit the localhost URL shown in terminal

4. **Start journaling!** Select your mood and optionally add a note

## 📱 Available Mood Options

- 🤩 Ecstatic
- 😄 Happy  
- 😊 Content
- 😌 Peaceful
- 😐 Neutral
- 🤔 Thoughtful
- 😴 Tired
- 😒 Bored
- 😟 Worried
- 😢 Sad
- 😭 Crying
- 😳 Shocked
- 😤 Frustrated
- 🙃 Silly
- 🤯 Overwhelmed

## 🎨 Design Highlights

- **Gradient Stats Cards**: Beautiful mood analytics with progress bars
- **Micro-Interactions**: Hover effects on emoji buttons and scale animations
- **Dark Mode**: Seamless theme switching with proper contrast ratios
- **Typography**: Clean, readable font stack with proper hierarchy
- **Color Palette**: Carefully chosen colors that work in both light and dark modes

## 🔧 Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, TypeScript & Tailwind CSS**
