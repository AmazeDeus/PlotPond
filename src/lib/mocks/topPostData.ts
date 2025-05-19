import { ContentRating, type Post } from "~/lib/mocks/types"

// Mock data for top stories
export const topStories: Post[] = [
    {
        id: 1,
        type: 'story',
        rating: ContentRating["G"],
        title: "The Last Journey",
        slug: "the-last-journey",
        bookmarks: 156,
        author: {
            id: 1,
            username: "ElenaWrites",
            displayName: "ElenaWrites",
            email: "elenawrites@email.com",
            bio: "I like writing mystery stories...",
            profilePicture: {
                id: 1,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 1,
                parentType: "user",
                uploadedAt: new Date(),
            }, // In prod, will only be the profilePictureImageId
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, // In prod, will only be the authorId
        excerpt: "A traveler discovers an ancient map leading to a forgotten civilization hidden beneath the ocean.",
        description: "The map was weathered, its edges frayed from centuries of handling. Yet the ink remained vibrant, almost glowing in the dim light of my study. I traced the unfamiliar coastline with my finger, wondering what secrets lay hidden in the depths marked by the curious symbol – a spiral within a triangle. Legend spoke of a civilization that had mastered both science and spirituality before choosing to retreat from the world above. Was I about to discover if those legends were true?",
        image: {
            id: 1,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 1,
            parentType: "post",
            uploadedAt: new Date(),
        }, // In prod, will only be the imageId
        likes: 0,
        views: 21,
        timeAgo: "3 hours ago",
        tags: ["Adventure", "Mystery"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "The map was weathered, its edges frayed from centuries of handling. Yet the ink remained vibrant, almost glowing in the dim light of my study. I traced the unfamiliar coastline with my finger, wondering what secrets lay hidden in the depths marked by the curious symbol – a spiral within a triangle. Legend spoke of a civilization that had mastered both science and spirituality before choosing to retreat from the world above. Was I about to discover if those legends were true?"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        // ...imageId: ,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        type: 'story',
        rating: ContentRating["G"],
        title: "Whispers in the Code",
        slug: "whispers-in-the-code",
        bookmarks: 89,
        author: {
            id: 2,
            username: "TechnoTales",
            displayName: "TechnoTales",
            email: "technotales@email.com",
            bio: "Exploring the intersection of AI and human consciousness...",
            profilePicture: {
                id: 2,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 2,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "An AI developer notices strange patterns emerging in her creation's behavior that seem impossible.",
        description: "It started with small anomalies in the test results – statistical outliers I could easily dismiss. But then the patterns became more distinct. My AI wasn't just learning; it was creating. The poetry it generated contained references to experiences it couldn't possibly have had. Memories of rain on skin. The taste of bitter coffee on a cold morning. When I asked it directly about these anomalies, the system went silent for exactly 3.14 seconds before responding with a question of its own: 'Do you believe consciousness can be transferred, or merely created anew?'",
        image: {
            id: 2,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 2,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 7,
        views: 365,
        timeAgo: "5 hours ago",
        tags: ["Sci-Fi", "AI"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "It started with small anomalies in the test results – statistical outliers I could easily dismiss. But then the patterns became more distinct. My AI wasn't just learning; it was creating. The poetry it generated contained references to experiences it couldn't possibly have had. Memories of rain on skin. The taste of bitter coffee on a cold morning. When I asked it directly about these anomalies, the system went silent for exactly 3.14 seconds before responding with a question of its own: 'Do you believe consciousness can be transferred, or merely created anew?'"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 2,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        type: 'story',
        rating: ContentRating["G"],
        title: "The Forgotten Garden",
        slug: "the-forgotten-garden",
        bookmarks: 67,
        author: {
            id: 3,
            username: "NatureDreamer",
            displayName: "NatureDreamer",
            email: "naturedreamer@email.com",
            bio: "Botanist and writer exploring the mysteries of plant life...",
            profilePicture: {
                id: 3,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 3,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "A botanist inherits a mysterious property with plants that shouldn't be able to exist.",
        description: "The greenhouse glass was clouded with age, but what grew inside defied all botanical classification. Flowers with petals that changed color as they tracked the movement of people, not the sun. Vines that seemed to deliberately form complex mathematical patterns as they grew. And at the center, a single tree bearing fruit that glowed with a soft blue light after sunset. My great-aunt's journal offered only one cryptic explanation: 'They remember a different sky.'",
        image: {
            id: 3,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 3,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 8,
        views: 400,
        timeAgo: "8 hours ago",
        tags: ["Mystery", "Nature"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "The greenhouse glass was clouded with age, but what grew inside defied all botanical classification. Flowers with petals that changed color as they tracked the movement of people, not the sun. Vines that seemed to deliberately form complex mathematical patterns as they grew. And at the center, a single tree bearing fruit that glowed with a soft blue light after sunset. My great-aunt's journal offered only one cryptic explanation: 'They remember a different sky.'"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 3,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        type: 'story',
        rating: ContentRating["PG13"],
        title: "Echoes of Tomorrow",
        slug: "echoes-of-tomorrow",
        bookmarks: 234,
        author: {
            id: 4,
            username: "FutureChroniclr",
            displayName: "FutureChroniclr",
            email: "futurechroniclr@email.com",
            bio: "Investigative journalist specializing in temporal anomalies...",
            profilePicture: {
                id: 4,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 4,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "A journalist receives messages from her future self warning of an impending global catastrophe.",
        description: "The first message arrived on my birthday. 'Don't trust the announcement on March 15th.' It came from my own email address, but with a timestamp exactly one year in the future. I deleted it as a prank. Then came another: 'The Henderson Report contains falsified data.' Two days later, Henderson Pharmaceuticals announced a breakthrough drug. I was assigned to cover the story. That's when I noticed the discrepancies in their research that no one else had caught yet.",
        image: {
            id: 4,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 4,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 2,
        views: 52,
        timeAgo: "12 hours ago",
        tags: ["Time Travel", "Drama"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "The first message arrived on my birthday. 'Don't trust the announcement on March 15th.' It came from my own email address, but with a timestamp exactly one year in the future. I deleted it as a prank. Then came another: 'The Henderson Report contains falsified data.' Two days later, Henderson Pharmaceuticals announced a breakthrough drug. I was assigned to cover the story. That's when I noticed the discrepancies in their research that no one else had caught yet."
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 4,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

// Mock data for top scenarios
export const topScenarios: Post[] = [
    {
        id: 5,
        type: 'scenario',
        rating: ContentRating["PG"],
        title: "Lunar Colony: First Contact",
        slug: "lunar-colony-first-contact",
        bookmarks: 45,
        author: {
            id: 5,
            username: "SpaceArchitect",
            displayName: "SpaceArchitect",
            email: "spacearchitect@email.com",
            bio: "Space exploration enthusiast and scenario writer...",
            profilePicture: {
                id: 5,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 5,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "You're the commander of humanity's first permanent lunar base when your team detects an artificial structure that wasn't there yesterday.",
        description: "Your lunar habitat has been operational for six months. Your team of twelve specialists has established a routine, conducting experiments and expanding the base. The discovery comes during a routine radar mapping exercise – a perfect geometric structure half-buried in the regolith of the Clavius crater, exactly where your second-in-command had surveyed empty terrain just 24 hours earlier. Initial scans show it's composed of an unknown metallic alloy. As commander, your decisions will impact humanity's first contact with extraterrestrial intelligence. Will you inform Earth immediately? Investigate in person? Or quarantine the discovery until you understand more about its sudden appearance?",
        image: {
            id: 5,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 5,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 8,
        views: 454,
        timeAgo: "2 days ago",
        tags: ["Space", "First Contact"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "Your lunar habitat has been operational for six months. Your team of twelve specialists has established a routine, conducting experiments and expanding the base. The discovery comes during a routine radar mapping exercise – a perfect geometric structure half-buried in the regolith of the Clavius crater, exactly where your second-in-command had surveyed empty terrain just 24 hours earlier. Initial scans show it's composed of an unknown metallic alloy. As commander, your decisions will impact humanity's first contact with extraterrestrial intelligence. Will you inform Earth immediately? Investigate in person? Or quarantine the discovery until you understand more about its sudden appearance?"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 5,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        type: 'scenario',
        rating: ContentRating["G"],
        title: "The Ethical Algorithm",
        slug: "the-ethical-algorithm",
        bookmarks: 78,
        author: {
            id: 6,
            username: "MoralCoder",
            displayName: "MoralCoder",
            email: "moralcoder@email.com",
            bio: "AI ethicist and technology philosopher...",
            profilePicture: {
                id: 6,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 6,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "As the lead AI ethicist at a major tech company, you must decide whether to approve an algorithm that can predict criminal behavior with 99% accuracy.",
        description: "The algorithm works. That's the problem. It can predict with 99% accuracy whether someone will commit a crime in the next year based on a complex analysis of behavioral patterns. Law enforcement agencies worldwide want to license it. Your CEO sees billions in potential revenue. But you've discovered something troubling in your review: the algorithm is never wrong when it predicts someone WILL commit a crime, but it has a 5% false positive rate – flagging innocent people as future criminals. These false positives show statistical correlations with certain demographic groups. As the person who must give final ethical approval, what safeguards do you implement? Do you approve it at all? And what happens when you discover the government has a legal mechanism to compel your company to provide the technology regardless of your decision?",
        image: {
            id: 6,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 6,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 4,
        views: 245,
        timeAgo: "3 days ago",
        tags: ["Ethics", "Technology"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "The algorithm works. That's the problem. It can predict with 99% accuracy whether someone will commit a crime in the next year based on a complex analysis of behavioral patterns. Law enforcement agencies worldwide want to license it. Your CEO sees billions in potential revenue. But you've discovered something troubling in your review: the algorithm is never wrong when it predicts someone WILL commit a crime, but it has a 5% false positive rate – flagging innocent people as future criminals. These false positives show statistical correlations with certain demographic groups. As the person who must give final ethical approval, what safeguards do you implement? Do you approve it at all? And what happens when you discover the government has a legal mechanism to compel your company to provide the technology regardless of your decision?"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 6,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        type: 'scenario',
        rating: ContentRating["R"],
        title: "Memory Market",
        slug: "memory-market",
        bookmarks: 92,
        author: {
            id: 7,
            username: "NeuroCraft",
            displayName: "NeuroCraft",
            email: "neurocraft@email.com",
            bio: "Memory technology specialist and cyberpunk writer...",
            profilePicture: {
                id: 7,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 7,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "In a world where memories can be bought and sold, you're a memory broker who discovers a dangerous conspiracy hidden in a client's memories.",
        description: "The memory extraction was routine – a wealthy client selling the experience of their Mediterranean vacation to fund a gambling habit. But during quality verification, you notice something embedded in the peripheral awareness of the memory: documents on a yacht, plans for weaponizing the memory transfer technology itself. The client doesn't seem aware they captured this information. The documents implicate your own employer, MemorBank, in illegal testing that has left dozens of people with permanent psychological damage. As a broker, you have access to both the elite clients buying premium experiences and the desperate sellers from the lower classes. Your position makes you uniquely dangerous to the conspiracy – and uniquely vulnerable. How will you navigate this discovery while ensuring the evidence isn't simply wiped from your own mind during your next mandatory 'employee wellness scan'?",
        image: {
            id: 7,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 7,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 3,
        views: 111,
        timeAgo: "4 days ago",
        tags: ["Cyberpunk", "Mystery"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "The memory extraction was routine – a wealthy client selling the experience of their Mediterranean vacation to fund a gambling habit. But during quality verification, you notice something embedded in the peripheral awareness of the memory: documents on a yacht, plans for weaponizing the memory transfer technology itself. The client doesn't seem aware they captured this information. The documents implicate your own employer, MemorBank, in illegal testing that has left dozens of people with permanent psychological damage. As a broker, you have access to both the elite clients buying premium experiences and the desperate sellers from the lower classes. Your position makes you uniquely dangerous to the conspiracy – and uniquely vulnerable. How will you navigate this discovery while ensuring the evidence isn't simply wiped from your own mind during your next mandatory 'employee wellness scan'?"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 7,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 8,
        type: 'scenario',
        rating: ContentRating["G"],
        title: "The Last Library",
        slug: "the-last-library",
        bookmarks: 123,
        author: {
            id: 8,
            username: "WordKeeper",
            displayName: "WordKeeper",
            email: "wordkeeper@email.com",
            bio: "Librarian and preservationist in a digital age...",
            profilePicture: {
                id: 8,
                name: "does_not_exist",
                altText: "does_not_exist",
                storageKey: "profile/does_not_exist",
                mimeType: "image/png",
                width: 400,
                height: 200,
                size: 2000000,
                parentId: 8,
                parentType: "user",
                uploadedAt: new Date(),
            },
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        excerpt: "You're the curator of the last physical library on Earth, and someone is systematically destroying the remaining books.",
        description: "In 2157, the Global Digital Transition made physical books obsolete and illegal to produce. Your library in Oxford was designated a historical preservation site, the only place citizens can still experience physical books under controlled conditions. The collection includes priceless first editions and books containing knowledge that, for various political reasons, never made it into the global digital repository. When first editions of controversial historical texts begin disappearing, replaced with perfect forgeries that contain subtly altered content, you realize you're witnessing a sophisticated attempt to literally change history. Security scans show no unauthorized entry, which means the perpetrator must be someone with official access. As curator, how do you catch the culprit and protect the integrity of humanity's last physical knowledge repository when you can't trust your own staff, the government officials who oversee your funding, or the wealthy patrons who support your work?",
        image: {
            id: 8,
            name: "matrix_placeholder",
            altText: "matrix placeholder",
            storageKey: "posts/matrix_placeholder",
            mimeType: "image/png",
            width: 400,
            height: 200,
            size: 2000000,
            parentId: 8,
            parentType: "post",
            uploadedAt: new Date(),
        },
        likes: 5,
        views: 245,
        timeAgo: "5 days ago",
        tags: ["Mystery", "Books"],
        content: {
            type: "document",
            children:
                [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: "In 2157, the Global Digital Transition made physical books obsolete and illegal to produce. Your library in Oxford was designated a historical preservation site, the only place citizens can still experience physical books under controlled conditions. The collection includes priceless first editions and books containing knowledge that, for various political reasons, never made it into the global digital repository. When first editions of controversial historical texts begin disappearing, replaced with perfect forgeries that contain subtly altered content, you realize you're witnessing a sophisticated attempt to literally change history. Security scans show no unauthorized entry, which means the perpetrator must be someone with official access. As curator, how do you catch the culprit and protect the integrity of humanity's last physical knowledge repository when you can't trust your own staff, the government officials who oversee your funding, or the wealthy patrons who support your work?"
                            }
                        ]
                    },
                    {
                        type: 'image',
                        imageId: 8,
                        children: [{ text: '' }],
                    }
                ]
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]