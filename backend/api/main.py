from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database_utils import (
    get_products,
    add_product,
    place_order,
    get_orders,
    get_order,
)
from models.db_models import (
    ProductResponse,
    CreateProductResponse,
    CreateProduct,
    CreateOrderWithItems,
    CreateOrderWithItemsResponse,
    GetOrdersResponse,
    GetOrderAndProductsResponse,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "interview api is running"}


@app.get("/get-products")
def api_get_products() -> ProductResponse:
    return get_products()


@app.post("/add-product")
def api_add_product(product: CreateProduct) -> CreateProductResponse:
    return add_product(product)


@app.get("/get-orders")
def api_get_orders(user_id: str) -> GetOrdersResponse:
    return get_orders(user_id)


@app.post("/place-order")
def api_place_order(
    order_with_items: CreateOrderWithItems,
) -> CreateOrderWithItemsResponse:
    return place_order(order_with_items)


@app.get("/get-order")
def api_get_order(order_id: int) -> GetOrderAndProductsResponse:
    return get_order(order_id)
