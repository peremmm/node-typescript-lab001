import { Model, Sequelize, DataTypes } from 'sequelize';
import { ProductAttributes } from '../attributes';

class Product extends Model implements ProductAttributes {
    public ProdID!: string;
    public ProdName!: string;
    public Base_Cost!: number;

    static initModel(sequelize: Sequelize): void {
        Product.init(
            {
                ProdID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                ProdName: {
                    type: DataTypes.STRING,
                },
                Base_Cost: {
                    type: DataTypes.DOUBLE,
                },
            },
            {
                sequelize,
                // underscored: true,
                tableName: 'Product',
                timestamps: false,
            }
        );
    }
}

export default Product;
