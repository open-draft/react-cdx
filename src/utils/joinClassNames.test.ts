import { joinClassNames } from './joinClassNames'

it('joins given class names', () => {
  expect(joinClassNames('flex', 'shrink-0')).toEqual('flex shrink-0')
})

it('handles non-existing classes', () => {
  expect(joinClassNames(undefined, 'flex', 'shrink-0')).toEqual('flex shrink-0')
  expect(joinClassNames('flex', null, 'shrink-0', undefined)).toEqual(
    'flex shrink-0'
  )
})

it('returns an empty string given no classes', () => {
  expect(joinClassNames()).toEqual('')
  expect(joinClassNames(null)).toEqual('')
  expect(joinClassNames(undefined)).toEqual('')
  expect(joinClassNames(undefined, null)).toEqual('')
})
