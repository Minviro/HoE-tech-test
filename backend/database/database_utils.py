from typing import List
from random import randint
from datetime import datetime
from database.client import create_supabase_client
from models.db_models import (
    ProductResponse,
    CreateProductResponse,
    CreateProduct,
    Product,
    Order,
    OrderItem,
    OrderAndItems,
    CreateOrderItem,
    CreateOrderWithItems,
    CreateOrderWithItemsResponse,
    GetOrdersResponse,
    ProductWithOrderedQuantity,
    OrderAndProductsWithQuantities,
    GetOrderAndProductsResponse,
)

supabase = create_supabase_client()


def get_products() -> ProductResponse:
    products = supabase.table("products").select("*").execute().data
    return ProductResponse(data=products, status=200)


def add_product(product: CreateProduct) -> CreateProductResponse:
    response = supabase.table("products").insert(product.model_dump()).execute()
    created_product = Product(**response.data[0])
    return CreateProductResponse(data=created_product, status=200)


def create_order(user_id: str) -> Order:
    order = Order(
        order_id=randint(
            10**4, 10**5
        ),  # remove this and change to CreateOrder model when table fixed
        user_id=user_id,
        order_date=str(datetime.now()),
        total_price=0,
        status="pending",
    )
    response = supabase.table("orders").insert(order.model_dump()).execute()
    created_order = Order(**response.data[0])
    return created_order


def update_order_total_price(order: Order, update_price_value: float):
    order.total_price += update_price_value
    supabase.table("orders").update(order.model_dump()).eq(
        "order_id", order.order_id
    ).execute()


def reduce_products_quantities(items: List[CreateOrderItem]):
    """Reduces products stock by given quantities"""
    current = (
        supabase.table("products")
        .select("*")
        .in_("product_id", [item.product_id for item in items])
        .execute()
    )
    current_map = {item["product_id"]: item for item in current.data}
    for item in items:
        if current_map[item.product_id]["stock_quantity"] - item.quantity >= 0:
            current_map[item.product_id]["stock_quantity"] -= item.quantity
            continue
        raise ValueError(
            f"Can't update product {item.product_id} to negative stock quantity"
        )
    supabase.table("products").upsert(list(current_map.values())).execute()


def add_items_to_order(items: List[CreateOrderItem], order: Order) -> List[OrderItem]:
    order_items: List[dict] = [
        OrderItem(
            **{
                "order_id": order.order_id,
                "order_item_id": randint(10**4, 10**5),  # remove this when table fixed
                **item.model_dump(),
            }
        ).model_dump()
        for item in items
    ]
    response = supabase.table("order_items").insert(order_items).execute()
    reduce_products_quantities(items)
    added_order_items = [OrderItem(**order) for order in response.data]
    added_items_total_price = sum(
        order.price_at_purchase * order.quantity for order in added_order_items
    )
    update_order_total_price(order, added_items_total_price)
    return added_order_items


def place_order(order_with_items: CreateOrderWithItems) -> CreateOrderWithItemsResponse:
    order = create_order(order_with_items.user_id)
    order_items = add_items_to_order(order_with_items.order_items, order)
    return CreateOrderWithItemsResponse(
        data=OrderAndItems(order=order, order_items=order_items), status=200
    )


def get_orders(user_id: str) -> GetOrdersResponse:
    response = supabase.table("orders").select("*").eq("user_id", user_id).execute()
    return GetOrdersResponse(
        data=[Order(**order) for order in response.data], status=200
    )


def get_order(order_id: int) -> GetOrderAndProductsResponse:
    order = Order(
        **supabase.table("orders")
        .select("*")
        .eq("order_id", order_id)
        .execute()
        .data.pop()
    )
    products_and_quantities = [
        ProductWithOrderedQuantity(
            **prod_and_quant["products"], quantity=prod_and_quant["quantity"]
        )
        for prod_and_quant in (
            supabase.table("order_items")
            .select("quantity, products(*)")
            .eq("order_id", order_id)
            .execute()
            .data
        )
    ]
    return GetOrderAndProductsResponse(
        data=OrderAndProductsWithQuantities(
            order=order, products=products_and_quantities
        ),
        status=200,
    )
