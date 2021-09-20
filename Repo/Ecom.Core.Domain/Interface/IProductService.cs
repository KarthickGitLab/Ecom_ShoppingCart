using Ecom.Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecom.Core.Domain.Interface
{
    public interface IProductService
    {
        Task<List<ProductModel>> GetAllProducts();
        Task<ProductModel> GetProductById(Guid Id);
        Task<ProductModel> AddUpdateProduct(ProductModel product);
        Task<bool> DeleteProductById(Guid Id);
    }
}
