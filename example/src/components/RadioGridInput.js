import React from 'react'
import styled from 'styled-components'

import { useGridInput } from '../useGoogleForm'

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

export default ({ questionId }) => {
  const { label, columns, renderGrid } = useGridInput(questionId)

  return (
    <GridQuestionContainer>
      {label}
      <TableHeader>
        <TableCell />
        {columns.map(c => (
          <TableCell key={c.label}>{c.label}</TableCell>
        ))}
      </TableHeader>
      {renderGrid(l => (
        <TableRow key={l.name}>
          <TableCell>{l.name}</TableCell>
          {l.renderColumns(c => (
            <TableCell key={c.label}>
              <input type='radio' {...c.registerColumn()} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </GridQuestionContainer>
  )
}
