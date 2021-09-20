using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Ecom.Core.ngApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class SettingsController : ControllerBase
    {
        readonly IConfiguration _config;
        private readonly ILogger<SettingsController> _logger;
        public SettingsController(IConfiguration config, ILogger<SettingsController> logger)
        {
            _config = config;
            _logger = logger;
        }
        // GET: api/<SettingsController>
        [HttpGet]
        [Route("generalsettings")]
        public IActionResult GetGeneralSettings()
        {
            try
            {
                _logger.LogInformation($"In SettingsController.GetGeneralSettings Action Method");
                var gs = new GeneralSettings();
                _config.GetSection("GeneralSettings").Bind(gs);
                return new JsonResult(gs);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception In SettingsController.GetGeneralSettings Action Method:{ex}");
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("usersettings")]
        [Authorize]
        public IActionResult GetUserSettings(string oktaId)
        {
            _logger.LogInformation($"In SettingsController.GetUserSettings Action Method-{oktaId}");
            try
            {
                var principal = HttpContext.User.Identity as ClaimsIdentity;
                var login = principal?.Claims.Select(c => new { ClaimType = c.Type, ClaimName = c.Value }).ToList();
                _logger.LogInformation($"@@@@{JsonConvert.SerializeObject(login)}@@@@");

                var us = new UserSettings();
                _config.GetSection("UserSettings").Bind(us);
                return new JsonResult(us);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception In SettingsController.GetUserSettings Action Method-{ex}");
                throw;
            }
        }
    }

    class GeneralSettings
    {
        public string OktaClientId { get; set; }
        public string OktaScope { get; set; }
        public string OktaAuthUrl { get; set; }
        public string OktaToken { get; set; }
        public string ImageSize { get; set; }
        public string SessionTime { get; set; }
        public string WarningTime { get; set; }
    }

    class UserSettings
    {
        public string AccessToken { get; set; }
        public string OktaId { get; set; }
        //public string MerchantId { get; set; }
        //public string PartnerId { get; set; }
    }
}
