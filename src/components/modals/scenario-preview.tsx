"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Star, Play, ChevronDown, ChevronUp, Share2, MessageCircle, Bookmark } from "lucide-react"

/* Components */
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

/* Types */
import type { Scenario } from "types"

export default function ScenarioPreview({ scenario, onClose }: { scenario: Scenario, onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  if (!scenario) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/90 to-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Floating close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute size-16 top-4 right-4 z-30 rounded-full bg-black/40 backdrop-blur-md hover:bg-indigo-500/40 hover:cursor-pointer transition-all duration-300 [&_svg]:size-10!"
        >
          <X className="text-white" />
          <span className="sr-only">Close</span>
        </Button>

        {/* Header with glass effect */}
        <div className="sticky top-0 backdrop-blur-md bg-black/30 p-4 border-b border-pink-500/30 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></div>
            <h3 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Scenario Preview
            </h3>
          </div>
        </div>

        {/* Side decorative element */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-pink-600"></div>

        <div className="p-0">
          {/* Hero image with gradient overlay */}
          <div className="relative h-72">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
            <Image
              src={scenario.image || "/placeholder.svg"}
              alt={scenario.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-6 right-6 z-20">
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2">{scenario.title}</h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {scenario.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-pink-900/40 hover:bg-pink-700/60 hover:cursor-pointer text-pink-200 transition-all duration-300 border border-pink-700/50"
                  >
                    <Link href={`/explore/scenarios?tags=${tag.toLowerCase().replaceAll(" ", "_")}`}>
                      {tag}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 pt-4">
            {/* Author info with highlight */}
            <div className="flex items-center mb-6 bg-gray-800/50 p-3 rounded-lg border-l-4 border-pink-500">
              <div className="flex flex-row group">
                <Avatar className="h-12 w-12 mr-3 ring-2 hover:cursor-pointer hover:ring-purple-600 ring-pink-400 ring-offset-2 ring-offset-gray-900 hover:text-pink-100 duration-400 ease-in-out">
                  <AvatarImage src={scenario.creatorAvatar || "/placeholder.svg"} alt={scenario.creator} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-600 to-purple-600">
                    {scenario.creator.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="font-medium text-white hover:group-odd:text-pink-500 hover:cursor-pointer duration-400 ease-in-out">{scenario.creator}</div>
                  <div className="text-sm text-pink-300">{scenario.timeAgo}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-pink-300 hover:text-pink-100 hover:bg-pink-500/20 hover:cursor-pointer"
              >
                Follow
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-300 hover:text-indigo-100 hover:bg-indigo-500/20 hover:cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 mr-0.5" />
                Message
              </Button>
            </div>

            {/* Content with expandable design */}
            <div className={`relative p-4 rounded-lg bg-gradient-to-b from-black/60 to-black/30 ${!expanded ? "max-h-24 overflow-hidden" : "max-h-76 overflow-y-scroll"}`}>
              <p className="text-gray-200 leading-relaxed mb-2">{scenario.content}</p>
              {!expanded && <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-pink-400 hover:text-pink-300 hover:cursor-pointer flex items-center gap-1 mt-1 mb-6"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>

            {/* Stats and action button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-t border-gray-700 pt-6">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1 text-pink-300">
                  <Star className="h-4 w-4 fill-pink-400 text-pink-400" />
                  <span>{scenario.stars.toLocaleString()} stars</span>
                </div>
                <div className="flex items-center gap-1 text-pink-300">
                  <Play className="h-4 w-4 fill-pink-400 text-pink-400" />
                  <span>{scenario.plays.toLocaleString()} plays</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${bookmarked ? 'text-yellow-400' : 'text-indigo-300'} hover:text-indigo-100 hover:cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className={`h-4 w-4  ${bookmarked ? 'fill-yellow-400' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" className="text-pink-300 hover:text-pink-100 hover:cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Link
                href={`/scenarios/${scenario.id}`}
                className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-pink-700/30 transition-all duration-300 hover:from-pink-500 hover:to-purple-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              >
                Play Scenario
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}