import React from 'react'
import moment from 'moment'
import ImageCellView from './imageCell'
import DeleteCell from './deleteCell'
import RefreshCell from './refreshCell'
import VoteCell from './voteCell'
import EditableCell from './editableCell'
import FilterDropdown from './filterDropdown'

const DateCell = data => <p>{moment(data).format('YYYY-MM-DD HH:mm:ss')}</p>
const ImageCell = src => <ImageCellView src={src} />
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>
const TextCell = text => <p>{text}</p>

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  RefreshCell,
  FilterDropdown,
  VoteCell
}
