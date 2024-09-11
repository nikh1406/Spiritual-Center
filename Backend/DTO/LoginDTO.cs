using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class LoginDTO
    {
        [Required]
        public string Id { get; set; } = null!;

       

        [Required]
        public string? Role { get; set; }

    }
}
