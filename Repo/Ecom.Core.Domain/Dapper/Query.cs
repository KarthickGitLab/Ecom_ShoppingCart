namespace Ecom.Core.Domain.Dapper
{
    public static class Query
    {
        public const string GetProductList = "dbo.usp_Ecom_GetProductList";
        public const string GetProductById = "dbo.usp_Ecom_GetProductById";
        public const string AddUpdateProduct = "dbo.usp_Ecom_AddUpdateProduct";
        public const string DeleteProduct = "dbo.usp_Ecom_DeleteProduct";
    }
}
