using Ecom.Core.Data.Repository;
using Ecom.Core.Domain.Interface;
using Ecom.Core.Domain.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Ecom.Core.Helper.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddTransient<IGenericRepository, GenericRepository>();
            services.AddTransient<IProductService, ProductService>();
            return services;
        }
    }
}
