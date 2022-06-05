import { db } from "./firebase";
import { collection } from 'firebase/firestore/lite';

export const orderCol = collection(db, 'orders')
export const restaurantCol = collection(db, 'restaurants')