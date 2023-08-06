const reverse = require('../utils/for_testing')


test('reverse of a', () => {
    const result = reverse.reverse('a')

    expect(result).toBe('a')
})

test('reverse of react', () => {
    const result = reverse.reverse('react')

    expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
    const result = reverse.reverse('releveler')

    expect(result).toBe('releveler')
})