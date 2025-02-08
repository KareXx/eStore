import CategoryType from "../category";

export default interface ProductType {
    [key: string]: any;
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    details: string;
    collection: string;
    images: string[];
    categories: CategoryType[];
}