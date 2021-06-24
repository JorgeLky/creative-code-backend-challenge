import { Router } from 'express';
import {
  getAllAddress,
  getAddressById,
  createAddress,
  deleteAddress,
  updateAddress,
} from '../controllers/addressController';

const addressRouter = Router();

addressRouter.get('/address', getAllAddress);
addressRouter.get('/address/:id', getAddressById);
addressRouter.post('/address', createAddress);
addressRouter.put('/address/:id', updateAddress);
addressRouter.delete('/address/:id', deleteAddress);

export default addressRouter;