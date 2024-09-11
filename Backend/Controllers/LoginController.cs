using AutoMapper;
using Backend.DTO;
using Backend.Model;
using Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly Irepository<Login> _loginRepo;
        private readonly Irepository<Devotee> _devoteeRepo;
        private readonly IConfiguration _configuration;
        private readonly IMapper mapper;

        public LoginController(Irepository<Login> loginRepo, Irepository<Devotee> devoteeRepo, IConfiguration configuration, IMapper mapper)
        {

            _loginRepo = loginRepo;
            _devoteeRepo = devoteeRepo;
            _configuration = configuration;
            this.mapper = mapper;
        }



        // POST api/<ValuesController>
        [HttpPost]

        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            try
            {

                var userdata = await _devoteeRepo.getByIdAsync(model.Id);
                if (userdata != null || (model.Id == "admin" && model.Role == "Admin"))
                {
                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Role,model.Role!)
                    };
                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(2),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );

                    return Ok(new
                    {
                        id = model.Id,
                        name=userdata?.FirstName,
                        role=model.Role,
                        img = userdata?.Photo,
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                    });
                }
                else
                {
                    return NotFound("User Not Found!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }

        }

       

    }
}
