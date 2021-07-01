using System.Linq;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Activity,ActivityDto>().
            ForMember(x=> x.HostUsername, 
            y=> y.MapFrom(z=> z.Attendees.FirstOrDefault(x=>x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee,Profiles.Profile>()
            .ForMember(x=> x.DisplayName,y=>y.MapFrom(z=>z.AppUser.DisplayName))
            .ForMember(x=>x.Username,y=>y.MapFrom(z=>z.AppUser.UserName))
            .ForMember(x=>x.Bio,y=>y.MapFrom(z=>z.AppUser.Bio));
        }

    }
}