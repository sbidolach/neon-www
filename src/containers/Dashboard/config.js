import React from 'react'
import {
  DeleteCell,
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '../../components/tables/helperCells'

const renderCell = (object, type, key) => {
  const value = object[key]
  switch (type) {
    case 'ImageCell':
      return ImageCell(value)
    case 'DateCell':
      return DateCell(value)
    case 'LinkCell':
      return LinkCell(value)
    default:
      return TextCell(value)
  }
}

function createColumns () {
  return [
    {
      title: 'Email',
      key: 'Email',
      className: 'isoImageCell',
      render: object => {
        return renderCell(object, 'TextCell', 'email')
      }
    },
    {
      title: 'Name',
      key: 'name',
      render: object => {
        return renderCell(object, 'TextCell', 'name')
      }
    },
    {
      title: 'Surname',
      key: 'surname',
      render: object => {
        return renderCell(object, 'TextCell', 'surname')
      }
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <DeleteCell
            onDeleteCell={() => {}}
          />
        </span>
      )
    }
  ]
}

export { createColumns }
