using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult( await mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result= await mediator.Send(new Details.Query{Id=id});
            return HandleResult<Activity>(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await mediator.Send(new Create.Command{Activity=activity}));
        
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.Id=id;
            return HandleResult(await mediator.Send(new Edit.Command{Activity=activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await mediator.Send(new Delete.Command{Id=id}));
        }
         
       
    }
}