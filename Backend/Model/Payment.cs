using System;
using System.Collections.Generic;

namespace Backend.Model
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public string DevoteeId { get; set; } = null!;
        public int Month { get; set; }
        public int Year { get; set; }
        public double Amount { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public DateTime? Creationtime { get; set; }
        public DateTime Modificationtime { get; set; }

        public virtual Devotee Devotee { get; set; } = null!;
    }
}
