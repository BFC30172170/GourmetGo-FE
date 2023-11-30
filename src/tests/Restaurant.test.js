import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationProvider } from 'lib/location';
import Restaurant from 'page/Restaurant';
import { MemoryRouter } from 'react-router-dom';

let windowFetchSpy;

const mockRestaurant = {
  "name": "Ziemann Inc",
  "description": "Eius voluptas atque ea harum. Accusamus perferendis quia. Assumenda inventore occaecati. Quidem aliquam cupiditate soluta dolore explicabo vero quae. Maxime nostrum culpa error ipsum nisi saepe assumenda ea error. Recusandae totam impedit voluptas.",
  "image": "https://loremflickr.com/640/480/transport",
  "latitude": "-58.5714",
  "longitude": "154.7502",
  "category": "orchid",
  "id": "1"
};

const mockProducts = [
  { "name": "circulation", "description": "Repellat quae dolorem exercitationem numquam voluptas accusantium similique architecto. Dolore aliquam blanditiis tempora aut non voluptates saepe. Mollitia incidunt saepe cumque repellat tempore. Ea tempora cupiditate voluptatem quam provident magnam magni. Molestiae fugit excepturi ex nam enim sapiente. Ea facere quam quas distinctio necessitatibus ex a aliquam.", "price": "836.00", "image": "https://loremflickr.com/640/480/food", "id": "1" },
  { "name": "charm", "description": "Necessitatibus nulla rerum repellat at quis fugit totam velit. Veritatis officia est cupiditate. Culpa voluptatibus eveniet sunt ut tenetur reiciendis culpa itaque debitis.", "price": "303.00", "image": "https://loremflickr.com/640/480/transport", "id": "2" },
  { "name": "fencing", "description": "Tempora laudantium dolore provident vero nostrum optio nisi totam alias. Distinctio inventore delectus ipsa iste. Quo nostrum aliquam possimus animi dicta. Cupiditate perspiciatis est.", "price": "766.00", "image": "https://loremflickr.com/640/480/city", "id": "3" },
  { "name": "tram", "description": "Delectus consectetur quaerat. Necessitatibus doloribus possimus magnam illo magni. Debitis voluptatem corrupti molestias corporis quas. Consequatur repellat aspernatur explicabo sed voluptatum perferendis eos.", "price": "589.00", "image": "https://loremflickr.com/640/480/business", "id": "4" },
  { "name": "marionberry", "description": "Quo ullam pariatur dignissimos odit modi sed veritatis illum doloribus. Unde quo explicabo atque explicabo aliquid. Facere nesciunt laudantium nostrum labore suscipit atque.", "price": "367.00", "image": "https://loremflickr.com/640/480/sports", "id": "5" },
  { "name": "heroine", "description": "Ipsa itaque id. At autem vero quos officia sit aperiam minima. Doloribus tempore nihil provident suscipit excepturi ducimus. Nisi quod molestias ab ipsam nobis.", "price": "230.00", "image": "https://loremflickr.com/640/480/nature", "id": "6" },
  { "name": "map", "description": "Quos praesentium magni quisquam est ullam molestiae dicta. Voluptatum praesentium et omnis error labore ad debitis labore. Ratione voluptatibus ex optio ad amet aperiam aut. Quod voluptatem veniam ea saepe dolorem ex esse.", "price": "243.00", "image": "https://loremflickr.com/640/480/food", "id": "7" },
  { "name": "angora", "description": "Dicta eos id quos odit. Sit consequuntur esse quis voluptatibus eveniet quasi illo praesentium voluptate. Enim quibusdam quis corrupti vero id.", "price": "39.00", "image": "https://loremflickr.com/640/480/sports", "id": "8" },
  { "name": "nick", "description": "Repellat deleniti animi esse repudiandae eius enim cumque voluptates aut. Recusandae error incidunt dignissimos excepturi unde. Totam voluptatum assumenda sequi odit a dolore.", "price": "122.00", "image": "https://loremflickr.com/640/480/fashion", "id": "9" },
  { "name": "cadet", "description": "Dicta velit ipsam earum optio. Enim iste nisi quo aperiam. Itaque accusamus consequatur esse distinctio. Esse aperiam sequi sequi nobis qui saepe non. Natus repudiandae est rerum aspernatur voluptatum eum deserunt.", "price": "636.00", "image": "https://loremflickr.com/640/480/technics", "id": "10" }
]

let mockFetch = async (url) => {
  await wait(70);
  if (url.startsWith('https://654a0134e182221f8d524e9c.mockapi.io/Restaurants/')) {
    return {
      ok: true,
      status: 200,
      json: async () => mockRestaurant,
    };
  }
  else if (url.startsWith('https://654a0134e182221f8d524e9c.mockapi.io/products')) {
    return {
      ok: true,
      status: 200,
      json: async () => mockProducts,
    };
  }
}

beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks();
})

const wait = (milliseconds) => {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
};

const setup = () => {
  render(
    <LocationProvider>
      <MemoryRouter>
        <Restaurant />
      </MemoryRouter>
    </LocationProvider>
  );
  return {}
}

test('Renders title', async () => {
  setup();
  await waitFor(() => {
    expect(screen.getByText('Ziemann Inc')).toBeInTheDocument()
  })
});

test('Renders all products', async () => {
  setup();
  const products = await screen.findAllByRole('heading', { level: 3 });
  expect(products).toHaveLength(10);
});

test('Search products', async () => {
  setup();
  const input = await screen.findByPlaceholderText("Search Ziemann Inc's menu")

  fireEvent.change(input, { target: { value: 'charm' } });
  await waitFor(async () => {
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(1);
  })
});





