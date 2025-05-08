"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, Eye, Bookmark, ChevronDown, ChevronUp, MessageCircle, Share2 } from "lucide-react"

/* Components */
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

/* Types */
import type { Post } from "~/lib/mocks/types"

export default function StoryPreview({ story, onClose }: { story: Post, onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  if (!story) return null

  const displayedUsername = story.author.displayName ?? story.author.username

  // `https://future-cdn-or-s3-bucket-url.com/${content.image?.storageKey ?? placeholder.png}`;
  const imageUrl = `/mocks/${story.image?.storageKey ?? 'matrix_placeholder.png'}`;
  const profilePictureUrl = `/mocks/${story.author.profilePictureUrl ?? "/placeholder-avatar.png"}`

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/90 to-indigo-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-indigo-500/20">
        {/* Floating close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute size-16 top-4 right-4 z-30 rounded-full bg-black/40 backdrop-blur-md hover:cursor-pointer hover:bg-indigo-500/40 transition-all duration-300 [&_svg]:size-10!"
        >
          <X className="text-white" />
          <span className="sr-only">Close</span>
        </Button>

        <div>
          {/* Side decorative element */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-600"></div>

          {/* Hero image with interactive elements overlay */}
          <div className="relative h-72">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
            <Image
              src={imageUrl ?? "/matrix_placeholder.png"}
              alt={story.title}
              fill
              className="object-cover"
            />

            {/* Floating tag on image */}
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-indigo-600/90 backdrop-blur-sm text-white border-none px-3 py-1">
                Featured
              </Badge>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="font-bold text-lg text-indigo-300 mb-1">Story Preview</h3>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight">{story.title}</h2>
            </div>
          </div>

          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-indigo-900/40 hover:bg-indigo-700/60 hover:cursor-pointer text-indigo-200 transition-all duration-300 border border-indigo-700/50"
                >
                  <Link href={`/explore/stories?tags=${tag.toLowerCase().replaceAll(" ", "_")}`}>
                    {tag}
                  </Link>
                </Badge>
              ))}
            </div>

            {/* Author card */}
            <div className="flex items-center mb-6 p-3 bg-indigo-900/20 rounded-lg border-r-4 border-indigo-500">
              <div className="flex flex-row group">
                <Avatar className="h-12 w-12 mr-3 ring-2 hover:cursor-pointer hover:ring-purple-600 ring-indigo-400 ring-offset-2 ring-offset-gray-900 hover:text-pink-100 duration-400 ease-in-out">
                  <AvatarImage src={profilePictureUrl ?? "/placeholder_avatar.png"} alt="Profile image" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600">
                    {displayedUsername.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="font-medium text-white hover:group-odd:text-indigo-500 hover:cursor-pointer duration-400 ease-in-out">{displayedUsername}</div>
                  <div className="text-sm text-indigo-300">{story.timeAgo}</div>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
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
            </div>

            {/* Content with expandable design */}
            <div className={`relative p-4 rounded-lg bg-gradient-to-b from-black/60 to-black/30 ${!expanded ? "max-h-24 overflow-hidden" : "max-h-76 overflow-y-scroll"}`}>
              <p className="text-gray-200 leading-relaxed mb-2 first-letter:text-3xl first-letter:font-bold first-letter:text-indigo-300 first-letter:mr-1 first-letter:float-left">
                {story.description}
              </p>
              {!expanded && (
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-400 hover:text-indigo-300 hover:cursor-pointer flex items-center gap-1 mt-1 mb-6"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue reading <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>

            {/* Stats and actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-t border-gray-700 pt-6">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 text-indigo-300">
                  <Heart className="h-4 w-4 fill-indigo-400 text-indigo-400" />
                  <span>{story.likes.toLocaleString()} likes</span>
                </div>
                <div className="flex items-center gap-1 text-indigo-300">
                  <Eye className="h-4 w-4 text-indigo-400" />
                  <span>{story.views.toLocaleString()} views</span>
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
                href={`/stories/${story.id}`}
                className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-700/30 transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Read Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}