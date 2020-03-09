import React from 'react'
import Card from '@material-ui/core/Card'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslate } from 'react-admin'

import CardIcon from '../CardIcon'

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: '5em',
    width: '60%'
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52
  },
  title: {}
})

const WinRatio = ({ value }) => {
  const translate = useTranslate()
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <CardIcon Icon={EmojiFlagsIcon} bgColor='#DE560B' />
      <Card className={classes.card}>
        <Typography className={classes.title} color='textSecondary'>
          {translate('pos.dashboard.statisticSection.items.winRatio')}
        </Typography>
        <Typography variant='h5' component='h2'>
          {value}%
        </Typography>
      </Card>
    </div>
  )
}

export default WinRatio
