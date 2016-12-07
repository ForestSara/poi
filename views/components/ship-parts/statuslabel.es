import React from 'react'
import FontAwesome from 'react-fontawesome'
import { OverlayTrigger, Tooltip, Label } from 'react-bootstrap'
import { connect } from 'react-redux'
import { get } from 'lodash'

const {i18n} = window
const __ = i18n.main.__.bind(i18n.main)

const texts = [
  ['Retreated'],
  ['Repairing'],
  ['Resupply needed'],
]
const styles = [
  'warning',
  'info',
  'warning',
]
const icons = [
  'reply',
  'wrench',
  'database',
]

const initState = {
  color: [],
  mapname: [],
}

const StatusLabel = connect(state => ({
  shipTag: get(state, 'fcd.shiptag.data', initState),
}))(class statusLabel extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.label !== this.props.label
  )
  render() {
    const i = this.props.label
    const {color, mapname} = this.props.shipTag
    if (i != null && 0 <= i && i <= 6) {
      return (
        <OverlayTrigger placement="top" overlay={
          <Tooltip id={`statuslabel-status-${i}`}>
            {__(texts[i] || 'Ship tag: %s', i > 2 ? mapname[i - 3] || i - 2 : null)}
          </Tooltip>
        }>
          <Label bsStyle={styles[i] || color[i - 3] || 'primary'}><FontAwesome key={0} name={icons[i] || 'tag'} /></Label>
        </OverlayTrigger>
      )
    } else {
      return <Label bsStyle="default" style={{opacity: 0}}></Label>
    }
  }
})

export default StatusLabel
