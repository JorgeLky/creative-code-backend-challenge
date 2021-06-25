import { Router } from 'express';
import { loginValidation } from '../middlewares/loginValidation';
import { addressValidation } from '../middlewares/infValidation';
import {
  getAllAddress,
  getAddressById,
  createAddress,
  deleteAddress,
  updateAddress,
} from '../controllers/addressController';

const addressRouter = Router();

addressRouter.get('/address',loginValidation, getAllAddress);
addressRouter.get('/address/:id',loginValidation, getAddressById);
addressRouter.post('/address',loginValidation, addressValidation, createAddress);
addressRouter.put('/address/:id',loginValidation, addressValidation, updateAddress);
addressRouter.delete('/address/:id',loginValidation, deleteAddress);

export default addressRouter;