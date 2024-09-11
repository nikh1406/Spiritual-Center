using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public partial class Devotee
    {
        public Devotee()
        {
            Payments = new HashSet<Payment>();
        }

        
        public string DevoteeId { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string MiddleName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Photo { get; set; }

        public int FlatNumber { get; set; }

        public string Area { get; set; } = null!;

        public string State { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Pincode { get; set; } = null!;

        public string Emailid { get; set; } = null!;

        public DateTime InitiationDate { get; set; }
        public DateTime? Creationtime { get; set; }
        public DateTime Modificationtime { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
