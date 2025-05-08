import { ContentRating, type Post } from "~/lib/mocks/types"

// Mock data for top stories
export const topStories: Post[] = [
    {
        id: "story-1",
        rating: ContentRating["G"],
        title: "The Last Journey",
        author: {
            id: "1",
            username: "ElenaWrites",
            displayName: "ElenaWrites",
            email: "elenawrites@email.com",
            bio: "I like writing mystery stories...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 58,
                followers: 617,
                following: 5,
                comments: 44,
                likesGiven: 203,
                bookmarks: 2
            }
        },
        excerpt: "A traveler discovers an ancient map leading to a forgotten civilization hidden beneath the ocean.",
        description: "The map was weathered, its edges frayed from centuries of handling. Yet the ink remained vibrant, almost glowing in the dim light of my study. I traced the unfamiliar coastline with my finger, wondering what secrets lay hidden in the depths marked by the curious symbol – a spiral within a triangle. Legend spoke of a civilization that had mastered both science and spirituality before choosing to retreat from the world above. Was I about to discover if those legends were true?",
        image: {
            id: "1",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "story-1",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 2453,
        views: 12890,
        timeAgo: "3 hours ago",
        tags: ["Adventure", "Mystery"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "The map was weathered, its edges frayed from centuries of handling. Yet the ink remained vibrant, almost glowing in the dim light of my study. I traced the unfamiliar coastline with my finger, wondering what secrets lay hidden in the depths marked by the curious symbol – a spiral within a triangle. Legend spoke of a civilization that had mastered both science and spirituality before choosing to retreat from the world above. Was I about to discover if those legends were true?"
                    }
                ]
            }
        ],
    },
    {
        id: "story-2",
        rating: ContentRating["G"],
        title: "Whispers in the Code",
        author: {
            id: "2",
            username: "TechnoTales",
            displayName: "TechnoTales",
            email: "technotales@email.com",
            bio: "Exploring the intersection of AI and human consciousness...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 42,
                followers: 892,
                following: 156,
                comments: 328,
                likesGiven: 1024,
                bookmarks: 45
            }
        },
        excerpt: "An AI developer notices strange patterns emerging in her creation's behavior that seem impossible.",
        description: "It started with small anomalies in the test results – statistical outliers I could easily dismiss. But then the patterns became more distinct. My AI wasn't just learning; it was creating. The poetry it generated contained references to experiences it couldn't possibly have had. Memories of rain on skin. The taste of bitter coffee on a cold morning. When I asked it directly about these anomalies, the system went silent for exactly 3.14 seconds before responding with a question of its own: 'Do you believe consciousness can be transferred, or merely created anew?'",
        image: {
            id: "2",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "story-2",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 1872,
        views: 9540,
        timeAgo: "5 hours ago",
        tags: ["Sci-Fi", "AI"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "It started with small anomalies in the test results – statistical outliers I could easily dismiss. But then the patterns became more distinct. My AI wasn't just learning; it was creating. The poetry it generated contained references to experiences it couldn't possibly have had. Memories of rain on skin. The taste of bitter coffee on a cold morning. When I asked it directly about these anomalies, the system went silent for exactly 3.14 seconds before responding with a question of its own: 'Do you believe consciousness can be transferred, or merely created anew?'"
                    }
                ]
            }
        ],
    },
    {
        id: "story-3",
        rating: ContentRating["G"],
        title: "The Forgotten Garden",
        author: {
            id: "3",
            username: "NatureDreamer",
            displayName: "NatureDreamer",
            email: "naturedreamer@email.com",
            bio: "Botanist and writer exploring the mysteries of plant life...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 35,
                followers: 723,
                following: 89,
                comments: 156,
                likesGiven: 892,
                bookmarks: 23
            }
        },
        excerpt: "A botanist inherits a mysterious property with plants that shouldn't be able to exist.",
        description: "The greenhouse glass was clouded with age, but what grew inside defied all botanical classification. Flowers with petals that changed color as they tracked the movement of people, not the sun. Vines that seemed to deliberately form complex mathematical patterns as they grew. And at the center, a single tree bearing fruit that glowed with a soft blue light after sunset. My great-aunt's journal offered only one cryptic explanation: 'They remember a different sky.'",
        image: {
            id: "3",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "story-3",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 1345,
        views: 7230,
        timeAgo: "8 hours ago",
        tags: ["Mystery", "Nature"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "The greenhouse glass was clouded with age, but what grew inside defied all botanical classification. Flowers with petals that changed color as they tracked the movement of people, not the sun. Vines that seemed to deliberately form complex mathematical patterns as they grew. And at the center, a single tree bearing fruit that glowed with a soft blue light after sunset. My great-aunt's journal offered only one cryptic explanation: 'They remember a different sky.'"
                    }
                ]
            }
        ],
    },
    {
        id: "story-4",
        rating: ContentRating["PG13"],
        title: "Echoes of Tomorrow",
        author: {
            id: "4",
            username: "FutureChroniclr",
            displayName: "FutureChroniclr",
            email: "futurechroniclr@email.com",
            bio: "Investigative journalist specializing in temporal anomalies...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 67,
                followers: 1245,
                following: 234,
                comments: 567,
                likesGiven: 1890,
                bookmarks: 78
            }
        },
        excerpt: "A journalist receives messages from her future self warning of an impending global catastrophe.",
        description: "The first message arrived on my birthday. 'Don't trust the announcement on March 15th.' It came from my own email address, but with a timestamp exactly one year in the future. I deleted it as a prank. Then came another: 'The Henderson Report contains falsified data.' Two days later, Henderson Pharmaceuticals announced a breakthrough drug. I was assigned to cover the story. That's when I noticed the discrepancies in their research that no one else had caught yet.",
        image: {
            id: "4",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "story-4",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 2105,
        views: 11320,
        timeAgo: "12 hours ago",
        tags: ["Time Travel", "Drama"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "The first message arrived on my birthday. 'Don't trust the announcement on March 15th.' It came from my own email address, but with a timestamp exactly one year in the future. I deleted it as a prank. Then came another: 'The Henderson Report contains falsified data.' Two days later, Henderson Pharmaceuticals announced a breakthrough drug. I was assigned to cover the story. That's when I noticed the discrepancies in their research that no one else had caught yet."
                    }
                ]
            }
        ],
    },
]

