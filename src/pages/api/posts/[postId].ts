import type { NextApiRequest, NextApiResponse } from 'next';
import * as db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  try {
    if (req.method === 'PATCH') {
      const { action } = req.body;
      let updated;
      if (action === 'like') updated = await db.likePost(postId as string);
      else if (action === 'bookmark') updated = await db.toggleBookmark(postId as string);
      else return res.status(400).json({ error: 'Invalid action' });
      return res.status(200).json(updated);
    }
    res.setHeader('Allow',['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}