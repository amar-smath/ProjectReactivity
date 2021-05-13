using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<Activity,Activity>();
        }

    }
}