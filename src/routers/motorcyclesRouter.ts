import { Router } from 'express';
import { bikesController, BIKES, BIKES_ID } from './main';

const router = Router();

router.post(BIKES, (req, res) => bikesController.create(req, res));
router.get(BIKES, (req, res) => bikesController.read(req, res));
router.get(BIKES_ID, (req, res) => bikesController.readOne(req, res));
// router.put(BIKES_ID, (req, res) => bikesController.update(req, res));
// router.delete(BIKES_ID, (req, res) => bikesController.delete(req, res));

export default router;
