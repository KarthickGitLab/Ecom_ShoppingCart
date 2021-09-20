using Ecom.Core.Domain.Interface;
using Ecom.Core.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Ecom.Core.ngApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IProductService productService, ILogger<ProductController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        [HttpGet("GetProductList")]
        public async Task<IActionResult> GetProductList()
        {
            try
            {
                _logger.LogInformation($"In ProductController.GetAllProducts");
                var result = await _productService.GetAllProducts();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductController.GetAllProducts with exception : {ex}");
            }
            return BadRequest();
        }

        [HttpPost("AddUpdateProduct")]
        public async Task<IActionResult> AddUpdateProduct([FromBody]ProductModel product)
        {
            try
            {
                _logger.LogInformation($"In ProductController.AddUpdateProduct");
                var result = await _productService.AddUpdateProduct(product);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductController.AddUpdateProduct with exception : {ex}");
            }
            return BadRequest();
        }

        [HttpGet("GetProductById")]
        public async Task<IActionResult> GetProductById(Guid Id)
        {
            try
            {
                _logger.LogInformation($"In ProductController.GetProductById");
                var result = await _productService.GetProductById(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductController.GetProductById with exception : {ex}");
            }
            return BadRequest();
        }

        [HttpDelete("DeleteProductById")]
        public async Task<IActionResult> DeleteProductById(Guid Id)
        {
            try
            {
                _logger.LogInformation($"In ProductController.DeleteProductById");
                var result = await _productService.DeleteProductById(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"In ProductController.DeleteProductById with exception : {ex}");
            }
            return BadRequest();
        }
    }
}
