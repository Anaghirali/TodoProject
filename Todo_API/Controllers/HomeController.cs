using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Todo_API.Data;
using Todo_API.Models;

namespace Todo_API.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        
        [HttpGet]
               public ActionResult Inicio(){
            return new ContentResult{
                ContentType = "text/html",
                Content = "<h1>Api De Teste Funcionando!!!</h1>"
            };
        }

    
    
    }

}