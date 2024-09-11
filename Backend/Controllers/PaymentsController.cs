using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Model;
using Backend.Services;
using Backend.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly Irepository<Payment> _paymentRepo;
        private readonly SpiritualCentreContext _spiritualCentreContext;

        public PaymentsController(Irepository<Payment> paymentRepo, SpiritualCentreContext spiritualCentreContext)
        {
            _paymentRepo = paymentRepo;
            _spiritualCentreContext = spiritualCentreContext;
        }

        // GET: api/Payments
        [HttpGet]
    
        public async Task<IActionResult> GetPayments()
        {
            try
            {

                var data = await _paymentRepo.GetAllAsync();


                var groupedPayments = data
               .GroupBy(p => new { p.DevoteeId, p.Month, p.Year })
               .Select(g => new PaymentDTO
               {
                   PaymentId = g.First().PaymentId,
                   DevoteeId = g.Key.DevoteeId,
                   Month = g.Key.Month,
                   Year = g.Key.Year,
                   Amount = g.Sum(p => p.Amount),
                   PaymentMethod = g.First().PaymentMethod,
               })
               .ToList();

                // Check if data is null or empty (optional)
                if (data == null || !data.Any())
                {
                    return NotFound();
                }

                return Ok(groupedPayments);

                //var data = await _spiritualCentreContext.getPaymentDetailDTO.FromSqlRaw("Exec getpaymentDetail").ToListAsync();
                //// Check if data is null or empty (optional)
                //if (data == null)
                //{
                //    return NotFound("Data Not Found!");
                //}
                //return Ok(data);

            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.InnerException!.Message);
            }
        }

        
        [HttpGet("Unpaid Detail")]
        public async Task<IActionResult> GetUnpaidDetail()
        {
            try
            {
                //var unpaid = await _spiritualCentreContext.Payments.FromSqlRaw("Exec [dbo].[getUnpaidUser]").ToListAsync();
                //var data = await _paymentRepo.GetAllAsync();

                //List<DevoteeDTO> unpaidDetail = new List<DevoteeDTO>();
                //var unpaidUserId = data.Where((d) => d.Month != DateTime.Now.Month - 2).Select((d) => d.DevoteeId).ToList();
                //foreach (var item in unpaidUserId)
                //{

                //    var d = await _spiritualCentreContext.Devotees.Where((d) => d.DevoteeId == item).Select((d) => new DevoteeDTO
                //    {
                //        DevoteeId = d.DevoteeId,
                //        FirstName = d.FirstName,
                //        LastName = d.LastName,
                //        MiddleName = d.MiddleName,
                //        Emailid = d.Emailid,

                //    }).ToListAsync();
                //    if (d != null)
                //    {
                //        unpaidDetail.Add(data);

                //    }
                //}
                //return Ok(unpaidUserId[0]);
                var data = await _paymentRepo.GetAllAsync();


                var groupedPayments = data
               .GroupBy(p => new { p.DevoteeId, p.Month, p.Year })
               .Select(g => new PaymentDTO
               {
                   PaymentId = g.First().PaymentId,
                   DevoteeId = g.Key.DevoteeId,
                   Month = g.Key.Month,
                   Year = g.Key.Year,
                   Amount = g.Sum(p => p.Amount),
                   PaymentMethod = g.First().PaymentMethod,
               })
               .ToList();

                // Check if data is null or empty (optional)
                if (data == null || !data.Any())
                {
                    return NotFound();
                }

                return Ok(groupedPayments);

                //var data = await _spiritualCentreContext.getUnpaidDetailDTO.FromSqlRaw("Exec getUnpaidUser").ToListAsync();
                //if (data == null)
                //{
                //    return NotFound("Records Not Found!");
                //}
                //return Ok(data);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.InnerException!.Message);
            }
        }

        //GET: api/Payments/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult> GetPayment(string id)
        {
            try
            {

                //var AllPayment = await _spiritualCentreContext.getPaymentDetailDTO.FromSqlRaw("Exec getpaymentDetail").ToListAsync();
                //var data = AllPayment.FindAll((d)=> d.DevoteeId == id!).ToList();
                var AllPayment = await _paymentRepo.GetAllAsync();
                var data = AllPayment.Where((d) => d.DevoteeId == id!).ToList();


                if (data == null)
                {
                    return NotFound();
                }


                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.InnerException!.Message);
            }
        }




        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PaymentDTO model)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    var error = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return BadRequest(new { error });
                }

                var newData = new Payment()
                {
                    DevoteeId = model.DevoteeId,
                    Month = model.Month,
                    Year = model.Year,
                    Amount = model.Amount,
                    PaymentMethod = "Online",
                    Modificationtime = DateTime.Now
                };
                await _paymentRepo.AddAsync(newData);
                return Created("", newData);

            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }





    }
}
