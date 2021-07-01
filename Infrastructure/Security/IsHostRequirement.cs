using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;

        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
           var userId=context.User.FindFirstValue(ClaimTypes.NameIdentifier);
           if(userId==null) return Task.CompletedTask;

           var activityId=Guid.Parse(_httpContextAccessor.HttpContext?.
           Request.RouteValues.FirstOrDefault(x=> x.Key == "id").Value?.ToString());

        //    var atendee=_dbContext.ActivityAtendees.FindAsync(userId,activityId).Result;//attendee is stored in memory causing problem when editing activity
             var atendee=_dbContext.ActivityAtendees
             .AsNoTracking()
             .SingleOrDefaultAsync(x=> x.AppUserId==userId && x.ActivityId==activityId)
             .Result;
             
             if(atendee==null) return Task.CompletedTask;

             if(atendee.IsHost) context.Succeed(requirement);

             return Task.CompletedTask;


        }
    }
}