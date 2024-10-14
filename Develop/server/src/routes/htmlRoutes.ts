import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, type Request, type Response } from 'express';
// It's like asking, "Where exactly am I in the file system?"
const __filename = fileURLToPath(import.meta.url);
// It's like asking, "What folder am I in?"
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
// setting up route for the root path '/' so when someone visits the main page this code runs
router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
