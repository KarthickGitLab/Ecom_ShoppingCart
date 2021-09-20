import { Guid } from "guid-typescript";

export interface Product {
    ProductId: string;
    SkuCode: string;
    Name: string;
    Price: number;
    ImageUrl: string;
    IsActive: boolean
    CreatedBy: string;
    UpdatedBy: string;
    CreatedOn: Date;
    UpdatedOn: Date;
}

export interface CartProduct extends Product{
    Quantity: number;
    TotalAmount:number
}
