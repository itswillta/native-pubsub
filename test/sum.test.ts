import { describe, expect, it } from 'vitest'
import { createEventBus } from '../src'

describe('createEventBus', () => {
  it('should subscribe to and publish an event synchronously', () => {
    const eventBus = createEventBus<number>()
    let receivedData: number | undefined

    const unsubscribe = eventBus.subscribe((data) => {
      receivedData = data
    })

    eventBus.publishSync(42)

    expect(receivedData).toEqual(42)

    unsubscribe()
  })

  it('should subscribe to and publish an event asynchronously', async () => {
    const eventBus = createEventBus<string>()
    let receivedData: string | undefined

    const unsubscribe = eventBus.subscribe((data) => {
      receivedData = data
    })

    eventBus.publish('Hello, world!')

    expect(receivedData).toBeUndefined()

    await Promise.resolve()

    expect(receivedData).toEqual('Hello, world!')

    unsubscribe()
  })

  it('should allow subscribing to multiple events', () => {
    const eventBus = createEventBus<boolean>()
    let receivedData1: boolean | undefined
    let receivedData2: boolean | undefined

    const unsubscribe1 = eventBus.subscribe((data) => {
      receivedData1 = data
    }, 'event1')

    const unsubscribe2 = eventBus.subscribe((data) => {
      receivedData2 = data
    }, 'event2')

    eventBus.publishSync(true, 'event1')
    eventBus.publishSync(false, 'event2')

    expect(receivedData1).toEqual(true)
    expect(receivedData2).toEqual(false)

    unsubscribe1()
    unsubscribe2()
  })
})
