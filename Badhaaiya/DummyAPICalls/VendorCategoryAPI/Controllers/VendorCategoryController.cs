using Microsoft.AspNetCore.Mvc;
using VendorCategoryAPI.Models;
using System.Collections.Generic;

namespace VendorCategoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorCategoryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<VendorCategory>> GetCategories()
        {
            var categories = new List<VendorCategory>
            {
                new VendorCategory { Id = 1, Name = "Venue" },
                new VendorCategory { Id = 2, Name = "Catering" },
                new VendorCategory { Id = 3, Name = "Decoration" },
                new VendorCategory { Id = 4, Name = "Music" },
                new VendorCategory { Id = 5, Name = "Host" },
                new VendorCategory { Id = 6, Name = "Magician" },
                new VendorCategory { Id = 7, Name = "Make-Up Artist" },
                new VendorCategory { Id = 8, Name = "Mehendi Artist" }
            };

            return Ok(categories);
        }
    }

    
}
