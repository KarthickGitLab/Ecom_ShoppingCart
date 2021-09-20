using Ecom.Core.Data.Repository;
using Ecom.Core.Domain.Interface;
using Ecom.Core.Domain.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Ecom.Core.Domain.Dapper;
using System.Data;
using System.Linq;
using Dapper;

namespace Ecom.Core.Domain.Service
{
    public class ProductService : IProductService
    {
        public readonly IGenericRepository _repository;
        public readonly ILogger<ProductService> _logger;

        public ProductService(IGenericRepository repository, ILogger<ProductService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ProductModel> AddUpdateProduct(ProductModel product)
        {
            try
            {
                _logger.LogInformation($"In ProductService.AddUpdateProduct with param : {product}");
                var dbParam = new DynamicParameters();
                dbParam.Add("@Id", product.ProductId);
                dbParam.Add("@SkuCode", product.SkuCode);
                dbParam.Add("@Name", product.Name);
                dbParam.Add("@Price", product.Price);
                dbParam.Add("@ImageUrl", product.ImageUrl);
                dbParam.Add("@IsActive", product.IsActive);
                dbParam.Add("@CreatedBy", product.CreatedBy);
                dbParam.Add("@UpdatedBy", product.UpdatedBy);
                dbParam.Add("@CreatedOn", product.CreatedOn);
                dbParam.Add("@UpdatedOn", product.UpdatedOn);
                var result = await Task.FromResult(_repository.QueryMultiple<dynamic>(Query.AddUpdateProduct, dbParam, commandType: CommandType.StoredProcedure));
                return result.Read<ProductModel>().SingleOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductService.AddUpdateProduct with exception : {ex}");
                throw;
            }
        }

        public async Task<List<ProductModel>> GetAllProducts()
        {
            try
            {
                _logger.LogInformation($"In ProductService.GetAllProducts");
                var result = await Task.FromResult(_repository.QueryMultiple<dynamic>(Query.GetProductList, null, commandType: CommandType.StoredProcedure));
                return result.Read<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductService.GetAllProducts with exception : {ex}");
                throw;
            }
        }

        public async Task<ProductModel> GetProductById(Guid Id)
        {
            try
            {
                _logger.LogInformation($"In ProductService.GetProductById");
                var dbParam = new DynamicParameters();
                dbParam.Add("@Id", Id);
                var result = await Task.FromResult(_repository.QueryMultiple<dynamic>(Query.GetProductById, dbParam, commandType: CommandType.StoredProcedure));
                return result.Read<ProductModel>().SingleOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductService.GetProductById with exception : {ex}");
                throw;
            }
        }

        public async Task<bool> DeleteProductById(Guid Id)
        {
            try
            {
                _logger.LogInformation($"In ProductService.DeleteProductById");
                var dbParam = new DynamicParameters();
                dbParam.Add("@Id", Id);
                var result = await Task.FromResult(_repository.QueryMultiple<dynamic>(Query.DeleteProduct, dbParam, commandType: CommandType.StoredProcedure));
                return result.Read<bool>().SingleOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductService.DeleteProductById with exception : {ex}");
                throw;
            }
        }
    }
}
