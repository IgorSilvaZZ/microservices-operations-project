import { describe, expect, it } from "vitest";

import { Order, OrderProps, OrderStatusEnum } from "./Order";


describe('Order Entity', () => {
    const orderProps: OrderProps = {
        number: '1234567',
        description: 'Order description',
        userId: 'user-id',
        status: OrderStatusEnum.PENDING,
    }

    it('should be able to create order', async () => {
        const order = new Order(orderProps)

        expect(order).toBeTruthy()
        expect(order).toBeInstanceOf(Order)
    })

    it('should be able to update number', () => {
        const order = new Order(orderProps)

        const newNumber = '102030'

        order.number = newNumber

        expect(order.number).toEqual(newNumber)

    })

    it('should be able to update description', async () => {
        const order = new Order(orderProps)

        const newDescription = 'New order description'

        order.description = newDescription

        expect(order.description).toEqual(newDescription)
    })


})