import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen, act } from '@testing-library/react'

import { GridField } from '../../../types'
import useGridInput from '../../utils/useGridInput'
import {
  MockGoogleFormComponent,
  mockGetField,
  submitForm
} from '../helpers/utils'

describe('useGridInput', () => {
  const mockGridField: GridField = {
    id: 'grid_field',
    label: 'Grid Field Question',
    type: 'RADIO_GRID',
    required: false,
    lines: [
      {
        id: 'line_1',
        label: 'Line 1'
      },
      {
        id: 'line_2',
        label: 'Line 2'
      },
      {
        id: 'line_3',
        label: 'Line 3'
      },
      {
        id: 'line_4',
        label: 'Line 4'
      }
    ],
    columns: [
      {
        label: 'Column 1'
      },
      {
        label: 'Column 2'
      },
      {
        label: 'Column 3'
      },
      {
        label: 'Column 4'
      }
    ]
  }
  let output = {}
  const onSubmit = (data: object) => {
    output = data
  }

  const GridComponent = ({
    options: registerOptions,
    type = 'radio'
  }: {
    options?: RegisterOptions
    type?: 'radio' | 'checkbox'
  }) => {
    const { columns, renderGrid } = useGridInput(
      mockGridField.id,
      `${type.toUpperCase()}_GRID` as 'RADIO_GRID' | 'CHECKBOX_GRID'
    )

    return (
      <>
        {columns.map((c) => (
          <div key={c.label}>{c.label}</div>
        ))}
        {renderGrid((l) => (
          <div key={l.label}>
            <div>{l.label}</div>
            {l.renderColumns((c) => (
              <div key={c.label}>
                <input type={type} {...c.registerColumn(registerOptions)} />
              </div>
            ))}
          </div>
        ))}
      </>
    )
  }

  const renderComponent = ({
    options,
    type
  }: {
    options?: RegisterOptions
    type?: 'radio' | 'checkbox'
  } = {}) =>
    render(
      <MockGoogleFormComponent onSubmit={onSubmit}>
        <GridComponent options={options} type={type}></GridComponent>
      </MockGoogleFormComponent>
    )

  beforeEach(() => {
    mockGetField.mockImplementation(() => mockGridField)
  })

  afterEach(() => {
    output = {}
  })

  it('returns the correspondent field information', () => {
    const { result } = renderHook(
      () => useGridInput(mockGridField.id, mockGridField.type),
      {
        wrapper: MockGoogleFormComponent
      }
    )

    expect(result.current).toMatchObject(mockGridField)
  })

  it('renders the columns correctly', () => {
    renderComponent()

    mockGridField.columns.forEach((c) =>
      expect(screen.getByText(c.label)).toBeVisible()
    )
  })

  it('renders the lines correctly', () => {
    renderComponent()

    mockGridField.lines.forEach((l) =>
      expect(screen.getByText(l.label)).toBeVisible()
    )
  })
})
