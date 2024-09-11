using Amazon.S3.Transfer;
using Amazon.S3;
using System.Drawing;
using Amazon;
using Amazon.S3.Model;

namespace Backend.Services
{
    public class S3Service : IS3Service
    {

        private readonly string _bucketName;
        private readonly string _Region;
        private readonly string _accessKey;
        private readonly string _secretKey;

        public S3Service(IConfiguration configuration)
        {
            _bucketName = configuration["AWS:BucketName"];
            _Region = configuration["AWS:Region"];
            _accessKey = configuration["AWS:AccessKey"];
            _secretKey = configuration["AWS:SecretKey"];
          
        }
        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            if(fileStream == null || fileStream.Length == 0)
            {
                throw new ArgumentNullException("File stream cannot be null or empty",nameof(fileStream));
            }

            var _s3Client = new AmazonS3Client(_accessKey, _secretKey, RegionEndpoint.GetBySystemName(_Region));

            var putRequest = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                InputStream = fileStream,
                //ContentType = "image/png"
            };

            var response = await _s3Client.PutObjectAsync(putRequest);
            return $"https://{_bucketName}.s3.{_Region}.amazonaws.com/{fileName}";

        }

        
    }
}
