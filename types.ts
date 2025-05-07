export interface Scenario {
    id: string
    title: string
    creator: string
    creatorAvatar: string
    description: string
    image: string
    stars: number
    plays: number
    timeAgo: string
    tags: string[]
    content: string
}

export interface Story {
    id: string
    title: string
    author: string
    authorAvatar: string
    description: string
    image: string
    likes: number
    views: number
    timeAgo: string
    tags: string[]
    content: string
}