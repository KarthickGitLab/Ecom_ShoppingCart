using Dapper;
using System.Data;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace Ecom.Core.Data.Repository
{
    public interface IGenericRepository
    {
        GridReader QueryMultiple<T>(string storedProcedureName, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
        Task<GridReader> QueryMultipleAsync<T>(string storedProcedureName, DynamicParameters parameters, CommandType commandType = CommandType.StoredProcedure);
    }
}
