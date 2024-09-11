using AutoMapper;
using Backend.DTO;
using Backend.Model;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Irepository<Devotee> _devoteeRepo;
        private readonly IMapper _mapper;

        public UsersController(Irepository<Devotee> devoteeRepo, IMapper mapper)
        {
            _devoteeRepo = devoteeRepo;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {                                                 
                var data = await _devoteeRepo.GetAllAsync();
                if (data == null)
                {
                    return NotFound();
                }
                var UserDTO = data.Select((d) => _mapper.Map<Devotee, DevoteeDTO>(d));
                return Ok(UserDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                var data = await _devoteeRepo.getByIdAsync(id);
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
        [HttpGet("pagination")]
        [Authorize]
        public async Task<IActionResult> getBypagination(int page,int pagesize)
        {
            try
            {
                var requestedData = await _devoteeRepo.GetRecordByPagination(page, pagesize);
                return Ok(requestedData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DevoteeDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var error = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList(); 
                    return BadRequest(new {error});
                }

                var newData = new Devotee()
                {
                    //DevoteeId = model.InitiationDate.Year + "-" + model.FirstName.Trim().Substring(0, 2) + "-" + model.LastName.Trim().Substring(0, 2) + "-" + model.InitiationDate.Month,
                    DevoteeId = model.DevoteeId,
                    FirstName = model.FirstName.Trim(),
                    MiddleName = model.MiddleName.Trim(),
                    LastName = model.LastName.Trim(),
                    FlatNumber = model.FlatNumber,
                    Area = model.Area,
                    State = model.State,
                    City = model.City,
                   
                    Pincode = model.Pincode,
                    InitiationDate = model.InitiationDate,
                    Emailid = model.Emailid,
                    Modificationtime = DateTime.Now,
                };
       
                    newData.Photo = "model.png";
                //if(model.Photo == "" || model.Photo == "string" || model.Photo == null)
                //{
                //}
                //else
                //{
                //    newData.Photo = model.DevoteeId + ".png";
                //}
                await _devoteeRepo.AddAsync(newData);
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

        // PUT api/<ValuesController>/5

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]

        public async Task<IActionResult> Put(string id, [FromBody] DevoteeDTO model)
        {
            var user = await _devoteeRepo.getByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not Found");
            }

            try
            {

                if (!ModelState.IsValid)
                {
                    var error = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return BadRequest(new { error });
                }

                user.FirstName = model.FirstName.Trim();
                user.MiddleName = model.MiddleName.Trim();
                user.LastName = model.LastName.Trim();
                user.FlatNumber = model.FlatNumber;
                user.Area = model.Area;
                user.State = model.State;
                user.City = model.City;
                user.Pincode = model.Pincode;
                user.Emailid = model.Emailid;
                user.InitiationDate = user.InitiationDate;
                user.Modificationtime = DateTime.Now;

                await _devoteeRepo.UpdateAsync(user);
                return new StatusCodeResult(StatusCodes.Status205ResetContent);
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var userdata = await _devoteeRepo.getByIdAsync(id);
                if (userdata == null)
                {
                    return NotFound("User not Found!");
                }
                await _devoteeRepo.DeleteAsync(userdata);
                return Ok($"User({id}) Deleted Successfully");
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Unathoroized Access , Please Login!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);

            }
        }
    }
}
