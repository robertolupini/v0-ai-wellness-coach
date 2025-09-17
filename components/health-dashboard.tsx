"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Activity,
  Heart,
  Moon,
  Zap,
  Calendar,
  User,
  Settings,
  Mic,
  MicOff,
  MessageSquare,
  Send,
  MessageCircle,
} from "lucide-react"
import { WorkoutSystem } from "./workout-system"
import { NutritionSystem } from "./nutrition-system"
import { ProfileSystem } from "./profile-system"
import { SmartwatchIntegration } from "./smartwatch-integration"
import { OnboardingQuestionnaire } from "./onboarding-questionnaire"
import { NutritionButton } from "./nutrition-button"
import { WorkoutReport } from "./workout-report"

export function HealthDashboard() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [currentView, setCurrentView] = useState<
    "dashboard" | "workout" | "nutrition" | "profile" | "smartwatch" | "report"
  >("dashboard")
  const [isListening, setIsListening] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")

  const handleOnboardingComplete = (data: any) => {
    console.log("[v0] Onboarding completed with data:", data)
    setHasCompletedOnboarding(true)
    // Here you would typically save the data to your backend or local storage
  }

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      console.log("[v0] Feedback submitted:", feedbackText)
      setFeedbackText("")
      setShowFeedback(false)
      // Here you would typically send feedback to your backend
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      console.log("[v0] Starting voice input...")
    } else {
      console.log("[v0] Stopping voice input...")
    }
  }

  const handleTextInput = () => {
    setShowTextInput(!showTextInput)
    if (showTextInput && textInput.trim()) {
      console.log("[v0] Processing text input:", textInput)
      setTextInput("")
    }
  }

  const handleSendText = () => {
    if (textInput.trim()) {
      console.log("[v0] Sending text:", textInput)
      setTextInput("")
      setShowTextInput(false)
    }
  }

  const healthMetrics = {
    recoveryScore: 78,
    restingHeartRate: 62,
    hrv: 45,
    sleepScore: 85,
    workoutReadiness: "High",
    todayWorkout: "Upper Body Strength",
    caloriesBurned: 2340,
    activeMinutes: 87,
  }

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case "High":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingQuestionnaire onComplete={handleOnboardingComplete} />
  }

  if (currentView === "workout") {
    return <WorkoutSystem onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "nutrition") {
    return <NutritionSystem onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "profile") {
    return <ProfileSystem onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "smartwatch") {
    return <SmartwatchIntegration onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "report") {
    return <WorkoutReport onBack={() => setCurrentView("dashboard")} />
  }

  return (
    <div className="relative p-4 max-w-md mx-auto space-y-6 pb-24">
      <div className="text-center space-y-2 pt-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setCurrentView("smartwatch")}>
            <Settings className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI wellness coach</h1>
            <p className="text-muted-foreground text-balance">Your intelligent wellness coach</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setShowFeedback(!showFeedback)}>
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Connected to Apple Watch</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-red-500" />
              Resting HR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.restingHeartRate}</div>
            <p className="text-xs text-muted-foreground">bpm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-blue-500" />
              HRV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.hrv}</div>
            <p className="text-xs text-muted-foreground">ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Moon className="w-4 h-4 text-purple-500" />
              Sleep Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.sleepScore}%</div>
            <p className="text-xs text-muted-foreground">8h 15m</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-orange-500" />
              Active Min
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.activeMinutes}</div>
            <p className="text-xs text-muted-foreground">of 90 goal</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">Recommended Workout</h3>
            <p className="text-sm text-muted-foreground">{healthMetrics.todayWorkout}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your high recovery score, you're ready for intense training
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-primary text-black hover:bg-primary/90"
              onClick={() => setCurrentView("workout")}
            >
              Start Workout
            </Button>
            <Button variant="outline" onClick={() => setCurrentView("report")} className="flex-1">
              Last Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Recommended for You
          </CardTitle>
          <p className="text-sm text-muted-foreground">AI-selected supplements based on your goals</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Whey Protein Powder</h4>
                <p className="text-xs text-muted-foreground">Perfect for muscle recovery</p>
                <p className="text-sm font-bold text-primary mt-1">$29.99</p>
              </div>
              <Button size="sm" className="bg-primary text-black hover:bg-primary/90">
                Buy Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Creatine Monohydrate</h4>
                <p className="text-xs text-muted-foreground">Boost strength & power</p>
                <p className="text-sm font-bold text-primary mt-1">$19.99</p>
              </div>
              <Button size="sm" className="bg-primary text-black hover:bg-primary/90">
                Buy Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Multivitamin Complex</h4>
                <p className="text-xs text-muted-foreground">Daily nutritional support</p>
                <p className="text-sm font-bold text-primary mt-1">$24.99</p>
              </div>
              <Button size="sm" className="bg-primary text-black hover:bg-primary/90">
                Buy Now
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            View All Products
          </Button>
        </CardContent>
      </Card>

      <NutritionButton onClick={() => setCurrentView("nutrition")} />

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
        {showTextInput && (
          <div className="bg-background border rounded-lg p-3 shadow-lg w-64 mb-2">
            <div className="flex gap-2">
              <Input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Ask AI wellness coach anything..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendText()}
                autoFocus
              />
              <Button
                size="sm"
                onClick={handleSendText}
                disabled={!textInput.trim()}
                className="bg-primary text-black hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleTextInput}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
              showTextInput
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-primary/20 hover:bg-primary/30 text-primary"
            }`}
            size="icon"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          <Button
            onClick={handleVoiceInput}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse text-white"
                : "bg-primary hover:bg-primary/90 text-black"
            }`}
            size="icon"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {showFeedback && (
        <Card className="border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Share Your Feedback</CardTitle>
            <p className="text-sm text-muted-foreground">Help us improve your wellness experience</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what you think about the app, features you'd like to see, or any issues you've encountered..."
              className="w-full p-3 border rounded-lg resize-none h-24 text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={handleFeedbackSubmit}
                disabled={!feedbackText.trim()}
                className="flex-1 bg-primary text-black hover:bg-primary/90"
              >
                Send Feedback
              </Button>
              <Button variant="outline" onClick={() => setShowFeedback(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isListening && (
        <div className="fixed bottom-24 right-6 bg-background border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm text-muted-foreground">Listening...</p>
        </div>
      )}
    </div>
  )
}
