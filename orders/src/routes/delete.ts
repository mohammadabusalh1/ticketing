import express, { type Request, type Response } from 'express';
const router = express.Router();

// DELETE /api/orders/:orderId -> cancel order
router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  res.send({ message: "Order cancelled", orderId });
});

export { router as deleteOrderRouter };
