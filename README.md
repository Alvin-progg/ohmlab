# OhmLab: Interactive Circuit Playground

An interactive web-based simulation that demonstrates **Ohm's Law** in an intuitive and visually engaging way. This educational tool helps users understand the fundamental relationships between voltage, current, resistance, and power through real-time visualization and interactive controls.

![OhmLab Preview](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0080?style=for-the-badge&logo=framer)

## 🎯 Features

### Interactive Controls
- **Voltage Slider**: Adjust voltage from 0V to 24V
- **Resistance Slider**: Modify resistance from 1Ω to 100Ω
- **Real-time Calculations**: Instantly see how changes affect current and power

### Visual Circuit Animation
- **Dynamic Wire Glow**: Wires glow brighter as current increases, representing electron flow
- **Resistor Heat Visualization**: Color transitions from cool blue to hot red based on power dissipation
- **Animated Current Flow**: Particle animations show the speed and direction of current
- **Heat Wave Effects**: Visual heat waves appear when power dissipation is high

### Educational Display
- **Live Calculations**: Real-time display of:
  - Current (I = V / R) in Amperes
  - Power (P = V × I) in Watts
- **Formula Reference**: Quick reference to Ohm's Law formulas
- **Interactive Learning**: Visual feedback helps understand abstract physics concepts

## 🔬 Physics Behind It

**Ohm's Law** describes the relationship between voltage, current, and resistance:

```
V = I × R
```

Where:
- **V** = Voltage (Volts)
- **I** = Current (Amperes)
- **R** = Resistance (Ohms)

**Power Dissipation**:
```
P = V × I = I² × R = V² / R
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Alvin-progg/ohmlab.git
cd ohmlab
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technology Stack

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework for production
- **[React 19.1.0](https://react.dev/)** - UI component library
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

## 📂 Project Structure

```
ohmlab/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind
├── components/
│   ├── CircuitSimulator.tsx  # Main circuit simulation component
│   └── ui/               # Shadcn/UI components
│       ├── card.tsx
│       └── slider.tsx
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Key Components

### CircuitSimulator
The main component that handles:
- State management for voltage and resistance
- Ohm's Law calculations
- Visual rendering of the circuit
- Animation controls

### Visual Elements
- **SVG Circuit**: Scalable vector graphics for crisp rendering
- **Motion Components**: Framer Motion for smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📚 Educational Use Cases

- **Physics Education**: Demonstrate Ohm's Law concepts
- **Engineering Classes**: Visualize circuit behavior
- **Self-Learning**: Interactive exploration of electrical concepts
- **STEM Workshops**: Engaging way to teach electronics basics

## 🎯 Future Enhancements

Potential features for future versions:
- Multiple resistors in series/parallel
- AC/DC circuit comparison
- Capacitors and inductors
- More complex circuit topologies
- Save and share circuit configurations
- Additional measurement tools (voltmeter, ammeter)

## 📖 How to Use

1. **Adjust Voltage**: Use the voltage slider to change the battery voltage (0-24V)
2. **Modify Resistance**: Adjust the resistance slider to change the resistor value (1-100Ω)
3. **Observe**: Watch how the circuit visualization responds:
   - Wire brightness increases with higher current
   - Resistor color changes with power dissipation
   - Particle speed reflects current magnitude
4. **Learn**: Read the calculated values to understand the mathematical relationships

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Alvin-progg**
- GitHub: [@Alvin-progg](https://github.com/Alvin-progg)

## 🙏 Acknowledgments

- Built with inspiration from physics education needs
- Thanks to the Next.js, React, and Framer Motion communities
- Shadcn/UI for the beautiful component library

---



