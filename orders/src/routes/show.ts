import express, { type Request, type Response } from 'express';
const router = express.Router();

// GET /api/orders/:orderId -> show order details
router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  res.send({ orderId, details: "Order details here" });
});

export { router as showOrderRouter };
