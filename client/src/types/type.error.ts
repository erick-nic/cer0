export type TErrors = {
    "users": {
        name?: string,
        email?: string,
        password?: string,
        phone?: string,
    },
    "products": {
        name?: string;
        description?: string;
        price?: string;
        category?: string;
        brand?: string;
        stock?: string;
        images?: string;
        attributes?: {
            color?: string;
            weight?: string;
            dimensions?: string;
        };
        rating?: string;
    }
};