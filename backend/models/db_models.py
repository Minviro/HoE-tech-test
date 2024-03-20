from typing import List, Literal
from random import randint
from datetime import datetime
from pydantic import BaseModel


class Response(BaseModel):
    status: int


class Product(BaseModel):
    product_id: int
    name: str
    description: str
    price: float
    stock_quantity: int
    created_at: datetime


class ProductResponse(Response):
    data: List[Product]


class CreateProduct(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int
    product_id: int | None = randint(10**8, 10**9)  # random 9 digit number


class CreateProductResponse(Response):
    data: Product


class OrderItem(BaseModel):
    order_item_id: int
    order_id: int
    product_id: int
    quantity: int
    price_at_purchase: float


class CreateOrderItem(BaseModel):
    product_id: int
    quantity: int
    price_at_purchase: float


class Order(BaseModel):
    order_id: int
    user_id: str
    order_date: str
    total_price: float
    status: Literal["pending", "completed", "cancelled"]


class CreateOrder(Order):
    """
    order_id shouldn't be passed by frontend,
    it should be generated in create_order()
    """

    order_id: None = None


class OrderAndItems(BaseModel):
    order: Order
    order_items: List[OrderItem]


class ProductWithOrderedQuantity(Product):
    quantity: int


class OrderAndProductsWithQuantities(BaseModel):
    order: Order
    products: List[ProductWithOrderedQuantity]


class CreateOrderWithItems(BaseModel):
    user_id: str
    order_items: List[CreateOrderItem]


class CreateOrderWithItemsResponse(Response):
    data: OrderAndItems


class GetOrdersResponse(Response):
    data: List[Order]


class GetOrderAndProductsResponse(Response):
    data: OrderAndProductsWithQuantities
