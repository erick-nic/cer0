export default interface ICategory extends Document {
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}