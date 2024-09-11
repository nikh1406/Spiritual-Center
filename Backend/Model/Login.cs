using System;
using System.Collections.Generic;

namespace Backend.Model
{
    public partial class Login
    {
        public string Id { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Otp { get; set; } = null!;
        public string Usertype { get; set; } = null!;
    }
}
