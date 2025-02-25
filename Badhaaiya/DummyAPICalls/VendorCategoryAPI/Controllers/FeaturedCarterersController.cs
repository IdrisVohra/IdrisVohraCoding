using Microsoft.AspNetCore.Mvc;
using VendorCategoryAPI.Models;

namespace VendorCategoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedCarterersController : ControllerBase
    {
        public ActionResult<IEnumerable<FeaturedCarterers>> GetFeaturedCarterers()
        {
            var categories2 = new List<FeaturedCarterers>
        {
            new FeaturedCarterers
                {
                    Id = 1,
                    Name = "DL Lakhani",
                    Description = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor",
                    Location = "Mumbai",
                    Catogery = "Non-Veg"
                },
            new FeaturedCarterers
                {
                    Id = 2,
                    Name = "Food Square",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                    Location = "Pune",
                    Catogery = "Veg"
                }
        };

            return Ok(categories2);
        }
    }
}
