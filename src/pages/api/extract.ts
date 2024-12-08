import { generateGroceriesList } from '@/lib/fetch'
import { GroceryList } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { PersistentFile } from 'formidable';
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing to handle FormData manually
  },
};

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GroceryList|unknown>
) {
  const form = formidable({});;

  const [fields, files] = await form.parse(req);

  Object.keys(files).forEach(key => {
    files[key] = files[key].map((content: PersistentFile) => new Blob([fs.readFileSync(content.filepath)]));
  })
  
  return res.status(200).json(await generateGroceriesList({...fields, ...files}));
}
