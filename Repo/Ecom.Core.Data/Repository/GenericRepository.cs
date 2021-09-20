using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace Ecom.Core.Data.Repository
{
    public class GenericRepository : IGenericRepository
    {
        private readonly IDbConnection _db;
        private readonly IConfiguration _config;
        private readonly ILogger<GenericRepository> _logger;

        public GenericRepository(IConfiguration config, ILogger<GenericRepository> logger)
        {
            _db = new SqlConnection(config.GetConnectionString("CoreEcom"));
            _config = config;
            _logger = logger;
        }

        public GridReader QueryMultiple<T>(string storedProcedureName, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            _logger.LogInformation($"In QueryMultiple {nameof(T)}-{storedProcedureName}-{commandType}");
            var result = _db.QueryMultiple(storedProcedureName, parameters, commandType: commandType, commandTimeout : 0);
            return result;
        }

        public async Task<GridReader> QueryMultipleAsync<T>(string storedProcedureName, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure)
        {
            _logger.LogInformation($"In QueryMultipleAsync {nameof(T)}-{storedProcedureName}-{commandType}");
            return await _db.QueryMultipleAsync(storedProcedureName, parameters, commandType: commandType, commandTimeout: 0);
        }
    }
}
