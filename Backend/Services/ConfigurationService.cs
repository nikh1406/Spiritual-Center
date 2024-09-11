using Backend.Authorization;
using Backend.Automapper;
using Backend.DBContext;
using Backend.DTO;
using Backend.Model;
using ChatBot.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Services
{
    public static class ConfigurationService
    {
        public static void ConfigService(this IServiceCollection Services, IConfiguration config)
        {
            

            Services.AddDbContext<SpiritualCentreContext>(o => o.UseSqlServer(config.GetConnectionString("dbData")));
            Services.AddDbContext<ApplicationDbContext>(o => o.UseSqlServer(config.GetConnectionString("dbData")));
            Services.AddScoped(typeof(Irepository<>), typeof(Repository<>));
            Services.AddAutoMapper(typeof(Mappingprofiles));
            Services.AddScoped<IS3Service, S3Service>();

            Services.AddSignalR();
            Services.AddSingleton<IDictionary<string, userConnection>>(opt => new Dictionary<string, userConnection>());
            Services.AddSingleton<IDictionary<string, List<ChatMessage>>>(opt => new Dictionary<string, List<ChatMessage>>());




            // For Entity Framework

            // For Identity
            Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Adding Authentication
            Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = config["JWT:ValidAudience"],
                    ValidIssuer = config["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]))
                };
            });
        }
    }
}
