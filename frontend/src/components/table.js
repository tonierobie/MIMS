import React from 'react'
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

export function Table({ columns, data, rowProps = () => ({}) }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    usePagination,
  )

  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        border={1}
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th
              colSpan={100}
              style={{
                textAlign: 'left',
                padding: 10,
                background: '#D3D3D3',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(rowProps(row))}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>{' '}
    </>
  )
}

// function TableData() {
//   const columns = React.useMemo(() => [
//     {
//       Header: 'Sub Heading 1a',
//       accessor: 'firstcolumn',
//     },
//     {
//       Header: 'Sub Heading 1b',
//       accessor: 'secondcolumn',
//     },
//     {
//       Header: 'Sub Heading 2b',
//       accessor: 'thirdcolumn',
//     },
//   ])

//   const data = React.useMemo(
//     () => [
//       {
//         firstcolumn: 'Row 1 Column 1',
//         secondcolumn: 'Row 1 Column 2',
//         thirdcolumn: 'Row 1 Column 3',
//       },
//       {
//         firstcolumn: 'Row 2 Column 1',
//         secondcolumn: 'Row 2 Column 2',
//         thirdcolumn: 'Row 2 Column 3',
//       },
//       {
//         firstcolumn: 'Row 3 Column 1',
//         secondcolumn: 'Row 3 Column 2',
//         thirdcolumn: 'Row 3 Column 3',
//       },
//       {
//         firstcolumn: 'Row 4 Column 1',
//         secondcolumn: 'Row 4 Column 2',
//         thirdcolumn: 'Row 4 Column 3',
//       },
//       {
//         firstcolumn: 'Row 5 Column 1',
//         secondcolumn: 'Row 5 Column 2',
//         thirdcolumn: 'Row 5 Column 3',
//       },
//       {
//         firstcolumn: 'Row 6 Column 1',
//         secondcolumn: 'Row 6 Column 2',
//         thirdcolumn: 'Row 6 Column 3',
//       },
//       {
//         firstcolumn: 'Row 7 Column 1',
//         secondcolumn: 'Row 7 Column 2',
//         thirdcolumn: 'Row 7 Column 3',
//       },
//       {
//         firstcolumn: 'Row 8 Column 1',
//         secondcolumn: 'Row 8 Column 2',
//         thirdcolumn: 'Row 8 Column 3',
//       },
//       {
//         firstcolumn: 'Row 9 Column 1',
//         secondcolumn: 'Row 9 Column 2',
//         thirdcolumn: 'Row 9 Column 3',
//       },
//       {
//         firstcolumn: 'Row 10 Column 1',
//         secondcolumn: 'Row 10 Column 2',
//         thirdcolumn: 'Row 10 Column 3',
//       },
//       {
//         firstcolumn: 'Row 11 Column 1',
//         secondcolumn: 'Row 11 Column 2',
//         thirdcolumn: 'Row 11 Column 3',
//       },
//       {
//         firstcolumn: 'Row 12 Column 1',
//         secondcolumn: 'Row 12 Column 2',
//         thirdcolumn: 'Row 12 Column 3',
//       },
//     ],
//     [],
//   )

//   return <Table columns={columns} data={data} />
// }

// export default TableData
