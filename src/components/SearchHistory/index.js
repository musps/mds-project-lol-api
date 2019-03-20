import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Icon, List, Image } from 'semantic-ui-react'
import './index.scss'

const sortHistoryByTimestamp = (data = []) => data.sort((a, b) => (b.updatedAt - a.updatedAt))

const gameCreationFromNow = timestamp => moment(new Date(timestamp), 'YYYYMMDD').fromNow()

const defaultPicture = '/static_content/picture/not_found.png'

const SearchHistoryComponent = ({ items, onClickRemoveItem, hideHeader = false }) => (
  <List className='searchHistory'>
    {!hideHeader &&
      <List.Item>
         <List.Content>
            <List.Header>Recent search</List.Header>
          </List.Content>
      </List.Item>
    }

    {sortHistoryByTimestamp(items).map((user, key) => (
      <List.Item key={key}>
        <Image avatar src={defaultPicture} />
        <List.Content>
          <List.Header>
            <Link to={`/summoner/${user.name}`}>
              {user.name}
            </Link>
          </List.Header>
          <List.Description>
            Last seen watching {gameCreationFromNow(user.updatedAt)}.
          </List.Description>
        </List.Content>
        <List.Content floated='right'>
          <button type='button'
            className='btnRemoveUser'
            onClick={() => onClickRemoveItem(user.name)}
          >
            <Icon bordered name='remove' />
          </button>
        </List.Content>
      </List.Item>
    ))}
  </List>
)

export default SearchHistoryComponent
