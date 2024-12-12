'use client'

import * as React from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import DataTable from '@/components/shared/DataTable'
import { DataTableProps } from '@/types/data-table'
import { CategoryIndexEntity } from '@/client'

export default function CategoryTable({
  data,
  columns,
  pagination,
}: DataTableProps<CategoryIndexEntity>) {
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return <DataTable table={table} pagination={pagination} />
}
