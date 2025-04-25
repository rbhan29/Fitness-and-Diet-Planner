import { supabase } from '@/lib/supabaseclient';
import { Post, Comment } from '@/types/community';

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map(p => ({
    id: p.id,
    title: p.title,
    content: p.content,
    tags: p.tags || [],
    image: p.image_url || null,
    authorId: p.author_id,
    authorName: p.author_name,
    authorInitials: p.author_initials,
    avatar: p.avatar_url || null,
    likes: p.likes || 0,
    bookmarked: p.bookmarked || false,
    createdAt: new Date(p.created_at),
    comments: (p.comments || []).map((c: any) => ({
      id: c.id,
      authorId: c.authorId,
      authorName: c.authorName,
      content: c.content,
      createdAt: new Date(c.createdAt),
    })),
  }));
}

export async function createPost(data: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'bookmarked'>): Promise<boolean> {
  const { error } = await supabase.from('posts').insert([{ 
    author_id: data.authorId,
    author_name: data.authorName,
    author_initials: data.authorInitials,
    avatar_url: data.avatar,
    title: data.title,
    content: data.content,
    image_url: data.image,
    tags: data.tags,
  }]).single();

  return !error;
}

export async function likePost(postId: string): Promise<boolean> {
  const { data: current, error: fetchError } = await supabase
  .from('posts')
  .select('likes')
  .eq('id', postId)
  .single()
  if (fetchError) throw fetchError
  if (!current) throw new Error('Post not found')
  const { error: updateError } = await supabase
  .from('posts')
  .update({ likes: current.likes + 1 })
  .eq('id', postId)
  .select()
  .single()
  return !updateError;
}

export async function toggleBookmark(postId: string): Promise<boolean> {
  const { data: curr, error: e1 } = await supabase.from('posts').select('bookmarked').eq('id', postId).single();
  if (e1) throw e1;
  const { error } = await supabase
    .from('posts')
    .update({ bookmarked: !curr.bookmarked })
    .eq('id', postId)
    .single();
  return !error;
}

export async function addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<boolean> {
  const { error } = await supabase.from('comments').insert([{ 
    post_id: postId,
    author_id: comment.authorId,
    author_name: comment.authorName,
    content: comment.content,
  }]).single();
  return !error;
}