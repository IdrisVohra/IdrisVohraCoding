using Microsoft.AspNetCore.Mvc;
using VendorCategoryAPI.Models;

namespace VendorCategoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorCardsController : ControllerBase
    {
        public ActionResult<IEnumerable<VendorCards>> GetCards()
        {
            var categories1 = new List<VendorCards>
            {
                new VendorCards { Id = 1, Name = "Radisson Blu Hotel" , Location="Mumbai" }
            };

            return Ok(categories1);
        }
    }
}
