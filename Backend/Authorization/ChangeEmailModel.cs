using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class ChangeEmailModel
    {
        //[Required]
        [EmailAddress]
        public string? CurrentEmail { get; set; }

        //[Required]
        [EmailAddress]
        public string? NewEmail { get; set; }
    }
}
