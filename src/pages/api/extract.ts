import { generateGroceriesList } from '@/lib/fetch'
import { GroceryList } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GroceryList>
) {
  return res.status(200).json(await generateGroceriesList(req.body.text));
}
