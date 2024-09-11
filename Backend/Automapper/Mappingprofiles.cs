using AutoMapper;
using Backend.DTO;
using Backend.Model;

namespace Backend.Automapper
{
    public class Mappingprofiles : Profile
    {
        public Mappingprofiles()
        {

            CreateMap<Login, LoginDTO>();
            CreateMap<Devotee, DevoteeDTO>();
        }
    }
}
