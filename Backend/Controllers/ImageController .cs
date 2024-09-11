using Backend.Custome_Validator;
using Backend.Model;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly SpiritualCentreContext _spiritualCentreContext;
        private readonly IS3Service _is3Service;
        private readonly Irepository<Devotee> _devoteeRepo;

        public ImageController(SpiritualCentreContext spiritualCentreContext, IS3Service is3Service, Irepository<Devotee> devoteeRepo)
        {
            _spiritualCentreContext = spiritualCentreContext;
            _is3Service = is3Service;
            _devoteeRepo = devoteeRepo;
        }

        //[Authorize]
        [HttpPost("{id}")]
        public async Task<IActionResult> Upload(string id,IFormFile file)
        {
            try
            {
                string[] permittedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".jfif" };
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

                if (string.IsNullOrEmpty(extension) || Array.IndexOf(permittedExtensions, extension) < 0)
                {
                    return BadRequest("Only image files (.jpg, .jpeg, .png, .gif, .bmp,.jfif) are allowed.");
                }

                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                using (var stream = file.OpenReadStream())
                {
                    var User = _spiritualCentreContext.Devotees.FirstOrDefault((d)=> d.DevoteeId == id);
                    if(User == null)
                    {
                        return BadRequest("Image not Inserted!");
                    }
                    else
                    {

                        //var imgType = file.FileName.Split('.')[1];
                        var fileName = $"{User.DevoteeId}.png";

                        var url = await _is3Service.UploadFileAsync(stream, fileName);

                        //var image = new Image { Url = url };
                        //var imgType = fileName.Split('.')[1];
                        User.Photo = fileName;
                        User.Modificationtime = DateTime.Now;
                        await _spiritualCentreContext.SaveChangesAsync();

                        return Ok(new { message="Photo Upload Successfully!" ,filename=User.Photo});
                    }
                }
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.InnerException!.Message);
            }
        }
    }
}
