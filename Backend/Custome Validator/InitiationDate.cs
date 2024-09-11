using System.ComponentModel.DataAnnotations;

namespace Backend.Custome_Validator
{
    public class InitiationDate: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime datavalue )
            {
                DateTime currentDate = DateTime.Now;
                DateTime twoMonthAngo = currentDate.AddMonths(-3);
                if(datavalue >= twoMonthAngo )
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage ?? "Initiation Date should be not be less than of last 2 month");
                }
            }
            return new ValidationResult(ErrorMessage ?? "Initiation Date format is invalid!"); ;
        }
    }
}