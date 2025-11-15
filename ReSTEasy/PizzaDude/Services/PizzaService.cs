using PizzaDude.Models;

namespace PizzaDude.Services {
    public static class PizzaService {
        static List<Pizza> Pizzas { get; }
        static int nextId = 3;
        static PizzaService() {
            Pizzas = new List<Pizza> {
                new Pizza {
                    Id = 1,
                    Name = "Classic Italian",
                    IsGlutenFree = false,
                },
                new Pizza {
                    Id = 2,
                    Name = "Veggie",
                    IsGlutenFree = true,
                }
            };
        }

        public static List<Pizza> GetPizzas() => Pizzas;
        public static Pizza? GetPizza(int id) => Pizzas.FirstOrDefault(x => x.Id == id);
        public static void Add(Pizza pizza) {
            pizza.Id = nextId++;
            Pizzas.Add(pizza);
        }

        public static void Update(Pizza pizza) {
            var index = Pizzas.FindIndex(p => p.Id == pizza.Id);
            if (index == -1)
                return;
            Pizzas[index] = pizza;
        }

        public static void Delete(int pizza) {
            var index = Pizzas.FindIndex(x => x.Id == pizza);
            if (index != -1)
                Pizzas.RemoveAt(index);
        }
    }
}
