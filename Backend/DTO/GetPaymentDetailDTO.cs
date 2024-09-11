
namespace Backend.DTO
{
    public class GetPaymentDetailDTO
    {
        public string DevoteeId { get; set; } = null!;

        public int Month { get; set; }

        public int Year { get; set; }

        public double Amount { get; set; }
    }
}
