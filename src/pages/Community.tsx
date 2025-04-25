
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share,
  Filter,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";

// Types for posts and comments
interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

interface Post {
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

// Mock post data
const initialPosts: Post[] = [
  {
    id: "p1",
    authorId: "u1",
    authorName: "FitnessFanatic",
    authorInitials: "FF",
    title: "My 12-Week Transformation",
    content: "I just completed a 12-week fitness challenge and lost 30 pounds! Here's what I learned: consistency is key. I stuck to my workout schedule even on days I didn't feel like it. Nutrition played a huge role - I focused on hitting my protein goals and staying in a moderate calorie deficit. The community here was incredibly supportive and kept me motivated throughout the journey. Check out my progress pics!",
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&auto=format&fit=crop&q=60",
    tags: ["Transformation", "WeightLoss", "Success"],
    likes: 248,
    comments: [
      {
        id: "c1",
        authorId: "u2",
        authorName: "HealthyEater",
        content: "Amazing transformation! What was your nutrition plan like?",
        createdAt: new Date("2023-04-01T10:15:00"),
      },
      {
        id: "c2",
        authorId: "u3",
        authorName: "MarathonRunner",
        content: "Incredible progress! What kept you motivated on tough days?",
        createdAt: new Date("2023-04-01T14:22:00"),
      },
    ],
    bookmarked: false,
    createdAt: new Date("2023-04-01T08:30:00"),
  },
  {
    id: "p2",
    authorId: "u2",
    authorName: "HealthyEater",
    authorInitials: "HE",
    title: "Meal Prep Sunday",
    content: "Just finished my weekly meal prep! I've found that spending 2 hours on Sunday saves me so much time and stress during the week. This week I prepared grilled chicken with roasted veggies, quinoa bowls, and protein-packed overnight oats. Having healthy meals ready to go helps me avoid takeout and stay on track with my nutrition goals.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=60",
    tags: ["Nutrition", "MealPrep", "HealthyEating"],
    likes: 182,
    comments: [
      {
        id: "c3",
        authorId: "u4",
        authorName: "GymNewbie",
        content: "This looks amazing! Would you mind sharing some of your recipes?",
        createdAt: new Date("2023-04-02T09:45:00"),
      },
    ],
    bookmarked: false,
    createdAt: new Date("2023-04-02T08:15:00"),
  },
  {
    id: "p3",
    authorId: "u3",
    authorName: "MarathonRunner",
    authorInitials: "MR",
    title: "First Marathon Experience",
    content: "I DID IT! Completed my first marathon yesterday in 4:12. The journey from couch to 26.2 miles took me 8 months of consistent training. The last 6 miles were brutal, but the feeling of crossing that finish line was worth every early morning run and blister. My advice to anyone considering a marathon: respect the distance, follow a proper training plan, and don't neglect recovery!",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60",
    tags: ["Running", "Marathon", "Endurance"],
    likes: 315,
    comments: [
      {
        id: "c4",
        authorId: "u1",
        authorName: "FitnessFanatic",
        content: "Congratulations! That's an awesome time for your first marathon!",
        createdAt: new Date("2023-04-03T11:05:00"),
      },
      {
        id: "c5",
        authorId: "u5",
        authorName: "YogaLover",
        content: "Amazing achievement! What was your training plan like?",
        createdAt: new Date("2023-04-03T13:30:00"),
      },
    ],
    bookmarked: false,
    createdAt: new Date("2023-04-03T07:45:00"),
  },
  {
    id: "p4",
    authorId: "u4",
    authorName: "GymNewbie",
    authorInitials: "GN",
    title: "First Month at the Gym",
    content: "Just finished my first month of consistent gym workouts and I'm already seeing progress! I was intimidated at first, but focusing on proper form and starting with manageable weights helped me build confidence. The gym community has been surprisingly supportive. Looking forward to continuing this journey!",
    tags: ["Beginner", "GymLife", "Progress"],
    likes: 97,
    comments: [
      {
        id: "c6",
        authorId: "u3",
        authorName: "MarathonRunner",
        content: "We all start somewhere! Keep it up, consistency is key!",
        createdAt: new Date("2023-04-04T16:20:00"),
      },
    ],
    bookmarked: false,
    createdAt: new Date("2023-04-04T15:10:00"),
  },
  {
    id: "p5",
    authorId: "u5",
    authorName: "YogaLover",
    authorInitials: "YL",
    title: "How Yoga Transformed My Fitness",
    content: "I used to think yoga was just stretching, but incorporating it into my fitness routine has been game-changing. It's improved my mobility, prevented injuries, and helped with recovery between tough workouts. Plus, the mental benefits of mindfulness and breath control have improved my overall training. Don't sleep on yoga as a powerful component of your fitness regimen!",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=60",
    tags: ["Yoga", "Mobility", "Recovery"],
    likes: 143,
    comments: [
      {
        id: "c7",
        authorId: "u2",
        authorName: "HealthyEater",
        content: "I've been thinking about adding yoga to my routine. Any beginner recommendations?",
        createdAt: new Date("2023-04-05T10:45:00"),
      },
    ],
    bookmarked: false,
    createdAt: new Date("2023-04-05T09:30:00"),
  },
];

const Community = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<"top" | "new" | "trending">("top");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });
  const [commentText, setCommentText] = useState<string>("");
  const [activePostId, setActivePostId] = useState<string | null>(null);

  // Filter posts based on selected filter
  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === "new") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (filter === "top") {
      return b.likes - a.likes;
    } else {
      // trending - combination of recent and popular
      const recencyScore = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60 * 24); // days old
      const popularityScore = a.likes * 10 + a.comments.length * 20;
      const aTrendingScore = popularityScore / (recencyScore + 1);
      
      const bRecencyScore = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const bPopularityScore = b.likes * 10 + b.comments.length * 20;
      const bTrendingScore = bPopularityScore / (bRecencyScore + 1);
      
      return bTrendingScore - aTrendingScore;
    }
  });

  // Create a new post
  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post",
        variant: "destructive",
      });
      return;
    }
    
    const newPostData: Post = {
      id: `p${Date.now()}`,
      authorId: currentUser?.email || "anonymous",
      authorName: currentUser?.fullName || "Anonymous User",
      authorInitials: currentUser?.fullName?.split(" ").map(n => n[0]).join("") || "AU",
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      likes: 0,
      comments: [],
      bookmarked: false,
      createdAt: new Date(),
    };
    
    if (newPost.image) {
      newPostData.image = newPost.image;
    }
    
    setPosts([newPostData, ...posts]);
    setNewPost({ title: "", content: "", tags: "", image: "" });
    setIsCreatePostOpen(false);
    
    toast({
      title: "Post created",
      description: "Your post has been published to the community",
    });
  };

  // Like a post
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  // Bookmark a post
  const handleBookmarkPost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked };
      }
      return post;
    }));
    
    toast({
      description: "Post saved to your bookmarks",
    });
  };

  // Add a comment to a post
  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) {
      return;
    }
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      authorId: currentUser?.email || "anonymous",
      authorName: currentUser?.fullName || "Anonymous User",
      content: commentText,
      createdAt: new Date(),
    };
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
    
    setCommentText("");
    
    toast({
      description: "Comment added successfully",
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-fitness-primary to-fitness-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fitness Community</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Connect with fellow fitness enthusiasts, share your journey, and get inspired
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Feed */}
            <div className="flex-1 order-2 md:order-1">
              <div className="flex items-center justify-between mb-6">
                <Tabs defaultValue="top" value={filter} onValueChange={(v) => setFilter(v as any)}>
                  <TabsList>
                    <TabsTrigger value="top">Top</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button onClick={() => setIsCreatePostOpen(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Create Post
                </Button>
              </div>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to start a conversation!
                  </p>
                  <Button onClick={() => setIsCreatePostOpen(true)}>
                    Create a Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {post.authorInitials}
                              </AvatarFallback>
                              {post.avatar && <AvatarImage src={post.avatar} />}
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{post.authorName}</h3>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(post.createdAt)}
                                </span>
                              </div>
                              <h2 className="text-xl font-semibold mt-1 mb-2">{post.title}</h2>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="whitespace-pre-line">{post.content}</p>
                          </div>
                          
                          {post.image && (
                            <div className="mb-4 rounded-md overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-auto max-h-96 object-cover" 
                              />
                            </div>
                          )}
                          
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline">{tag}</Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <button 
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => handleLikePost(post.id)}
                              >
                                <Heart className="h-4 w-4" /> {post.likes}
                              </button>
                              <button 
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
                              >
                                <MessageSquare className="h-4 w-4" /> {post.comments.length}
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                className={`text-muted-foreground hover:text-primary transition-colors ${post.bookmarked ? 'text-primary' : ''}`}
                                onClick={() => handleBookmarkPost(post.id)}
                              >
                                <Bookmark className="h-4 w-4" />
                              </button>
                              <button className="text-muted-foreground hover:text-primary transition-colors">
                                <Share className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          {activePostId === post.id && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Comments</h4>
                                {post.comments.length > 0 ? (
                                  <div className="space-y-4">
                                    {post.comments.map(comment => (
                                      <div key={comment.id} className="flex gap-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback className="text-xs">
                                            {comment.authorName.substring(0, 2)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm">{comment.authorName}</span>
                                            <span className="text-xs text-muted-foreground">
                                              {formatDate(comment.createdAt)}
                                            </span>
                                          </div>
                                          <p className="text-sm mt-1">{comment.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">
                                    No comments yet. Be the first to comment!
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex gap-2 items-start">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {currentUser?.fullName?.charAt(0) || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <Textarea 
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="min-h-[80px] mb-2"
                                  />
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleAddComment(post.id)}
                                    disabled={!commentText.trim()}
                                  >
                                    Post Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-72 order-1 md:order-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-4">
                    Share your fitness journey, get advice, and connect with others on the same path.
                  </p>
                  <Button className="w-full" onClick={() => setIsCreatePostOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Create Post
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="cursor-pointer">#Transformation</Badge>
                    <Badge className="cursor-pointer">#Motivation</Badge>
                    <Badge className="cursor-pointer">#Nutrition</Badge>
                    <Badge className="cursor-pointer">#WorkoutTips</Badge>
                    <Badge className="cursor-pointer">#BeginnerFitness</Badge>
                    <Badge className="cursor-pointer">#Cardio</Badge>
                    <Badge className="cursor-pointer">#Strength</Badge>
                    <Badge className="cursor-pointer">#Recovery</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Share your fitness journey, ask questions, or provide tips to the community
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input 
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Textarea 
                placeholder="What's on your mind?"
                className="min-h-[120px]"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Input 
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Example: Workout, Nutrition, Question
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Add Image (Optional)</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" type="button">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              
              <Input 
                placeholder="Or paste image URL"
                value={newPost.image}
                onChange={(e) => setNewPost({...newPost, image: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>
              Publish Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
