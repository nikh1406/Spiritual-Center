namespace Backend.Services
{
    public interface IS3Service
    {
        public Task<string> UploadFileAsync(Stream fileStream, string fileName);
    }
}
