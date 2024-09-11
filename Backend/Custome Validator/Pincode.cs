using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Custome_Validator
{
    public class Pincode : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            string pincode = value!.ToString()!;

            if (Regex.IsMatch(pincode, @"^\d{6}$"))
            {
                return ValidationResult.Success!;
            }
            else
            {
                return new ValidationResult("The Pincode must be a 6-digit number.");
            }
        }

    }
}
