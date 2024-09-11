using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class forgotPasswordModel
    {

        [Required (ErrorMessage = "Password is Required")]
        public string? NewPassword { get; set; }
    }
}
