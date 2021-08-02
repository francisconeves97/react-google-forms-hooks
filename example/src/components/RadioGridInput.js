import React from 'react'
import { useRadioGridInput } from 'react-google-forms-hooks'
import styled from 'styled-components'

const GridQuestionContainer = styled.div`
  display: table;
`

const TableHeader = styled.header`
  display: table-row;
`

const TableRow = styled.div`
  display: table-row;
`

const TableCell = styled.div`
  display: table-cell;
  padding: 5px;
`

export default function RadioGridInput({ id }) {
  const { columns, renderGrid } = useRadioGridInput(id)

  return (
    <GridQuestionContainer>
      <TableHeader>
        <TableCell />
        {columns.map((c) => (
          <TableCell key={c.label}>{c.label}</TableCell>
        ))}
      </TableHeader>
      {renderGrid((l) => (
        <TableRow key={l.label}>
          <TableCell>{l.label}</TableCell>
          {l.renderColumns((c) => (
            <TableCell key={c.label}>
              <input type='radio' {...c.registerColumn()} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </GridQuestionContainer>
  )
}
