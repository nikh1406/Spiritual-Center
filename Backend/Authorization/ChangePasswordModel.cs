using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class ChangePasswordModel
    {

        [Required]
        public string? CurrentPassword { get; set; }

        [Required]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$", ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
        public string? NewPassword { get; set; }

    }
}
