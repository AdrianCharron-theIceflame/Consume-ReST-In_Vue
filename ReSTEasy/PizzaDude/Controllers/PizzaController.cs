using Microsoft.AspNetCore.Mvc;
using PizzaDude.Models;
using PizzaDude.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PizzaDude.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase {

        // GET: api/<PizzaController>
        [HttpGet]
        public IEnumerable<Pizza> Get() {
            return PizzaService.GetPizzas();
        }

        // GET api/<PizzaController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var pizza = PizzaService.GetPizza(id);
            return pizza == null
                ? NotFound("Pizza not found")
                : Ok(pizza);
        }

        // POST api/<PizzaController>
        [HttpPost]
        public IActionResult Create([FromBody] Pizza pizza) {
            PizzaService.Add(pizza);
            return CreatedAtAction(nameof(Create), new { id = pizza.Id }, pizza);
        }

        // PUT api/<PizzaController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Pizza pizza) {
            if (id != pizza.Id)
                return BadRequest("Pizza identifier incorrect");
            var oldPizza = PizzaService.GetPizza(id);
            if (oldPizza == null)
                return NotFound("Pizza does not exist");

            PizzaService.Update(pizza);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var oldPizza = PizzaService.GetPizza(id);
            if (oldPizza == null)
                return NotFound("Pizza does not exist");

            PizzaService.Delete(id);
            return NoContent();
        }
    }
}
