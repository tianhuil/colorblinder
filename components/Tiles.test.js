import React from 'react'
import renderer from 'react-test-renderer'
import { generateRGB } from '../util'
import { Tiles } from './Tiles'

describe('<Tiles/>', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Tiles
          size={4}
          onTilePress={() => {}}
          RGB={generateRGB()}
          diffRGB={generateRGB()}
          idx={2}
          gameState='IN_GAME'
          dimension={300}
        />
      )
      .toJSON()

    expect(tree.children.length).toBe(4)
  })
})
