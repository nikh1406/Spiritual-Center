using Backend.Custome_Validator;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{

    public class DevoteeDTO
    {
        [Required(ErrorMessage = "DevoteeId is Required!")]
        public string DevoteeId { get; set; } = null!;


        [Required(ErrorMessage = "FirstName is Required!")]
        [MinLength(3, ErrorMessage = "FirstName must be at lease 3 characters long")]
        [MaxLength(15, ErrorMessage = "First Name maximum 15 char allowed")]
        public string FirstName { get; set; } = null!;


        [Required(ErrorMessage = "MiddleName is Required!")]
        [MinLength(3, ErrorMessage = "MiddleName must be at lease 3 characters long")]
        [MaxLength(15, ErrorMessage = "MiddleName maximum 15 char allowed")]
        public string MiddleName { get; set; } = null!;

        [Required(ErrorMessage = "LastName is Required!")]
        [MinLength(3, ErrorMessage = "LastName must be at lease 3 characters long")]
        [MaxLength(15, ErrorMessage = "LastName maximum 15 char allowed")]
        public string LastName { get; set; } = null!;


        public string? Photo { get; set; }


        [Required(ErrorMessage = "FlatNumber is Required!")]
        public int FlatNumber { get; set; }

        [Required(ErrorMessage = "Area is Required!")]
        public string Area { get; set; } = null!;

        [Required(ErrorMessage = "State is Required!")]
        public string State { get; set; } = null!;

        [Required(ErrorMessage = "City is Required!")]
        public string City { get; set; } = null!;

        [Required(ErrorMessage = "Pincode is Required!")]
        [Pincode]
        public string Pincode { get; set; } = null!;

        [Required(ErrorMessage = "EmailID is Required!")]
        [EmailAddress(ErrorMessage = "Invalid Email Formate")]
        public string Emailid { get; set; } = null!;

        [Required(ErrorMessage = "InitiationDate is Required!")]
        [InitiationDate(ErrorMessage = "Initiation Date should be not be less than of last 2 month")]
        public DateTime InitiationDate { get; set; }
    }
}
