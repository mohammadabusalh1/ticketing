import express, { type Request, type Response } from 'express';

const router = express.Router();

// GET /api/orders -> list all orders for current user
router.get('/api/orders', async (req: Request, res: Response) => {
  // Placeholder response
  res.send({ orders: [] });
});

export { router as indexOrderRouter };
