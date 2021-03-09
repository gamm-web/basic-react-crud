// import db config
import db from "..";

// collection name
const COLLECTION_NAME = "products";

// mapping the product document
export type Product = {
    id?: string;
    product_name: string;
    description: string;
    price: number;
    discount: number;
    created_date: any;
    modified_date: any;
};

// retrieve all products
export const all = async (): Promise<Array<Product>> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const data: Array<any> = [];

    snapshot.docs.map((_data) => {
        return data.push({
            id: _data.id, // because id field in separate function in firestore
            ..._data.data(), // the remaining fields
        });
    });

    // return and convert back it array of todo
    return data as Array<Product>;
};

// create a product
export const create = async (product: Product): Promise<Product> => {
    const docRef = await db.collection(COLLECTION_NAME).add(product);

    // return new created product
    return {
        id: docRef.id,
        ...product,
    } as Product;
};

// update a product
export const update = async (id: string, product: Product): Promise<Product> => {
    await db.collection(COLLECTION_NAME).doc(id).update(product);

    // return updated product
    return {
        id: id,
        ...product,
    } as Product;
};

// delete a product
export const remove = async (id: string) => {
    await db.collection(COLLECTION_NAME).doc(id).delete();
};