
using Backend.DBContext;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class Repository<T> : Irepository<T> where T : class
    {
        private readonly DbSet<T> _dbset;
        private readonly SpiritualCentreContext _spiritualCentreContext;

        public Repository(SpiritualCentreContext spiritualCentreContext)
        {
            _dbset = spiritualCentreContext.Set<T>();
            _spiritualCentreContext = spiritualCentreContext;
        }
        public async Task<T> AddAsync(T entity)
        {
            await _dbset.AddAsync(entity);
            await _spiritualCentreContext.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _dbset.Remove(entity);
            await _spiritualCentreContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbset.ToListAsync();
        }

        public async Task<T> getByIdAsync(string id)
        {
            return await _dbset.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetRecordByPagination(int page, int pageSize)
        {
            IQueryable<T> query = _dbset;
            var data = query.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return data.ToList();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbset.Attach(entity);
            _spiritualCentreContext.Entry(entity).State = EntityState.Modified;
            await _spiritualCentreContext.SaveChangesAsync();
        }
    }
}
