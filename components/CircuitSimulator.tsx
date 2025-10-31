"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Circuit3D from "@/components/Circuit3D";

export default function CircuitSimulator() {
  const [voltage, setVoltage] = useState(12); // Volts (V)
  const [resistance, setResistance] = useState(10); // Ohms (Ω)
  const [performanceMode, setPerformanceMode] = useState<"auto" | "low" | "high">("auto");
  const [enableSmoke, setEnableSmoke] = useState(true);
  const [enableBloom, setEnableBloom] = useState(true);
  const [showLegend, setShowLegend] = useState(false);

  // Ohm's Law calculations
  const current = voltage / resistance; // Current (I) = V / R in Amperes (A)
  const power = voltage * current; // Power (P) = V * I in Watts (W)

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
            Explore Ohm&apos;s Law through interactive simulation
          </p>
        </motion.div>

        {/* Main Content - Simulation centered with legend on left */}
  <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
          {/* Left Sidebar - Educational Info / Legends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Collapsible legend for small screens */}
            <div className="lg:hidden mb-2">
              <button
                aria-expanded={showLegend}
                onClick={() => setShowLegend((s) => !s)}
                className="w-full text-left px-3 py-2 bg-slate-800/40 rounded flex items-center justify-between"
              >
                <span className="text-white font-medium">Legend</span>
                <span className="text-purple-200">{showLegend ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            <Card className={`bg-slate-800/50 border-purple-500/20 backdrop-blur ${showLegend ? '' : 'hidden lg:block'}`}>
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
                    Resistor glows red-hot and emits smoke as power increases
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
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-white text-xl">Circuit Simulation</CardTitle>
                </div>
                <CardDescription className="text-purple-200">
                  Watch the circuit respond to your changes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[50vh] md:h-[700px] p-0">
                {/* Full 3D simulation canvas */}
                  <div className="mt-0 h-full w-full">
                  <Circuit3D
                    voltage={voltage}
                    resistance={resistance}
                    current={current}
                    power={power}
                    performanceMode={performanceMode}
                    enableSmoke={enableSmoke}
                    enableBloom={enableBloom}
                  />
                  </div>
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

              {/* Performance Mode */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Performance Mode</label>
                  <select
                    value={performanceMode}
                    onChange={(e) => setPerformanceMode(e.target.value as "auto" | "low" | "high")}
                    className="bg-slate-700 text-white rounded px-2 py-1"
                  >
                    <option value="auto">Auto</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <p className="text-sm text-purple-200/70">Auto detects low-end devices; choose Low to conserve resources.</p>
              </div>

              {/* Visual Toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Smoke</label>
                  <input type="checkbox" checked={enableSmoke} onChange={(e) => setEnableSmoke(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Bloom</label>
                  <input type="checkbox" checked={enableBloom} onChange={(e) => setEnableBloom(e.target.checked)} />
                </div>
                <p className="text-sm text-purple-200/70">Toggle smoke or bloom to save resources.</p>
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
                    {current.toFixed(2)} A ({(current * 1000).toFixed(0)} mA)
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
