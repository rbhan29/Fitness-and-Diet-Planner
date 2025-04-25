import type { NextApiRequest, NextApiResponse } from 'next';
import * as db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const posts = await db.getPosts();
      return res.status(200).json(posts);
    }
    if (req.method === 'POST') {
      const created = await db.createPost(req.body);
      return res.status(201).json(created);
    }
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}