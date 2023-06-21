import { db } from '../database/models';
import Product from '../database/models/product';

class ProductService {
    private static instance: ProductService;

    static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    findAll = async () => {
        const products: Product[] = await Product.findAll();
        return products;
    };

    findById = async (ProdID: string) => {
        const existinProduct: Product | null = await Product.findByPk(ProdID);
        return existinProduct;
    };

    save = async (object: any) => {
        try {
            if (!object && Object.keys(object).length === 0) {
                throw new Error(`Object must contain atleast one property`);
            }
            const product = await Product.create({ ...object });
            return product;
        } catch (err) {
            throw err;
        }
    };

    update = async (ProdID: string, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            );
        }

        let existingProduct = await this.findById(ProdID);
        if (!existingProduct) {
            throw new Error('employee_not_found');
        }

        try {
            await Product.update(
                { ...object },
                {
                    where: { ProdID },
                }
            );

            existingProduct = await this.findById(ProdID);
            return existingProduct;
        } catch (err) {
            throw err;
        }
    };

    deleteByPrimaryKey = async (ProdID: string) => {
        let existingProduct = await this.findById(ProdID);
        if (!existingProduct) {
            throw new Error('department_not_found');
        }

        try {
            await existingProduct.destroy();
        } catch (err) {
            throw err;
        }
    };
}

export default ProductService;
