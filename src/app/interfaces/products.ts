export interface Products {
        id: number;
        title: string;
        description: string;
        price: number;
        image: string;
        category: string;
        rating: {
          rate: number;
          count: number;
        };
      
}
