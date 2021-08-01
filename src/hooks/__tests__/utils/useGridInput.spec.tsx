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

jest.mock('slugify', () => {
  return (s: string) => s
})

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
  const firstLine = mockGridField.lines[0]
  const lastLine = mockGridField.lines[mockGridField.lines.length - 1]
  const firstColumn = mockGridField.columns[0]
  const lastColumn = mockGridField.columns[mockGridField.columns.length - 1]
  const linesOutput = mockGridField.lines.reduce((acc, l) => {
    acc[l.id] = null
    return acc
  }, {})
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
    const { columns, renderGrid, errors } = useGridInput(
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
              <div key={c.id}>
                <input
                  type={type}
                  data-testid={c.id}
                  {...c.registerColumn(registerOptions)}
                />
              </div>
            ))}
          </div>
        ))}
        {errors && <span>Error</span>}
        {errors &&
          Object.keys(errors).map((lineId) => (
            <span key={lineId}>
              Error {lineId} {errors[lineId].type}
            </span>
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

  const clickOption = async (lineId: string, label: string) => {
    await act(async () => {
      fireEvent.click(
        screen.getByTestId(`${mockGridField.id}-${lineId}-${label}`)
      )
    })
  }

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

  it('registers the field correctly', async () => {
    renderComponent()

    await clickOption(firstLine.id, lastColumn.label)
    await clickOption(lastLine.id, firstColumn.label)

    await submitForm()

    expect(output).toEqual({
      ...linesOutput,
      [firstLine.id]: lastColumn.label,
      [lastLine.id]: firstColumn.label
    })

    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  describe('when the field is required', () => {
    const requiredMockField: GridField = {
      ...mockGridField,
      required: true
    }

    beforeEach(() => {
      mockGetField.mockClear()
      mockGetField.mockImplementation(() => requiredMockField)
    })

    it('gives errors when lines are not selected', async () => {
      renderComponent()

      await clickOption(firstLine.id, lastColumn.label)

      await submitForm()

      expect(screen.getByText('Error')).toBeVisible()
      mockGridField.lines.splice(1).forEach((l) => {
        expect(screen.getByText(`Error ${l.id} required`)).toBeVisible()
      })
    })
  })
})
