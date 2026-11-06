# Contract: Store Domain

`domain/store/README.md` MUST define the behavior below in technology-neutral terms. Implementations
choose how to model and transport it.

## Entities

| Entity | Fields | Rules |
|--------|--------|-------|
| Product | id, name, price, image | `id` is unique; `price` is not negative |
| Cart Item | product, quantity | `quantity` is at least 1; one item per product |
| Cart | items, total items, total price | Totals are derived from the items, not stored |
| Checkout Details | name, email, address, city, ZIP code | All fields are required |

Prices use one currency, displayed in US dollars. Taxes, shipping, stock, and payment are out of
scope.

## User flows

1. **Browse the catalog**: see every product with its image, name, and price.
2. **Add to cart**: adding a new product creates an item with quantity 1; adding a product already
   in the cart increases its quantity by 1.
3. **Review the cart**: see the items, total items, and total price.
4. **Remove from cart**: removing a product removes its whole item, regardless of quantity.
5. **Check out**: with a non-empty cart, submit the details and see a confirmation with the totals;
   the cart is then empty. With an empty cart, checkout shows an empty state and accepts no order.

There is no back end: placing an order only confirms it to the user and clears the cart.

## Logical events

These define what the parts of the store need to communicate, not how. An implementation MAY use
events, shared state, or another mechanism, and its README MUST say which.

| Event | Payload | Result |
|-------|---------|--------|
| `cart.item-added` | Product | Cart updated as in flow 2 |
| `cart.item-removed` | Product ID | Cart updated as in flow 4 |
| `cart.cleared` | None | Cart is empty |
| `checkout.order-placed` | Details, items, totals | Confirmation shown; cart is empty |

## Coverage

- An area is `full` when all of its flows behave as defined.
- An area is `partial` when some do; the example's README MUST list the differences.
- An area is `none` when the example does not implement it.

The areas are **catalog** (flow 1), **cart** (flows 2, 3, and 4), and **checkout** (flow 5).
