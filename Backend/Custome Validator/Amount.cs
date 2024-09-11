using System.ComponentModel.DataAnnotations;

namespace Backend.Custome_Validator
{
    public class Amount: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
           if(value is double datavalue)
           {
                if(datavalue < 100)
                {
                    return new ValidationResult(ErrorMessage ?? "Amount should be greter then 100");
                }
                else
                {
                    return ValidationResult.Success;
                }
           }
            
           return new ValidationResult(ErrorMessage ?? "Amount datatype is Invalid!");
        }
    }
}
