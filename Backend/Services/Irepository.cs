namespace Backend.Services
{
    public interface Irepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> getByIdAsync(string id);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);

        Task<IEnumerable<T>> GetRecordByPagination(int page,int pageSize);
    }
}
