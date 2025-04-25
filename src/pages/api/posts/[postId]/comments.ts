import type { NextApiRequest, NextApiResponse } from 'next';
import * as db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  try {
    if (req.method === 'POST') {
      const comment = await db.addComment(postId as string, req.body);
      return res.status(201).json(comment);
    }
    res.setHeader('Allow',['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}