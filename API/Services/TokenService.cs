using System.Collections.Generic;
using Domain;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;


using System.Text;
using Microsoft.Extensions.Configuration;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config=config;
        }
        public string CreateToken(AppUser user)
        {
            var claims=new List<Claim> //creating claims
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Email,user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])); //creating random securitykey
            var credential=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);//choosig algorithm for encryption

            var tokendescriptor =new SecurityTokenDescriptor //configuring the token
            {
                Subject=new ClaimsIdentity(claims),
                Expires=System.DateTime.Now.AddDays(7),
                SigningCredentials=credential
            };

           var tokenHandler=new JwtSecurityTokenHandler();
           var token=tokenHandler.CreateToken(tokendescriptor);//creating the token
           return tokenHandler.WriteToken(token);
        }
    }
}