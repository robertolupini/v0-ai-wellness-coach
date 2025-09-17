"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"

interface WorkoutVideoPlayerProps {
  exerciseName: string
  onClose?: () => void
}

export function WorkoutVideoPlayer({ exerciseName, onClose }: WorkoutVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes placeholder

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full bg-black/95 border-primary/20">
      <CardContent className="p-0">
        {/* Video Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-orange-500/20" />

          {/* Exercise Demo Placeholder */}
          <div className="text-center text-white z-10">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 flex items-center justify-center">
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{exerciseName}</h3>
            <p className="text-sm text-white/80">Video demonstration coming soon</p>
          </div>

          {/* Play/Pause Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </div>
          </button>
        </div>

        {/* Video Controls */}
        <div className="p-4 bg-black/90">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-white text-sm mb-2">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/10">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentTime(0)}
                className="text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/10">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
