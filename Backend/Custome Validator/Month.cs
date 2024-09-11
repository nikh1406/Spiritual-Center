using System.ComponentModel.DataAnnotations;

namespace Backend.Custome_Validator
{
    public class Month: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value is int datavalue)
            {
                int m = datavalue;
                if(m < 1 ||  m > 12)
                {
                    return new ValidationResult(ErrorMessage ?? "Month value must be between 1 to 12");
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult(ErrorMessage ?? "Month datatype is invalid!");
        }
    }
}
