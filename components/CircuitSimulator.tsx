"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function CircuitSimulator() {
  const [voltage, setVoltage] = useState(12); // Volts (V)
  const [resistance, setResistance] = useState(10); // Ohms (Ω)

  // Ohm's Law calculations
  const current = voltage / resistance; // Current (I) = V / R in Amperes (A)
  const power = voltage * current; // Power (P) = V * I in Watts (W)

  // Visual calculations
  const resistorHeatColor = Math.min((power / 50) * 255, 255); // 0-255 for RGB
  const resistorCoolColor = 255 - resistorHeatColor;
  
  // Wire color based on voltage (0-24V)
  const voltageRatio = Math.min(voltage / 24, 1); // Normalize 0-1
  const wireRed = Math.floor(50 + (255 - 50) * voltageRatio); // 50 to 255
  const wireGreen = Math.floor(50 + (255 - 50) * voltageRatio); // 50 to 255
  const wireBlue = Math.floor(50 + (0 - 50) * voltageRatio); // 50 to 0 (remove blue at max)
  const wireColor = `rgb(${wireRed}, ${wireGreen}, ${wireBlue})`;
  
  // Glow intensity based on current
  const glowRadius = Math.min(current * 2, 15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            OhmLab: Interactive Circuit Playground
          </h1>
          <p className="text-lg text-purple-200">
            Explore Ohm's Law through interactive simulation
          </p>
        </motion.div>

        {/* Main Content - Simulation centered with legend on left */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-4">
          {/* Left Sidebar - Educational Info / Legends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-lg">Visual Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">⚡</div>
                    <h3 className="text-white font-semibold text-sm">Wire Color</h3>
                  </div>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Wire transforms from dark gray to bright yellow as voltage increases
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">🔥</div>
                    <h3 className="text-white font-semibold text-sm">Resistor Heat</h3>
                  </div>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Resistor glows red-hot as power increases
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">💫</div>
                    <h3 className="text-white font-semibold text-sm">Current Flow</h3>
                  </div>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Particles show current speed and direction
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ohm's Law Formula */}
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-lg">Ohm&apos;s Law</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-purple-200/90 font-mono">
                  <p>V = I × R</p>
                  <p>I = V / R</p>
                  <p>R = V / I</p>
                  <p className="mt-2 pt-2 border-t border-purple-500/30">P = V × I</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Center - Main Circuit Visualization (Largest) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white text-xl">Circuit Simulation</CardTitle>
                <CardDescription className="text-purple-200">
                  Watch the circuit respond to your changes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <svg
                  viewBox="0 0 450 320"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Wire glow effect */}
                  <defs>
                    <filter id="wireGlow">
                      <feGaussianBlur stdDeviation={glowRadius} result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    
                    {/* Battery gradient */}
                    <linearGradient id="batteryBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2C3E50" />
                      <stop offset="50%" stopColor="#34495E" />
                      <stop offset="100%" stopColor="#2C3E50" />
                    </linearGradient>
                    
                    <linearGradient id="batteryTopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E74C3C" />
                      <stop offset="100%" stopColor="#C0392B" />
                    </linearGradient>
                    
                    <linearGradient id="batteryBottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3498DB" />
                      <stop offset="100%" stopColor="#2980B9" />
                    </linearGradient>
                    
                    {/* Gradient for resistor body */}
                    <linearGradient id="resistorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B7355" />
                      <stop offset="20%" stopColor="#D2B48C" />
                      <stop offset="50%" stopColor="#DEB887" />
                      <stop offset="80%" stopColor="#D2B48C" />
                      <stop offset="100%" stopColor="#8B7355" />
                    </linearGradient>
                    
                    {/* Metal cap gradient */}
                    <linearGradient id="metalCapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#A8A8A8" />
                      <stop offset="50%" stopColor="#E8E8E8" />
                      <stop offset="100%" stopColor="#A8A8A8" />
                    </linearGradient>
                  </defs>

                  {/* Battery (left) - Professional Design */}
                  <g transform="translate(60, 160)">
                    {/* Battery body */}
                    <rect x="-25" y="-50" width="50" height="100" fill="url(#batteryBodyGradient)" stroke="#1A252F" strokeWidth="2" rx="4" />
                    
                    {/* Positive terminal (top - red) */}
                    <rect x="-12" y="-55" width="24" height="8" fill="url(#batteryTopGradient)" stroke="#A93226" strokeWidth="1" rx="2" />
                    <rect x="-3" y="-60" width="6" height="8" fill="#E74C3C" stroke="#A93226" strokeWidth="1" rx="1" />
                    
                    {/* Negative terminal (bottom - blue) */}
                    <rect x="-15" y="50" width="30" height="6" fill="url(#batteryBottomGradient)" stroke="#1F618D" strokeWidth="1" rx="2" />
                    
                    {/* Plus and minus symbols */}
                    <text x="0" y="-40" textAnchor="middle" fill="#E74C3C" fontSize="20" fontWeight="bold">+</text>
                    <text x="0" y="45" textAnchor="middle" fill="#3498DB" fontSize="20" fontWeight="bold">−</text>
                    
                    {/* Battery label and voltage */}
                    <text x="0" y="-68" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                      Battery
                    </text>
                    <rect x="-20" y="-15" width="40" height="30" fill="rgba(0,0,0,0.6)" rx="4" />
                    <text x="0" y="5" textAnchor="middle" fill="#FFD700" fontSize="18" fontWeight="bold">
                      {voltage}V
                    </text>
                  </g>

                  {/* Top Wire - Realistic with voltage-based color */}
                  <motion.line
                    x1="85"
                    y1="105"
                    x2="348"
                    y2="105"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#wireGlow)"
                    animate={{
                      stroke: wireColor,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Wire shadow for depth */}
                  <line
                    x1="85"
                    y1="107"
                    x2="348"
                    y2="107"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Animated current flow (particles) - brighter with more voltage */}
                  {voltage > 0 && [...Array(5)].map((_, i) => (
                    <motion.circle
                      key={`particle-top-${i}`}
                      r="4"
                      fill={voltage > 12 ? "#FFFF00" : "#FFD700"}
                      initial={{ cx: 85, cy: 105 }}
                      animate={{
                        cx: [85, 348],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2 / Math.max(current, 0.5),
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "linear",
                      }}
                    />
                  ))}

                  {/* Resistor (right) - Professional Design */}
                  <g transform="translate(380, 160)">
                    {/* Metal cap - left */}
                    <ellipse cx="-32" cy="0" rx="4" ry="12" fill="url(#metalCapGradient)" stroke="#888" strokeWidth="1" />
                    
                    {/* Resistor body cylinder */}
                    <rect
                      x="-32"
                      y="-12"
                      width="64"
                      height="24"
                      fill="url(#resistorGradient)"
                      stroke="#6B5A3D"
                      strokeWidth="1.5"
                    />
                    
                    {/* Top highlight for 3D effect */}
                    <ellipse cx="0" cy="-12" rx="32" ry="3" fill="rgba(255,255,255,0.3)" />
                    
                    {/* Heat glow overlay */}
                    <motion.rect
                      x="-32"
                      y="-12"
                      width="64"
                      height="24"
                      fill={`rgba(${resistorHeatColor}, ${resistorCoolColor / 4}, 0, ${Math.min(power / 100, 0.7)})`}
                      animate={{
                        fill: `rgba(${resistorHeatColor}, ${resistorCoolColor / 4}, 0, ${Math.min(power / 100, 0.7)})`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Color bands on resistor */}
                    <rect x="-22" y="-12" width="5" height="24" fill="#FFD700" />
                    <rect x="-10" y="-12" width="5" height="24" fill="#000000" />
                    <rect x="2" y="-12" width="5" height="24" fill="#8B4513" />
                    <rect x="18" y="-12" width="4" height="24" fill="#FFD700" opacity="0.8" />
                    
                    {/* Metal cap - right */}
                    <ellipse cx="32" cy="0" rx="4" ry="12" fill="url(#metalCapGradient)" stroke="#888" strokeWidth="1" />
                    
                    {/* Labels */}
                    <text x="0" y="-26" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                      Resistor
                    </text>
                    <rect x="-28" y="18" width="56" height="22" fill="rgba(0,0,0,0.6)" rx="4" />
                    <text x="0" y="33" textAnchor="middle" fill="#FFD700" fontSize="14" fontWeight="bold">
                      {resistance}Ω
                    </text>
                    
                    {/* Heat waves animation */}
                    {power > 5 && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.path
                            key={`heat-${i}`}
                            d="M -10,-35 Q -5,-40 0,-35 Q 5,-30 10,-35"
                            stroke="#FF6B6B"
                            strokeWidth="2"
                            fill="none"
                            initial={{ y: 0, opacity: 0.8 }}
                            animate={{
                              y: -20,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </>
                    )}
                  </g>

                  {/* Bottom Wire - Realistic with voltage-based color */}
                  <motion.line
                    x1="348"
                    y1="215"
                    x2="85"
                    y2="215"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#wireGlow)"
                    animate={{
                      stroke: wireColor,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Wire shadow for depth */}
                  <line
                    x1="348"
                    y1="217"
                    x2="85"
                    y2="217"
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Animated current flow (particles) - bottom, brighter with more voltage */}
                  {voltage > 0 && [...Array(5)].map((_, i) => (
                    <motion.circle
                      key={`particle-bottom-${i}`}
                      r="4"
                      fill={voltage > 12 ? "#FFFF00" : "#FFD700"}
                      initial={{ cx: 348, cy: 215 }}
                      animate={{
                        cx: [348, 85],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2 / Math.max(current, 0.5),
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "linear",
                      }}
                    />
                  ))}

                  {/* Vertical connecting wires with voltage-based color */}
                  {/* Right side vertical wires - connecting to resistor caps */}
                  <motion.line
                    x1="348"
                    y1="105"
                    x2="348"
                    y2="160"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ stroke: wireColor }}
                    transition={{ duration: 0.3 }}
                  />
                  <line x1="350" y1="105" x2="350" y2="160" stroke="rgba(0,0,0,0.2)" strokeWidth="5" strokeLinecap="round" />
                  
                  <motion.line
                    x1="348"
                    y1="160"
                    x2="348"
                    y2="215"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ stroke: wireColor }}
                    transition={{ duration: 0.3 }}
                  />
                  <line x1="350" y1="160" x2="350" y2="215" stroke="rgba(0,0,0,0.2)" strokeWidth="5" strokeLinecap="round" />
                  
                  {/* Left side vertical wires */}
                  <motion.line
                    x1="60"
                    y1="105"
                    x2="60"
                    y2="110"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ stroke: wireColor }}
                    transition={{ duration: 0.3 }}
                  />
                  <line x1="62" y1="105" x2="62" y2="110" stroke="rgba(0,0,0,0.2)" strokeWidth="5" strokeLinecap="round" />
                  
                  <motion.line
                    x1="60"
                    y1="210"
                    x2="60"
                    y2="215"
                    stroke={wireColor}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ stroke: wireColor }}
                    transition={{ duration: 0.3 }}
                  />
                  <line x1="62" y1="210" x2="62" y2="215" stroke="rgba(0,0,0,0.2)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section - Controls and Calculations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* Controls */}
          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Circuit Controls</CardTitle>
              <CardDescription className="text-purple-200">
                Adjust voltage and resistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Voltage Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Voltage (V)</label>
                  <span className="text-purple-300 font-mono text-lg">{voltage.toFixed(1)} V</span>
                </div>
                <Slider
                  value={[voltage]}
                  onValueChange={(value) => setVoltage(value[0])}
                  min={0}
                  max={24}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-sm text-purple-200/70">Range: 0V - 24V</p>
              </div>

              {/* Resistance Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Resistance (Ω)</label>
                  <span className="text-purple-300 font-mono text-lg">{resistance.toFixed(1)} Ω</span>
                </div>
                <Slider
                  value={[resistance]}
                  onValueChange={(value) => setResistance(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-purple-200/70">Range: 1Ω - 100Ω</p>
              </div>
            </CardContent>
          </Card>

          {/* Calculations */}
          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Real-Time Calculations</CardTitle>
              <CardDescription className="text-purple-200">
                Live circuit analysis based on Ohm&apos;s Law
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current */}
              <motion.div
                className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 font-medium">Current (I)</span>
                  <span className="text-blue-100 font-mono text-2xl font-bold">
                    {current.toFixed(2)} A
                  </span>
                </div>
                <p className="text-sm text-blue-200/70">I = V / R</p>
              </motion.div>

              {/* Power */}
              <motion.div
                className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, delay: 0.25 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-orange-200 font-medium">Power (P)</span>
                  <span className="text-orange-100 font-mono text-2xl font-bold">
                    {power.toFixed(2)} W
                  </span>
                </div>
                <p className="text-sm text-orange-200/70">P = V × I</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
