using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{ 
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
      public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
                                TokenService tokenService)
      {
          _signInManager=signInManager;
          _userManager=userManager;
          _tokenService=tokenService;
      }  
    [HttpPost("login")]
    public async  Task<ActionResult<UserDto>> Login(LoginDto loginDetails)
    {
        var user= await _userManager.FindByEmailAsync(loginDetails.Email);
        if(user==null)return Unauthorized(); 

        var result= await _signInManager.CheckPasswordSignInAsync(user,loginDetails.Password,false); 
        if(result.Succeeded)
        {
            return CreateUserObject(user);
        }
        return Unauthorized();
    }
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto resgisterDto)
    {
        if(await _userManager.Users.AnyAsync(x=> x.Email == resgisterDto.Email))
        {
            return BadRequest("Email is already in use.");
        }
        if(await _userManager.Users.AnyAsync(x=> x.UserName == resgisterDto.Username))
        {
            return BadRequest("Username is already in use.");
        }
        var user= new AppUser
        {
            UserName=resgisterDto.Username,
            Email=resgisterDto.Email,
            DisplayName=resgisterDto.DisplayName
        };
        var result= await _userManager.CreateAsync(user);
        if(result.Succeeded)
        {
            return CreateUserObject(user);
        }
        return BadRequest("Problem in registering the user");
    }

    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user =await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        return CreateUserObject(user);
    }

    private UserDto CreateUserObject(AppUser user)
    {
      return new UserDto
            {
                DisplayName=user.DisplayName,
                Token=_tokenService.CreateToken(user),
                Image=null,
                Username=user.UserName
            };  
    }
}
}