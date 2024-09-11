using Backend.Custome_Validator;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTO
{
    public class PaymentDTO
    {
        [Required(ErrorMessage = "PaymentId is Required!")]
        public int PaymentId { get; set; }

        [Required(ErrorMessage = "DevoteeId is Required!")]
        public string DevoteeId { get; set; } = null!;

        [Required(ErrorMessage = "Month is Required!")]
        [Month]
        public int Month { get; set; }

        [Required(ErrorMessage = "Year is Required!")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Amount is Required!")]
        [Amount]
        public double Amount { get; set; }

        //[Required(ErrorMessage = "PaymentMethod is Required!")]
        public string PaymentMethod { get; set; } = null!;
    }
}