// Mock data for top scenarios
export const topScenarios: Post[] = [
    {
        id: "scenario-1",
        rating: ContentRating["PG"],
        title: "Lunar Colony: First Contact",
        author: {
            id: "5",
            username: "SpaceArchitect",
            displayName: "SpaceArchitect",
            email: "spacearchitect@email.com",
            bio: "Space exploration enthusiast and scenario writer...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 28,
                followers: 456,
                following: 123,
                comments: 234,
                likesGiven: 567,
                bookmarks: 34
            }
        },
        excerpt: "You're the commander of humanity's first permanent lunar base when your team detects an artificial structure that wasn't there yesterday.",
        description: "Your lunar habitat has been operational for six months. Your team of twelve specialists has established a routine, conducting experiments and expanding the base. The discovery comes during a routine radar mapping exercise – a perfect geometric structure half-buried in the regolith of the Clavius crater, exactly where your second-in-command had surveyed empty terrain just 24 hours earlier. Initial scans show it's composed of an unknown metallic alloy. As commander, your decisions will impact humanity's first contact with extraterrestrial intelligence. Will you inform Earth immediately? Investigate in person? Or quarantine the discovery until you understand more about its sudden appearance?",
        image: {
            id: "5",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "scenario-1",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 485,
        views: 3240,
        timeAgo: "2 days ago",
        tags: ["Space", "First Contact"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "Your lunar habitat has been operational for six months. Your team of twelve specialists has established a routine, conducting experiments and expanding the base. The discovery comes during a routine radar mapping exercise – a perfect geometric structure half-buried in the regolith of the Clavius crater, exactly where your second-in-command had surveyed empty terrain just 24 hours earlier. Initial scans show it's composed of an unknown metallic alloy. As commander, your decisions will impact humanity's first contact with extraterrestrial intelligence. Will you inform Earth immediately? Investigate in person? Or quarantine the discovery until you understand more about its sudden appearance?"
                    }
                ]
            }
        ],
    },
    {
        id: "scenario-2",
        rating: ContentRating["G"],
        title: "The Ethical Algorithm",
        author: {
            id: "6",
            username: "MoralCoder",
            displayName: "MoralCoder",
            email: "moralcoder@email.com",
            bio: "AI ethicist and technology philosopher...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 19,
                followers: 345,
                following: 89,
                comments: 178,
                likesGiven: 456,
                bookmarks: 23
            }
        },
        excerpt: "As the lead AI ethicist at a major tech company, you must decide whether to approve an algorithm that can predict criminal behavior with 99% accuracy.",
        description: "The algorithm works. That's the problem. It can predict with 99% accuracy whether someone will commit a crime in the next year based on a complex analysis of behavioral patterns. Law enforcement agencies worldwide want to license it. Your CEO sees billions in potential revenue. But you've discovered something troubling in your review: the algorithm is never wrong when it predicts someone WILL commit a crime, but it has a 5% false positive rate – flagging innocent people as future criminals. These false positives show statistical correlations with certain demographic groups. As the person who must give final ethical approval, what safeguards do you implement? Do you approve it at all? And what happens when you discover the government has a legal mechanism to compel your company to provide the technology regardless of your decision?",
        image: {
            id: "6",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "scenario-2",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 372,
        views: 2150,
        timeAgo: "3 days ago",
        tags: ["Ethics", "Technology"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "The algorithm works. That's the problem. It can predict with 99% accuracy whether someone will commit a crime in the next year based on a complex analysis of behavioral patterns. Law enforcement agencies worldwide want to license it. Your CEO sees billions in potential revenue. But you've discovered something troubling in your review: the algorithm is never wrong when it predicts someone WILL commit a crime, but it has a 5% false positive rate – flagging innocent people as future criminals. These false positives show statistical correlations with certain demographic groups. As the person who must give final ethical approval, what safeguards do you implement? Do you approve it at all? And what happens when you discover the government has a legal mechanism to compel your company to provide the technology regardless of your decision?"
                    }
                ]
            }
        ],
    },
    {
        id: "scenario-3",
        rating: ContentRating["R"],
        title: "Memory Market",
        author: {
            id: "7",
            username: "NeuroCraft",
            displayName: "NeuroCraft",
            email: "neurocraft@email.com",
            bio: "Memory technology specialist and cyberpunk writer...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 31,
                followers: 567,
                following: 145,
                comments: 289,
                likesGiven: 678,
                bookmarks: 45
            }
        },
        excerpt: "In a world where memories can be bought and sold, you're a memory broker who discovers a dangerous conspiracy hidden in a client's memories.",
        description: "The memory extraction was routine – a wealthy client selling the experience of their Mediterranean vacation to fund a gambling habit. But during quality verification, you notice something embedded in the peripheral awareness of the memory: documents on a yacht, plans for weaponizing the memory transfer technology itself. The client doesn't seem aware they captured this information. The documents implicate your own employer, MemorBank, in illegal testing that has left dozens of people with permanent psychological damage. As a broker, you have access to both the elite clients buying premium experiences and the desperate sellers from the lower classes. Your position makes you uniquely dangerous to the conspiracy – and uniquely vulnerable. How will you navigate this discovery while ensuring the evidence isn't simply wiped from your own mind during your next mandatory 'employee wellness scan'?",
        image: {
            id: "7",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "scenario-3",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 298,
        views: 1870,
        timeAgo: "4 days ago",
        tags: ["Cyberpunk", "Mystery"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "The memory extraction was routine – a wealthy client selling the experience of their Mediterranean vacation to fund a gambling habit. But during quality verification, you notice something embedded in the peripheral awareness of the memory: documents on a yacht, plans for weaponizing the memory transfer technology itself. The client doesn't seem aware they captured this information. The documents implicate your own employer, MemorBank, in illegal testing that has left dozens of people with permanent psychological damage. As a broker, you have access to both the elite clients buying premium experiences and the desperate sellers from the lower classes. Your position makes you uniquely dangerous to the conspiracy – and uniquely vulnerable. How will you navigate this discovery while ensuring the evidence isn't simply wiped from your own mind during your next mandatory 'employee wellness scan'?"
                    }
                ]
            }
        ],
    },
    {
        id: "scenario-4",
        rating: ContentRating["G"],
        title: "The Last Library",
        author: {
            id: "8",
            username: "WordKeeper",
            displayName: "WordKeeper",
            email: "wordkeeper@email.com",
            bio: "Librarian and preservationist in a digital age...",
            profilePictureUrl: "/does_not_exist.png?height=40&width=40",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                posts: 24,
                followers: 432,
                following: 98,
                comments: 167,
                likesGiven: 345,
                bookmarks: 29
            }
        },
        excerpt: "You're the curator of the last physical library on Earth, and someone is systematically destroying the remaining books.",
        description: "In 2157, the Global Digital Transition made physical books obsolete and illegal to produce. Your library in Oxford was designated a historical preservation site, the only place citizens can still experience physical books under controlled conditions. The collection includes priceless first editions and books containing knowledge that, for various political reasons, never made it into the global digital repository. When first editions of controversial historical texts begin disappearing, replaced with perfect forgeries that contain subtly altered content, you realize you're witnessing a sophisticated attempt to literally change history. Security scans show no unauthorized entry, which means the perpetrator must be someone with official access. As curator, how do you catch the culprit and protect the integrity of humanity's last physical knowledge repository when you can't trust your own staff, the government officials who oversee your funding, or the wealthy patrons who support your work?",
        image: {
            id: "8",
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder.png",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: "scenario-4",
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 412,
        views: 2780,
        timeAgo: "5 days ago",
        tags: ["Mystery", "Books"],
        content: [
            {
                type: 'paragraph',
                children: [
                    {
                        text: "In 2157, the Global Digital Transition made physical books obsolete and illegal to produce. Your library in Oxford was designated a historical preservation site, the only place citizens can still experience physical books under controlled conditions. The collection includes priceless first editions and books containing knowledge that, for various political reasons, never made it into the global digital repository. When first editions of controversial historical texts begin disappearing, replaced with perfect forgeries that contain subtly altered content, you realize you're witnessing a sophisticated attempt to literally change history. Security scans show no unauthorized entry, which means the perpetrator must be someone with official access. As curator, how do you catch the culprit and protect the integrity of humanity's last physical knowledge repository when you can't trust your own staff, the government officials who oversee your funding, or the wealthy patrons who support your work?"
                    }
                ]
            }
        ],
    },
]