using Newtonsoft.Json;
using System;

namespace Ecom.Core.Domain.Models
{
    public class ProductModel
    {
        [JsonProperty(PropertyName = "ProductId")]
        public Guid ProductId { get; set; }
        [JsonProperty(PropertyName = "SkuCode")]
        public string SkuCode { get; set; }
        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "Price")]
        public decimal Price { get; set; }
        [JsonProperty(PropertyName = "ImageUrl")]
        public string ImageUrl { get; set; }
        [JsonProperty(PropertyName = "IsActive")]
        public bool IsActive { get; set; }
        [JsonProperty(PropertyName = "CreatedBy")]
        public string CreatedBy { get; set; }
        [JsonProperty(PropertyName = "UpdatedBy")]
        public string UpdatedBy { get; set; }
        [JsonProperty(PropertyName = "CreatedOn")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty(PropertyName = "UpdatedOn")]
        public DateTime UpdatedOn { get; set; }
    }
}
