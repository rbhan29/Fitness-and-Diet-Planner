export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorInitials: string;
    avatar?: string;
    title: string;
    content: string;
    image?: string;
    tags: string[];
    likes: number;
    comments: Comment[];
    bookmarked: boolean;
    createdAt: Date;
}

export interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: Date;
}